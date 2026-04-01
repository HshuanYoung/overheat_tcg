import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, PlayerState, StackItem } from '../types/game';
import { CardComponent } from './Card';
import { Shield, Sword, Zap, Trash2, LogOut, Layers, AlertTriangle, Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface PlayFieldProps {
  player: PlayerState;
  opponent: PlayerState;
  onCardClick?: (card: Card, zone: string, index?: number) => void;
  onHoverCard?: (card: Card | null) => void;
  paymentSelection?: { useFeijing: string[], exhaustIds: string[] };
  stack: StackItem[];
  myUid: string;
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
}> = ({ card, label, onClick, onHover, className, isErosion, isFaceUp = true, isExhausted, isSelectedForPayment, isDeck, count = 0, showCount = true }) => {
  // Calculate thickness layers (max 8 for visual performance)
  const layers = Math.min(Math.floor(count / 3), 8);
  
  return (
    <div className="relative w-full aspect-[3/4]">
      {/* Thickness Layers */}
      {Array.from({ length: layers }).map((_, i) => (
        <div 
          key={i}
          className="absolute inset-0 rounded-md border border-white/10 bg-zinc-900"
          style={{ transform: `translate(${(i + 1) * 0.5}px, -${(i + 1) * 0.5}px)`, zIndex: -i - 1 }}
        />
      ))}
      
      <div
        className={cn(
          "relative h-full w-full rounded-md border-2 border-dashed transition-all flex items-center justify-center group overflow-hidden cursor-pointer",
          (card || isDeck || count > 0) ? "border-[#f27d26]/50 bg-black/40 shadow-lg" : "border-white/10 bg-white/5",
          isExhausted ? "rotate-90 scale-90 opacity-80" : "",
          isSelectedForPayment ? "ring-2 ring-[#f27d26] ring-offset-2 ring-offset-black z-10" : "",
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
  paymentSelection?: { useFeijing: string[], exhaustIds: string[] };
}> = ({ player, isOpponent, onCardClick, onHoverCard, paymentSelection }) => {
  const romanNumerals = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ'];
  const [viewingZone, setViewingZone] = useState<{ title: string, cards: Card[] } | null>(null);
  
  if (!player) return null;

  return (
    <div className={cn(
      "flex-1 grid grid-cols-[120px_1fr_120px] gap-4 p-4 relative",
      isOpponent ? "bg-red-500/5" : "bg-blue-500/5"
    )}>
      <CardListModal 
        isOpen={!!viewingZone}
        onClose={() => setViewingZone(null)}
        title={viewingZone?.title || ''}
        cards={viewingZone?.cards || []}
      />

      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-4">
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
            />
            <CardSlot 
              card={(player.exile?.length || 0) > 0 ? player.exile[player.exile.length - 1] : null} 
              label="EXILE" count={player.exile?.length || 0} 
              className="border-purple-900/30"
              onClick={() => setViewingZone({ title: 'Exile', cards: player.exile || [] })}
              onHover={onHoverCard}
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
      <div className={cn(
        "flex flex-col gap-4",
        isOpponent ? "flex-col" : "flex-col-reverse"
      )}>
        {/* Hand Area */}
        <div className="flex items-center gap-4">
          {isOpponent && (
            <div className="w-20 shrink-0">
              <CardSlot 
                card={(player.playZone?.length || 0) > 0 ? player.playZone[player.playZone.length - 1] : null}
                label="PLAY" count={player.playZone?.length || 0}
                className="border-yellow-500/30"
                onHover={onHoverCard}
              />
            </div>
          )}
          <div className="flex-1 h-24 flex items-center justify-center gap-1 overflow-x-auto px-4 bg-black/20 rounded-xl border border-white/5 custom-scrollbar">
            {player.hand?.map((card, i) => (
              <div 
                key={i} 
                className="w-14 shrink-0 hover:-translate-y-2 transition-transform cursor-pointer"
                onMouseEnter={() => onHoverCard?.(card)}
                onMouseLeave={() => onHoverCard?.(null)}
                onClick={() => onCardClick?.(card, 'hand', i)}
              >
                {isOpponent ? <CardComponent isBack /> : <CardComponent card={card} />}
              </div>
            ))}
            {(player.hand?.length || 0) === 0 && <span className="text-[10px] text-white/20 uppercase font-bold italic">Empty Hand</span>}
          </div>
          {!isOpponent && (
            <div className="w-20 shrink-0">
              <CardSlot 
                card={(player.playZone?.length || 0) > 0 ? player.playZone[player.playZone.length - 1] : null}
                label="PLAY" count={player.playZone?.length || 0}
                className="border-yellow-500/30"
                onHover={onHoverCard}
              />
            </div>
          )}
        </div>

        <div className={cn(
          "flex flex-col gap-4",
          isOpponent ? "flex-col" : "flex-col-reverse"
        )}>
          {/* UNIT ZONE */}
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
                  showCount={false}
                />
              );
            })}
          </div>

          {/* EROSION ZONE */}
          <div className="grid grid-cols-10 gap-1">
            {romanNumerals.map((num, i) => {
              const frontCard = player.erosionFront?.[i];
              const backCard = player.erosionBack?.[i];
              return (
                <div key={i} className="flex flex-col gap-1">
                  <div className="relative aspect-[3/4]">
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
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col gap-4">
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
            />
            <CardSlot 
              card={(player.grave?.length || 0) > 0 ? player.grave[player.grave.length - 1] : null} 
              label="GRAVE" count={player.grave?.length || 0} 
              className="border-red-900/30"
              onClick={() => setViewingZone({ title: 'Grave', cards: player.grave || [] })}
              onHover={onHoverCard}
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

export const PlayField: React.FC<PlayFieldProps> = ({ player, opponent, onCardClick, onHoverCard, paymentSelection, stack, myUid }) => {
  return (
    <div className="relative w-full h-full bg-[#0a0a0a] border-4 border-[#1a1a1a] rounded-3xl shadow-2xl overflow-hidden font-mono text-white select-none flex flex-col">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #f27d26 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      {/* Opponent Half */}
      <PlayerHalf 
        player={opponent} 
        isOpponent 
        onCardClick={onCardClick}
        onHoverCard={onHoverCard}
      />

      {/* STACK AREA (Play Area) */}
      <div className="h-24 border-y border-white/10 bg-white/5 flex items-center justify-center gap-4 relative z-10">
        <div className="absolute left-4 text-[10px] font-black uppercase italic tracking-widest opacity-20">Counter Stack</div>
        {stack.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-16 relative group"
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
        {stack.length === 0 && <span className="text-[10px] text-white/10 uppercase font-bold italic tracking-widest">Stack Empty</span>}
      </div>

      {/* Player Half */}
      <PlayerHalf 
        player={player} 
        onCardClick={onCardClick}
        onHoverCard={onHoverCard}
        paymentSelection={paymentSelection}
      />

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
