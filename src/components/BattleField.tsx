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
  const [paymentSelection, setPaymentSelection] = useState<{ useFeijing: string[], exhaustIds: string[] }>({ useFeijing: [], exhaustIds: [] });
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

  const handleEndTurn = async () => {
    if (gameId) {
      await GameService.endTurn(gameId);
    }
  };

  const handleCardClick = (card: Card, zone: string, index?: number) => {
    if (!me.isTurn) return;

    // Handle exhausting cards for payment
    if (game.counterStack.length > 0 && game.counterStack[game.counterStack.length - 1].ownerUid === myUid) {
      if (zone === 'unit' || zone === 'item') {
        togglePaymentExhaust(card.id);
      } else if (zone === 'hand' && card.feijingMark) {
        togglePaymentFeijing(card.id);
      }
      return;
    }

    // Play card from hand during Main Phase or Counter-play
    if (zone === 'hand') {
      // Only allow playing cards from my own hand
      const isMyCard = me.hand.some(c => c.id === card.id);
      if (isMyCard && (game.phase === 'MAIN' || game.counterStack.length > 0)) {
        playCardFromHand(card);
      }
      return;
    }

    // Activate [启] ability during Main Phase
    if (game.phase === 'MAIN' && (zone === 'unit' || zone === 'item')) {
      // Only allow activating abilities of my own cards
      const isMyCard = [...me.unitZone, ...me.itemZone].some(c => c?.id === card.id);
      if (isMyCard) {
        const activateEffect = card.effects.find(e => e.type === '启');
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
    try {
      await GameService.playCardToStack(gameId, card.id);
    } catch (error: any) {
      alert(error.message);
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
      await GameService.resolveStack(gameId, paymentSelection);
      setPaymentSelection({ useFeijing: [], exhaustIds: [] });
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
          ? prev.useFeijing.filter(id => id !== cardId) 
          : [...prev.useFeijing, cardId]
      };
    });
  };

  if (game.phase === 'MULLIGAN' && !me.mulliganDone) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-black italic text-[#f27d26] mb-4 uppercase tracking-tighter">调度阶段 (Mulligan)</h2>
        <p className="text-zinc-400 mb-12 uppercase tracking-[0.3em] text-sm">选择要返回卡组底部的卡牌</p>
        
        <div className="flex gap-6 mb-12">
          {me.hand.map((card, i) => (
            <motion.div
              key={`${card.id}-${i}`}
              whileHover={{ y: -10 }}
              onClick={() => {
                setSelectedMulligan(prev => 
                  prev.includes(card.id) ? prev.filter(id => id !== card.id) : [...prev, card.id]
                );
              }}
              className={cn(
                "w-40 cursor-pointer transition-all rounded-xl overflow-hidden border-2",
                selectedMulligan.includes(card.id) ? "border-[#f27d26] scale-105 shadow-[0_0_30px_rgba(242,125,38,0.3)]" : "border-transparent opacity-60"
              )}
            >
              <CardComponent card={card} />
            </motion.div>
          ))}
        </div>

        <button
          onClick={handleMulligan}
          disabled={isMulliganSubmitting}
          className="px-12 py-4 bg-[#f27d26] text-white font-black italic uppercase tracking-widest rounded-xl hover:bg-[#f27d26]/80 transition-all disabled:opacity-50"
        >
          {selectedMulligan.length > 0 ? `更换 ${selectedMulligan.length} 张卡牌` : '接受初始手牌'}
        </button>
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
      {/* Stack / Play Area Overlay */}
      <AnimatePresence>
        {game.stack.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              <h3 className="text-2xl font-black italic text-white uppercase tracking-widest">正在打出卡牌...</h3>
              <div className="flex gap-8 items-center">
                {game.stack.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0.5, y: 100 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-64 relative"
                  >
                    <CardComponent card={item.card} />
                    <div className="absolute -top-4 -left-4 bg-[#f27d26] text-black px-3 py-1 rounded-full text-[10px] font-black uppercase italic">
                      {game.players[item.playerUid].displayName}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4">
                {game.stack[game.stack.length - 1].playerUid === myUid ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                      <button 
                        onClick={handleResolve}
                        className="px-12 py-3 bg-[#f27d26] text-white font-black italic uppercase tracking-widest rounded-xl hover:bg-[#f27d26]/80 transition-all"
                      >
                        确认支付并生效
                      </button>
                    </div>
                    <p className="text-zinc-500 text-xs">请在下方选择支付方式 (横置或菲晶)</p>
                  </div>
                ) : (
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
                      不响应
                    </button>
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
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">回合数</span>
              <span className="text-sm font-black italic text-[#f27d26]">{game.turnCount}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">当前阶段</span>
              <span className="text-sm font-black italic text-white uppercase">{game.phase}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsRulebookOpen(true)}
              className="p-2 text-white/40 hover:text-[#f27d26] transition-colors"
              title="查看规则"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            
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
      <div className="flex-1 relative p-6 flex flex-col gap-6 overflow-hidden">
        {/* Play Field Component */}
        <div className="flex-1 flex items-center justify-center">
          {opponent && (
            <PlayField 
              player={me} 
              opponent={opponent} 
              onCardClick={handleCardClick}
              onHoverCard={setHoveredCard}
              paymentSelection={paymentSelection}
              stack={game.counterStack}
              myUid={myUid}
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

