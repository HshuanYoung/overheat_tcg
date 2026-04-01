import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { GameState, PlayerState, Card, StackItem, CardEffect } from '../types/game';
import { GameService } from '../services/gameService';
import { CardComponent } from './Card';
import { PlayField } from './PlayField';
import { Rulebook } from './Rulebook';
import { motion, AnimatePresence } from 'motion/react';
import { Sword, Shield, Zap, LogOut, BookOpen, Send, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const BattleField: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<GameState | null>(null);
  const [isRulebookOpen, setIsRulebookOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<Card | null>(null);
  const [selectedMulligan, setSelectedMulligan] = useState<string[]>([]);
  const [isMulliganSubmitting, setIsMulliganSubmitting] = useState(false);
  const [paymentSelection, setPaymentSelection] = useState<{ useFeijing: string[], exhaustIds: string[], erosionFrontIds: string[] }>({ useFeijing: [], exhaustIds: [], erosionFrontIds: [] });
  const [pendingPlayCard, setPendingPlayCard] = useState<Card | null>(null);
  const [selectedAttackers, setSelectedAttackers] = useState<string[]>([]);
  const [counterTimer, setCounterTimer] = useState<number>(30);
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio('/assets/music_bg.wav');
    audio.loop = true;
    audio.volume = 0.3;
    
    const playAudio = () => {
      audio.play().catch(e => console.log("Audio play blocked by browser", e));
      window.removeEventListener('click', playAudio);
    };
    
    window.addEventListener('click', playAudio);
    
    return () => {
      audio.pause();
      window.removeEventListener('click', playAudio);
    };
  }, []);

  useEffect(() => {
    if (!gameId) return;
    const unsubscribe = onSnapshot(doc(db, 'games', gameId), (doc) => {
      if (doc.exists()) {
        setGame(doc.data() as GameState);
      }
    });
    return () => unsubscribe();
  }, [gameId]);

  // Counter Timer Logic
  useEffect(() => {
    if (!game || !gameId || !auth.currentUser) return;
    
    const myUid = auth.currentUser.uid;
    const isWaitingForMe = game.counterStack?.length > 0 && game.counterStack[game.counterStack.length - 1]?.ownerUid !== myUid;

    if (isWaitingForMe) {
      setCounterTimer(30);
      const interval = setInterval(() => {
        setCounterTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleResolve(); // Auto resolve when timer hits 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCounterTimer(30); // Reset timer when not waiting
    }
  }, [game?.counterStack, gameId]);

  // Bot Turn Logic
  useEffect(() => {
    if (!game || !gameId) return;
    const opponentUid = Object.keys(game.players).find(uid => uid !== auth.currentUser?.uid);
    if (opponentUid === 'BOT_PLAYER' && game.players[opponentUid].isTurn) {
      const timer = setTimeout(() => {
        GameService.botMove(gameId);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [game, gameId]);

  if (!game || !auth.currentUser) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-[#f27d26] border-t-transparent rounded-full"
      />
    </div>
  );

  const myUid = auth.currentUser.uid;
  const opponentUid = Object.keys(game.players).find(uid => uid !== myUid);
  
  const me = game.players[myUid];
  const opponent = opponentUid ? game.players[opponentUid] : null;

  const handleDeclareAttack = async () => {
    if (!gameId || selectedAttackers.length === 0) return;
    try {
      await GameService.declareAttack(gameId, myUid, selectedAttackers);
      setSelectedAttackers([]);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEndTurn = async () => {
    if (gameId) {
      await GameService.endTurn(gameId);
    }
  };

  const handleCardClick = (card: Card, zone: string, index?: number) => {
    if (!me.isTurn) return;

    // Handle exhausting cards for payment
    if (pendingPlayCard) {
      if (zone === 'unit' || zone === 'item') {
        togglePaymentExhaust(card.id);
      } else if (zone === 'hand' && card.feijingMark) {
        togglePaymentFeijing(card.id);
      } else if (zone === 'erosion_front') {
        togglePaymentErosionFront(card.id);
      }
      return;
    }

    // Handle selecting attackers in Battle Phase
    if (game.phase === 'BATTLE' && zone === 'unit') {
      const isMyCard = me.unitZone.some(c => c?.id === card.id);
      if (isMyCard && !card.isExhausted) {
        setSelectedAttackers(prev => {
          if (prev.includes(card.id)) return prev.filter(id => id !== card.id);
          if (prev.length >= 2) return [prev[1], card.id]; // Max 2 attackers
          return [...prev, card.id];
        });
      }
      return;
    }

    // Activate [启] ability during Main Phase
    if (game.phase === 'MAIN' && (zone === 'unit' || zone === 'item')) {
      // Only allow activating abilities of my own cards
      const isMyCard = [...me.unitZone, ...me.itemZone].some(c => c?.id === card.id);
      if (isMyCard) {
        const activateEffect = card.effects.find(e => e.type === 'ACTIVATE');
        if (activateEffect) {
          activateAbility(card, activateEffect);
        }
      }
    }
  };

  const activateAbility = async (card: Card, effect: CardEffect) => {
    if (!gameId) return;
    
    const newStackItem: StackItem = {
      card: card,
      ownerUid: myUid,
      type: 'EFFECT',
      timestamp: Date.now()
    };

    const newLogs = [...game.logs, `${me.displayName} 发动了 [${card.fullName}] 的 [启] 能力: ${effect.description}`];

    try {
      await updateDoc(doc(db, 'games', gameId), {
        counterStack: arrayUnion(newStackItem),
        logs: newLogs
      });
    } catch (error) {
      console.error("Error activating ability:", error);
    }
  };

  const playCardFromHand = async (card: Card) => {
    if (!me.isTurn || !gameId || game.phase !== 'MAIN') return;
    
    const playEffect = card.effects.find(e => e.type === 'ACTIVATE' || e.type === 'TRIGGER' || e.type === 'ALWAYS');
    const cost = playEffect?.playCost || 0;

    if (cost === 0) {
      try {
        await GameService.playCard(gameId, myUid, card.id, {});
      } catch (error: any) {
        alert(error.message);
      }
    } else {
      setPendingPlayCard(card);
      setPaymentSelection({ useFeijing: [], exhaustIds: [], erosionFrontIds: [] });
    }
  };

  const handleMulligan = async () => {
    if (!gameId) return;
    setIsMulliganSubmitting(true);
    try {
      await GameService.performMulligan(gameId, selectedMulligan);
    } catch (error) {
      console.error(error);
    } finally {
      setIsMulliganSubmitting(false);
    }
  };

  const handleResolve = async () => {
    if (!gameId) return;
    try {
      await GameService.resolvePlay(gameId);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleConfirmPlay = async () => {
    if (!gameId || !pendingPlayCard) return;
    try {
      await GameService.playCard(gameId, myUid, pendingPlayCard.id, {
        feijingCardId: paymentSelection.useFeijing[0], // Assuming only one feijing card can be used
        exhaustUnitIds: paymentSelection.exhaustIds,
        erosionFrontIds: paymentSelection.erosionFrontIds
      });
      setPendingPlayCard(null);
      setPaymentSelection({ useFeijing: [], exhaustIds: [], erosionFrontIds: [] });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const togglePaymentExhaust = (cardId: string) => {
    setPaymentSelection(prev => {
      const isExhausted = prev.exhaustIds.includes(cardId);
      return {
        ...prev,
        exhaustIds: isExhausted 
          ? prev.exhaustIds.filter(id => id !== cardId) 
          : [...prev.exhaustIds, cardId]
      };
    });
  };

  const togglePaymentFeijing = (cardId: string) => {
    setPaymentSelection(prev => {
      const isUsed = prev.useFeijing.includes(cardId);
      return {
        ...prev,
        useFeijing: isUsed 
          ? [] // Only allow one feijing card
          : [cardId]
      };
    });
  };

  const togglePaymentErosionFront = (cardId: string) => {
    setPaymentSelection(prev => {
      const isUsed = prev.erosionFrontIds.includes(cardId);
      return {
        ...prev,
        erosionFrontIds: isUsed 
          ? prev.erosionFrontIds.filter(id => id !== cardId) 
          : [...prev.erosionFrontIds, cardId]
      };
    });
  };

  if (game.phase === 'MULLIGAN' && !me.mulliganDone) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-black italic text-[#f27d26] mb-4 uppercase tracking-tighter">调度阶段 (Mulligan)</h2>
        <p className="text-zinc-400 mb-12 uppercase tracking-[0.3em] text-sm">点击卡牌查看大图，点击下方按钮选择是否更换</p>
        
        <div className="flex gap-6 mb-12">
          {me.hand.map((card, i) => {
            const isSelected = selectedMulligan.includes(card.id);
            return (
              <div key={`${card.id}-${i}`} className="flex flex-col items-center gap-4">
                <motion.div
                  whileHover={{ y: -10 }}
                  onClick={() => setHoveredCard(card)}
                  className={cn(
                    "w-40 cursor-pointer transition-all rounded-xl overflow-hidden border-2",
                    isSelected ? "border-[#f27d26] scale-105 shadow-[0_0_30px_rgba(242,125,38,0.3)]" : "border-transparent opacity-60"
                  )}
                >
                  <CardComponent card={card} />
                </motion.div>
                <button
                  onClick={() => {
                    setSelectedMulligan(prev => 
                      prev.includes(card.id) ? prev.filter(id => id !== card.id) : [...prev, card.id]
                    );
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors",
                    isSelected ? "bg-[#f27d26] text-black" : "bg-white/10 text-white hover:bg-white/20"
                  )}
                >
                  {isSelected ? "已选择更换" : "保留"}
                </button>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleMulligan}
          disabled={isMulliganSubmitting}
          className="px-12 py-4 bg-[#f27d26] text-white font-black italic uppercase tracking-widest rounded-xl hover:bg-[#f27d26]/80 transition-all disabled:opacity-50"
        >
          {selectedMulligan.length > 0 ? `更换 ${selectedMulligan.length} 张卡牌` : '接受初始手牌'}
        </button>
        
        {/* Full Image Overlay for Mulligan */}
        <AnimatePresence>
          {hoveredCard && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-8 cursor-pointer"
              onClick={() => setHoveredCard(null)}
            >
              <div className="relative max-h-[90vh] aspect-[3/4]">
                <img 
                  src={hoveredCard.fullImageUrl || hoveredCard.imageUrl || `https://picsum.photos/seed/${hoveredCard.id}/400/600`} 
                  alt={hoveredCard.fullName}
                  className="w-full h-full object-contain rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (game.phase === 'MULLIGAN' && me.mulliganDone) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-[#f27d26] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-zinc-400 uppercase tracking-widest text-sm">等待对手完成调度...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#050505] flex flex-col overflow-hidden select-none font-sans relative">
      {/* Zoomed Card Overlay (Global) */}
      <AnimatePresence>
        {hoveredCard && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.8 }}
            className="fixed right-12 top-1/2 -translate-y-1/2 z-[100] w-72 aspect-[3/4] rounded-2xl border-2 border-[#f27d26] shadow-[0_0_50px_rgba(242,125,38,0.4)] overflow-hidden bg-black pointer-events-none"
          >
            <img 
              src={hoveredCard.fullImageUrl} 
              alt={hoveredCard.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-4 border-t border-[#f27d26]/20">
              <div className="text-sm font-black text-[#f27d26] mb-1 uppercase italic tracking-tighter">{hoveredCard.name}</div>
              <div className="text-[10px] text-white/80 leading-relaxed font-mono">
                {hoveredCard.effects.map((e, i) => (
                  <div key={i} className="mb-1.5">
                    <span className="font-bold text-blue-400">[{e.type}]</span> {e.description}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Payment Selection Overlay */}
      <AnimatePresence>
        {pendingPlayCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-8 pointer-events-auto">
              <h3 className="text-2xl font-black italic text-[#f27d26] uppercase tracking-widest">支付费用</h3>
              <div className="flex gap-8 items-center">
                <motion.div 
                  initial={{ scale: 0.5, y: 100 }}
                  animate={{ scale: 1, y: 0 }}
                  className="w-64 relative"
                >
                  <CardComponent card={pendingPlayCard} />
                </motion.div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4">
                  <button 
                    onClick={handleConfirmPlay}
                    className="px-12 py-3 bg-[#f27d26] text-white font-black italic uppercase tracking-widest rounded-xl hover:bg-[#f27d26]/80 transition-all"
                  >
                    确认支付
                  </button>
                  <button 
                    onClick={() => setPendingPlayCard(null)}
                    className="px-12 py-3 bg-zinc-800 text-white font-black italic uppercase tracking-widest rounded-xl hover:bg-zinc-700 transition-all"
                  >
                    取消
                  </button>
                </div>
                <p className="text-zinc-500 text-xs">请在场上选择支付方式 (横置单位/道具，使用手牌菲晶，或选择侵蚀区正面卡)</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stack / Countering Overlay */}
      <AnimatePresence>
        {game.counterStack?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              <h3 className="text-2xl font-black italic text-white uppercase tracking-widest">
                {game.counterStack[game.counterStack.length - 1]?.ownerUid === myUid ? '等待对手响应...' : '对手打出卡牌'}
              </h3>
              <div className="flex gap-8 items-center">
                {game.counterStack.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0.5, y: 100 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-64 relative"
                  >
                    <CardComponent card={item.card} />
                    <div className="absolute -top-4 -left-4 bg-[#f27d26] text-black px-3 py-1 rounded-full text-[10px] font-black uppercase italic">
                      {game.players[item.ownerUid].displayName}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4">
                {game.counterStack[game.counterStack.length - 1]?.ownerUid !== myUid && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-white/50 font-bold text-sm uppercase tracking-widest">
                      响应倒计时: <span className={cn("text-lg", counterTimer <= 10 ? "text-red-500 animate-pulse" : "text-[#f27d26]")}>{counterTimer}s</span>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        className="px-12 py-3 bg-zinc-800 text-white font-black italic uppercase tracking-widest rounded-xl hover:bg-zinc-700 transition-all"
                        onClick={() => {/* Counter logic */}}
                      >
                        进行对抗
                      </button>
                      <button 
                        className="px-12 py-3 bg-white text-black font-black italic uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all"
                        onClick={handleResolve}
                      >
                        不响应 (结算)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-8 bg-black/80 backdrop-blur-md z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#f27d26] to-red-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black italic tracking-tighter uppercase text-white">神蚀创痕</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">ID: {gameId?.slice(0, 8)}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsRulebookOpen(true)}
              className="p-2 text-white/40 hover:text-[#f27d26] transition-colors"
              title="查看规则"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            
            {me.isTurn && game.phase === 'MAIN' && (
              <motion.button 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => GameService.advancePhase(gameId, 'DECLARE_BATTLE')}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-black uppercase italic tracking-widest transition-all shadow-lg shadow-red-600/20"
              >
                进入战斗阶段
              </motion.button>
            )}

            {me.isTurn && game.phase === 'BATTLE' && (
              <div className="flex gap-2">
                <motion.button 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeclareAttack}
                  disabled={selectedAttackers.length === 0}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:hover:bg-red-600 rounded-lg text-xs font-black uppercase italic tracking-widest transition-all shadow-lg shadow-red-600/20"
                >
                  {selectedAttackers.length === 2 ? '联军攻击' : '攻击'}
                </motion.button>
                <motion.button 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => GameService.advancePhase(gameId, 'RETURN_MAIN')}
                  className="px-6 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-xs font-black uppercase italic tracking-widest transition-all"
                >
                  返回主要阶段
                </motion.button>
              </div>
            )}

            {me.isTurn && (
              <motion.button 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEndTurn}
                className="px-6 py-2 bg-[#f27d26] hover:bg-[#f27d26]/80 rounded-lg text-xs font-black uppercase italic tracking-widest transition-all shadow-lg shadow-[#f27d26]/20"
              >
                结束回合
              </motion.button>
            )}

            <button 
              onClick={() => navigate('/')} 
              className="p-2 text-white/20 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Arena */}
      <div className="flex-1 relative p-4 flex flex-col gap-4 overflow-hidden">
        {/* Play Field Component */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          {opponent && (
            <PlayField 
              player={me} 
              opponent={opponent} 
              game={game}
              onCardClick={handleCardClick}
              onHoverCard={setHoveredCard}
              onPlayCard={playCardFromHand}
              paymentSelection={paymentSelection}
              stack={game.counterStack || []}
              myUid={myUid}
              selectedAttackers={selectedAttackers}
            />
          )}
        </div>

        {/* Player Interaction Area */}
        <div className="h-32 flex gap-6 z-20">
          {/* Quick Logs / Chat */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col">
            <span className="text-[10px] font-black uppercase italic tracking-widest text-white/40 mb-3">对战记录</span>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {game.logs.slice(-10).map((log, i) => (
                <div key={i} className="text-[10px] font-mono text-white/60 leading-tight">
                  <span className="text-[#f27d26] mr-2">»</span> {log}
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-80 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col">
            <span className="text-[10px] font-black uppercase italic tracking-widest text-white/40 mb-3">消息</span>
            <div className="mt-auto relative">
              <input 
                type="text" 
                placeholder="发送消息..."
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-[10px] focus:outline-none focus:border-[#f27d26]/50"
              />
              <Send className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Rulebook Overlay */}
      <Rulebook isOpen={isRulebookOpen} onClose={() => setIsRulebookOpen(false)} />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(242,125,38,0.05)_0%,_transparent_50%)]" />
      </div>
    </div>
  );
};

