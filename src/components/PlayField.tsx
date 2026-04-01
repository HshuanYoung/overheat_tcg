import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, PlayerState, StackItem, GameState } from '../types/game';
import { CardComponent } from './Card';
import { GameService } from '../services/gameService';
import { Shield, Sword, Zap, Trash2, LogOut, Layers, AlertTriangle, Search, Play } from 'lucide-react';
import { cn } from '../lib/utils';

interface PlayFieldProps {
  player: PlayerState;
  opponent: PlayerState;
  game: GameState;
  onCardClick?: (card: Card, zone: string, index?: number) => void;
  onHoverCard?: (card: Card | null) => void;
  onPlayCard?: (card: Card) => void;
  paymentSelection?: { useFeijing: string[], exhaustIds: string[], erosionFrontIds?: string[] };
  stack: StackItem[];
  myUid: string;
  selectedAttackers?: string[];
}

const CardSlot: React.FC<{
  card: Card | null;
  label?: string;
  onClick?: () => void;
  onHover?: (card: Card | null) => void;
  className?: string;
  isErosion?: boolean;
  isFaceUp?: boolean;
  isExhausted?: boolean;
  isSelectedForPayment?: boolean;
  isDeck?: boolean;
  count?: number;
  showCount?: boolean;
  isAttacking?: boolean;
}> = ({ card, label, onClick, onHover, className, isErosion, isFaceUp = true, isExhausted, isSelectedForPayment, isDeck, count = 0, showCount = true, isAttacking }) => {
  // Calculate thickness layers (max 8 for visual performance)
  const layers = Math.min(Math.floor(count / 3), 8);
  
  return (
    <div className="relative w-full aspect-[3/4]">
      {/* Thickness Layers */}
      {Array.from({ length: layers }).map((_, i) => (
        <div 
          key={i}
          className="absolute inset-0 rounded-md border border-white/10 bg-zinc-900"
          style={{ transform: `translate(${(i + 1) * 1.5}px, -${(i + 1) * 1.5}px)`, zIndex: -i - 1 }}
        />
      ))}
      
      <div
        className={cn(
          "relative h-full w-full rounded-md border-2 border-dashed transition-all flex items-center justify-center group overflow-hidden cursor-pointer",
          (card || isDeck || count > 0) ? "border-[#f27d26]/50 bg-black/40 shadow-lg" : "border-white/10 bg-white/5",
          isExhausted ? "rotate-90 scale-90 opacity-80" : "",
          isSelectedForPayment ? "ring-2 ring-[#f27d26] ring-offset-2 ring-offset-black z-10" : "",
          isAttacking ? "ring-4 ring-red-600 ring-offset-2 ring-offset-black z-10 shadow-[0_0_20px_rgba(220,38,38,0.8)]" : "",
          className
        )}
        onClick={onClick}
        onMouseEnter={() => card && onHover?.(card)}
        onMouseLeave={() => onHover?.(null)}
      >
        {isDeck ? (
          <CardComponent isBack />
        ) : card ? (
          <div className="h-full w-full relative">
            {isFaceUp ? (
              <CardComponent card={card} className="border-0" />
            ) : (
              <CardComponent isBack className="border-0" />
            )}
          </div>
        ) : count > 0 ? (
           <CardComponent isBack />
        ) : (
          <span className="text-[8px] uppercase font-bold opacity-20 tracking-widest text-center px-1">
            {label}
          </span>
        )}

        {/* Count Badge */}
        {showCount && count > 0 && (
          <div className="absolute bottom-0.5 right-0.5 bg-black/80 text-[8px] px-1 rounded border border-white/20 z-20">
            {count}
          </div>
        )}
      </div>
    </div>
  );
};

const CardListModal: React.FC<{
  title: string;
  cards: Card[];
  isOpen: boolean;
  onClose: () => void;
}> = ({ title, cards = [], isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-bottom border-white/10 flex justify-between items-center">
          <h3 className="text-lg font-bold uppercase tracking-widest text-[#f27d26]">{title} ({cards?.length || 0})</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 custom-scrollbar">
          {cards?.map((card, i) => (
            <div key={i} className="aspect-[3/4]">
              <CardComponent card={card} />
            </div>
          ))}
          {(cards?.length || 0) === 0 && <div className="col-span-full py-20 text-center opacity-20 italic">No cards here</div>}
        </div>
      </div>
    </div>
  );
};

