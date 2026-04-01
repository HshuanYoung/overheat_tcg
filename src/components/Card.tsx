import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card as CardType } from '../types/game';
import { clsx } from 'clsx';
import { Sword, Shield, Zap, Info, Star, X, Plus } from 'lucide-react';

interface CardProps {
  card?: CardType;
  onClick?: () => void;
  className?: string;
  showDetails?: boolean;
  count?: number;
  isBack?: boolean;
  disableZoom?: boolean;
}

export const CardComponent: React.FC<CardProps> = ({ card, onClick, className, count, isBack, disableZoom }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (isBack || !card) {
    return (
      <motion.div
        layout
        className={clsx(
          "relative aspect-[3/4] w-full rounded-xl overflow-hidden border-2 border-zinc-700 cursor-default bg-zinc-900 shadow-xl",
          className
        )}
      >
        <img 
          src="/assets/card_bg.jpg" 
          alt="Card Back" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
    );
  }

  const isNegativeCost = card.acValue < 0;

  const handleCardClick = (e: React.MouseEvent) => {
    if (disableZoom) return;
    e.stopPropagation();
    setIsZoomed(true);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <>
      <motion.div
        layout
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCardClick}
        className={clsx(
          "relative aspect-[3/4] w-full rounded-xl overflow-hidden border-2 cursor-pointer group transition-all bg-zinc-900",
          card.rarity === 'UR' ? "border-yellow-500 card-glow-gold" : "border-zinc-700",
          className
        )}
      >
        {/* Card Image - Always show thumbnail in preview */}
        <img 
          src={card.imageUrl} 
          alt={card.fullName} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Top Right: Access Cost (Ac值) */}
        <div className="absolute top-2 right-2">
          <div className={clsx(
            "w-10 h-10 rounded-lg border-2 flex flex-col items-center justify-center font-black text-lg shadow-xl",
            isNegativeCost ? "bg-blue-900/90 border-blue-400 text-blue-100" : "bg-red-900/90 border-red-400 text-red-100"
          )}>
            <span className="text-[8px] leading-none opacity-70 uppercase">Ac</span>
            <span className="leading-none">{card.acValue > 0 ? `+${card.acValue}` : card.acValue}</span>
          </div>
        </div>

        {/* Bottom Stats: Damage and Power (伤害和力量) */}
        {card.type === 'UNIT' && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-blue-900/80 px-2 py-1 rounded border border-blue-400/50 shadow-lg">
              <span className="text-xs font-black text-blue-100">{card.damage}</span>
              <Sword className="w-3.5 h-3.5 text-blue-300" />
            </div>
            <div className="flex items-center gap-1 bg-zinc-900/90 px-2 py-1 rounded border border-white/20 shadow-lg">
              <span className="font-mono text-xs font-bold text-white tracking-tighter">{card.power}</span>
            </div>
          </div>
        )}

        {/* God Mark (神蚀标记) */}
        {card.godMark && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="w-7 h-7 rounded-full bg-zinc-950 border-2 border-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.6)]">
              <Zap className="w-4 h-4 text-red-500 fill-red-500" />
            </div>
          </div>
        )}

        {/* Action Button (e.g. Add to Deck) */}
        {onClick && (
          <button 
            onClick={handleActionClick}
            className="absolute top-2 left-2 w-8 h-8 rounded-full bg-red-600 border border-white/20 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        )}

        {/* Count Badge (for deck builder) */}
        {count !== undefined && count > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-xs font-bold z-10 shadow-lg">
            {count}
          </div>
        )}
      </motion.div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-4xl w-full max-h-full flex flex-col md:flex-row gap-8 items-center md:items-stretch"
            >
              {/* Full Image */}
              <div className="relative aspect-[3/4] h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <img 
                  src={card.fullImageUrl} 
                  alt={card.fullName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Close Button Mobile */}
                <button 
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-4 right-4 p-2 bg-black/60 rounded-full md:hidden"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Card Details Side */}
              <div className="flex-1 bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-black tracking-tighter text-white">{card.fullName}</h2>
                    <p className="text-zinc-400 font-bold">{card.faction} • {card.rarity}</p>
                  </div>
                  <button 
                    onClick={() => setIsZoomed(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block"
                  >
                    <X className="w-6 h-6 text-zinc-400" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                    <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Access Cost</p>
                    <p className={clsx("text-2xl font-black", isNegativeCost ? "text-blue-400" : "text-red-500")}>
                      {card.acValue > 0 ? `+${card.acValue}` : card.acValue}
                    </p>
                  </div>
                  {card.type === 'UNIT' && (
                    <>
                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                        <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Damage</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl font-black text-blue-400">{card.damage}</span>
                          <Sword className="w-5 h-5 text-blue-400" />
                        </div>
                      </div>
                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                        <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Power</p>
                        <p className="text-2xl font-black text-white">{card.power}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Effects</h4>
                  {card.effects.map((effect, idx) => (
                    <div key={idx} className="bg-black/40 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={clsx(
                          "px-2 py-0.5 rounded text-[10px] font-bold text-white",
                          effect.type === '永' ? "bg-green-600" : 
                          effect.type === '诱' ? "bg-blue-600" :
                          effect.type === '启' ? "bg-red-600" : "bg-zinc-600"
                        )}>
                          {effect.type}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">{effect.description}</p>
                    </div>
                  ))}
                </div>

                {card.flavorText && (
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <p className="text-xs italic text-zinc-500 leading-relaxed">"{card.flavorText}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