const PlayerHalf: React.FC<{
  player: PlayerState;
  isOpponent?: boolean;
  onCardClick?: (card: Card, zone: string, index?: number) => void;
  onHoverCard?: (card: Card | null) => void;
  onPlayCard?: (card: Card) => void;
  paymentSelection?: { useFeijing: string[], exhaustIds: string[], erosionFrontIds?: string[] };
  selectedAttackers?: string[];
}> = ({ player, isOpponent, onCardClick, onHoverCard, onPlayCard, paymentSelection, selectedAttackers }) => {
  const romanNumerals = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ'];
  const [viewingZone, setViewingZone] = useState<{ title: string, cards: Card[] } | null>(null);
  const [hoveredHandCardId, setHoveredHandCardId] = useState<string | null>(null);
  
  if (!player) return null;

  return (
    <div className={cn(
      "flex-1 grid grid-cols-[120px_1fr_120px] gap-4 p-4 relative h-full min-h-0",
      isOpponent ? "bg-red-500/5" : "bg-blue-500/5"
    )}>
      <CardListModal 
        isOpen={!!viewingZone}
        onClose={() => setViewingZone(null)}
        title={viewingZone?.title || ''}
        cards={viewingZone?.cards || []}
      />

      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-4 h-full min-h-0 justify-center">
        {isOpponent ? (
          // Opponent Left: Deck, Grave, Exile
          <div className="flex flex-col gap-2">
            <CardSlot 
              card={null} isDeck label="DECK" count={player.deck?.length || 0} 
              className="border-white/20"
            />
            <CardSlot 
              card={(player.grave?.length || 0) > 0 ? player.grave[player.grave.length - 1] : null} 
              label="GRAVE" count={player.grave?.length || 0} 
              className="border-red-900/30"
              onClick={() => setViewingZone({ title: 'Grave', cards: player.grave || [] })}
              onHover={onHoverCard}
              isFaceUp={true}
            />
            <CardSlot 
              card={(player.exile?.length || 0) > 0 ? player.exile[player.exile.length - 1] : null} 
              label="EXILE" count={player.exile?.length || 0} 
              className="border-purple-900/30"
              onClick={() => setViewingZone({ title: 'Exile', cards: player.exile || [] })}
              onHover={onHoverCard}
              isFaceUp={true}
            />
          </div>
        ) : (
          // Player Left: Item Zone
          <div className="grid grid-cols-2 grid-rows-5 gap-1 h-full">
            {Array.from({ length: 10 }).map((_, i) => {
              const item = player.itemZone?.[i];
              return (
                <CardSlot 
                  key={i}
                  card={item || null}
                  label={`ITEM ${i+1}`}
                  onHover={onHoverCard}
                  onClick={() => item && onCardClick?.(item, 'item', i)}
                  isExhausted={item ? player.hasExhaustedThisTurn?.includes(item.id) : false}
                  isSelectedForPayment={item ? paymentSelection?.exhaustIds.includes(item.id) : false}
                  showCount={false}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* CENTER COLUMN: HAND, UNIT, EROSION */}
      <div className="flex flex-col gap-2 h-full min-h-0 justify-center">
        {isOpponent ? (
          <>
            {/* Opponent Hand Area */}
            <div className="flex items-center gap-4">
              <div className="w-20 shrink-0">
                <CardSlot 
                  card={(player.playZone?.length || 0) > 0 ? player.playZone[player.playZone.length - 1] : null}
                  label="PLAY" count={player.playZone?.length || 0}
                  className="border-yellow-500/30"
                  onHover={onHoverCard}
                />
              </div>
              <div className="flex-1 h-24 flex items-center justify-center gap-1 overflow-x-auto px-4 bg-black/20 rounded-xl border border-white/5 custom-scrollbar">
                <div className="text-white/50 text-sm font-bold tracking-widest uppercase">
                  手牌数量: {player.hand?.length || 0}
                </div>
              </div>
            </div>

            {/* Opponent Erosion Zone */}
            <div className="grid grid-cols-10 gap-1">
              {romanNumerals.map((num, i) => {
                const frontCard = player.erosionFront?.[i];
                const backCard = player.erosionBack?.[i];
                return (
                  <div key={i} className="flex flex-col gap-1 items-center">
                    <span className="text-[10px] font-black text-white/30">{num}</span>
                    <div className="relative aspect-[3/4] w-full">
                      {backCard && (
                        <CardSlot 
                          card={null}
                          isFaceUp={false}
                          onHover={() => onHoverCard?.(backCard)}
                          className="border-red-900/50"
                          showCount={false}
                        />
                      )}
                      {frontCard && (
                        <CardSlot 
                          card={frontCard}
                          isFaceUp={true}
                          onHover={onHoverCard}
                          onClick={() => onCardClick?.(frontCard, 'erosion_front', i)}
                          isSelectedForPayment={paymentSelection?.erosionFrontIds?.includes(frontCard.id)}
                          className="absolute inset-0 border-red-600"
                          showCount={false}
                        />
                      )}
                      {!frontCard && !backCard && (
                        <div className="h-full w-full rounded-md border border-dashed border-white/5 bg-white/5 flex items-center justify-center">
                          <span className="text-[8px] opacity-20">{num}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Opponent Unit Zone */}
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, i) => {
                const unit = player.unitZone?.[i];
                return (
                  <CardSlot 
                    key={i}
                    card={unit || null}
                    label={`UNIT ${i+1}`}
                    onHover={onHoverCard}
                    onClick={() => unit && onCardClick?.(unit, 'unit', i)}
                    isExhausted={unit ? player.hasExhaustedThisTurn?.includes(unit.id) : false}
                    isSelectedForPayment={unit ? paymentSelection?.exhaustIds.includes(unit.id) : false}
                    isAttacking={unit ? selectedAttackers?.includes(unit.id) : false}
                    showCount={false}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Player Unit Zone */}
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, i) => {
                const unit = player.unitZone?.[i];
                return (
                  <CardSlot 
                    key={i}
                    card={unit || null}
                    label={`UNIT ${i+1}`}
                    onHover={onHoverCard}
                    onClick={() => unit && onCardClick?.(unit, 'unit', i)}
                    isExhausted={unit ? player.hasExhaustedThisTurn?.includes(unit.id) : false}
                    isSelectedForPayment={unit ? paymentSelection?.exhaustIds.includes(unit.id) : false}
                    isAttacking={unit ? selectedAttackers?.includes(unit.id) : false}
                    showCount={false}
                  />
                );
              })}
            </div>

            {/* Player Erosion Zone */}
            <div className="grid grid-cols-10 gap-1">
              {romanNumerals.map((num, i) => {
                const frontCard = player.erosionFront?.[i];
                const backCard = player.erosionBack?.[i];
                return (
                  <div key={i} className="flex flex-col gap-1 items-center">
                    <div className="relative aspect-[3/4] w-full">
                      {backCard && (
                        <CardSlot 
                          card={null}
                          isFaceUp={false}
                          onHover={() => onHoverCard?.(backCard)}
                          className="border-red-900/50"
                          showCount={false}
                        />
                      )}
                      {frontCard && (
                        <CardSlot 
                          card={frontCard}
                          isFaceUp={true}
                          onHover={onHoverCard}
                          onClick={() => onCardClick?.(frontCard, 'erosion_front', i)}
                          isSelectedForPayment={paymentSelection?.erosionFrontIds?.includes(frontCard.id)}
                          className="absolute inset-0 border-red-600"
                          showCount={false}
                        />
                      )}
                      {!frontCard && !backCard && (
                        <div className="h-full w-full rounded-md border border-dashed border-white/5 bg-white/5 flex items-center justify-center">
                          <span className="text-[8px] opacity-20">{num}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-black text-white/30">{num}</span>
                  </div>
                );
              })}
            </div>

            {/* Player Hand Area */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative min-h-[140px] flex items-end justify-center perspective-[1000px] bg-black/20 rounded-xl border border-white/5">
                {player.hand?.map((card, i) => {
                  const total = player.hand.length;
                  const middle = (total - 1) / 2;
                  const offset = i - middle;
                  const rotation = offset * 4; // 4 degrees per card
                  const translateY = Math.abs(offset) * 2; // push down outer cards
                  const canPlayCheck = GameService.canPlayCard(player, card);
                  const isHovered = hoveredHandCardId === card.id;

                  return (
                    <div 
                      key={i} 
                      className="absolute bottom-[-20px] w-24 origin-bottom transition-all duration-200 cursor-pointer group"
                      style={{
                        transform: isHovered 
                          ? `translateX(${offset * 30}px) translateY(-40px) scale(1.2) rotate(0deg) translateZ(50px)` 
                          : `translateX(${offset * 30}px) translateY(${translateY}px) rotate(${rotation}deg)`,
                        zIndex: isHovered ? 50 : i
                      }}
                      onMouseEnter={() => {
                        onHoverCard?.(card);
                        setHoveredHandCardId(card.id);
                      }}
                      onMouseLeave={() => {
                        onHoverCard?.(null);
                        setHoveredHandCardId(null);
                      }}
                      onClick={() => onCardClick?.(card, 'hand', i)}
                    >
                      <CardComponent card={card} className="shadow-2xl" />
                      
                      {/* Play Button Overlay */}
                      {isHovered && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2">
                          {canPlayCheck.canPlay ? (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onPlayCard?.(card);
                              }}
                              className="bg-[#f27d26] text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(242,125,38,0.5)] hover:scale-110 transition-transform flex items-center gap-1"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              PLAY
                            </button>
                          ) : (
                            <div className="bg-red-900/90 text-red-200 text-[9px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap border border-red-500/30">
                              {canPlayCheck.reason}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                {(player.hand?.length || 0) === 0 && <span className="text-[10px] text-white/20 uppercase font-bold italic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Empty Hand</span>}
              </div>
              <div className="w-20 shrink-0">
                <CardSlot 
                  card={(player.playZone?.length || 0) > 0 ? player.playZone[player.playZone.length - 1] : null}
                  label="PLAY" count={player.playZone?.length || 0}
                  className="border-yellow-500/30"
                  onHover={onHoverCard}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col gap-4 h-full min-h-0 justify-center">
        {isOpponent ? (
          // Opponent Right: Item Zone
          <div className="grid grid-cols-2 grid-rows-5 gap-1 h-full">
            {Array.from({ length: 10 }).map((_, i) => {
              const item = player.itemZone?.[i];
              return (
                <CardSlot 
                  key={i}
                  card={item || null}
                  label={`ITEM ${i+1}`}
                  onHover={onHoverCard}
                  onClick={() => item && onCardClick?.(item, 'item', i)}
                  isExhausted={item ? player.hasExhaustedThisTurn?.includes(item.id) : false}
                  isSelectedForPayment={item ? paymentSelection?.exhaustIds.includes(item.id) : false}
                  showCount={false}
                />
              );
            })}
          </div>
        ) : (
          // Player Right: Exile, Grave, Deck
          <div className="flex flex-col gap-2">
            <CardSlot 
              card={(player.exile?.length || 0) > 0 ? player.exile[player.exile.length - 1] : null} 
              label="EXILE" count={player.exile?.length || 0} 
              className="border-purple-900/30"
              onClick={() => setViewingZone({ title: 'Exile', cards: player.exile || [] })}
              onHover={onHoverCard}
              isFaceUp={true}
            />
            <CardSlot 
              card={(player.grave?.length || 0) > 0 ? player.grave[player.grave.length - 1] : null} 
              label="GRAVE" count={player.grave?.length || 0} 
              className="border-red-900/30"
              onClick={() => setViewingZone({ title: 'Grave', cards: player.grave || [] })}
              onHover={onHoverCard}
              isFaceUp={true}
            />
            <CardSlot 
              card={null} isDeck label="DECK" count={player.deck?.length || 0} 
              className="border-white/20"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const PlayField: React.FC<PlayFieldProps> = ({ player, opponent, game, onCardClick, onHoverCard, onPlayCard, paymentSelection, stack, myUid, selectedAttackers }) => {
  return (
    <div className="relative w-full h-full max-w-7xl mx-auto bg-[#0a0a0a] border-2 border-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden font-mono text-white select-none flex flex-col">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #f27d26 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      {/* Opponent Half */}
      <div className="flex-1 min-h-0">
        <PlayerHalf 
          player={opponent} 
          isOpponent 
          onCardClick={onCardClick}
          onHoverCard={onHoverCard}
        />
      </div>

      {/* STACK AREA & PHASE INDICATOR */}
      <div className="h-16 shrink-0 border-y border-white/10 bg-white/5 flex items-center justify-between px-6 relative z-10">
        {/* Left: Stack */}
        <div className="flex items-center gap-4 flex-1">
          {stack.length === 0 && <span className="text-[10px] text-white/10 uppercase font-bold italic tracking-widest">Stack Empty</span>}
          {stack.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="w-12 relative group"
              onMouseEnter={() => onHoverCard?.(item.card)}
              onMouseLeave={() => onHoverCard?.(null)}
            >
              <CardComponent card={item.card} />
              <div className={cn(
                "absolute -top-2 -left-2 px-2 py-0.5 rounded text-[8px] font-black uppercase italic shadow-lg",
                item.ownerUid === myUid ? "bg-[#f27d26] text-black" : "bg-red-600 text-white"
              )}>
                {item.ownerUid === myUid ? "Me" : "Opp"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center: Phase Indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/50 px-8 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-white/40 uppercase tracking-widest">回合数</span>
            <span className="text-sm font-black italic text-[#f27d26]">T{game.turnCount}</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-white/40 uppercase tracking-widest">当前阶段</span>
            <span className="text-sm font-black italic text-white uppercase">{game.phase}</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className={cn(
             "px-4 py-1 rounded-full text-xs font-black uppercase italic tracking-widest shadow-lg",
             game.players[game.currentTurnPlayer].uid === myUid ? "bg-[#f27d26] text-black shadow-[#f27d26]/20" : "bg-red-600 text-white shadow-red-600/20"
           )}>
             {game.players[game.currentTurnPlayer].uid === myUid ? "你的回合" : "对手回合"}
          </div>
        </div>
        
        {/* Right: Empty for balance */}
        <div className="flex-1" />
      </div>

      {/* Player Half */}
      <div className="flex-1 min-h-0">
        <PlayerHalf 
          player={player} 
          onCardClick={onCardClick}
          onHoverCard={onHoverCard}
          onPlayCard={onPlayCard}
          paymentSelection={paymentSelection}
          selectedAttackers={selectedAttackers}
        />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(242, 125, 38, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
