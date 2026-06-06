import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { createPortal } from 'react-dom';
import type { Card } from '../types/game';
import { getCardImageUrl } from '../lib/utils';
import { KeywordBadges } from './KeywordBadges';
import { CardEffectList } from './CardEffectList';

interface CardHoverPreviewPortalProps {
  card?: Card | null;
}

export const CardHoverPreviewPortal: React.FC<CardHoverPreviewPortalProps> = ({ card }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {card && <CardHoverPreview key={card.gamecardId || card.id} card={card} />}
    </AnimatePresence>,
    document.body
  );
};

const CardHoverPreview: React.FC<{ card: Card }> = ({ card }) => {
  const imageUrl = card.fullImageUrl || card.imageUrl || getCardImageUrl(card.id, card.rarity, false, card.availableRarities);

  if (!imageUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 18, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 18, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="pointer-events-none fixed right-4 top-24 z-[2300] hidden max-h-[calc(100vh-7rem)] w-[520px] overflow-hidden rounded-2xl border border-white/10 bg-black/85 p-3 shadow-2xl backdrop-blur-md lg:grid lg:grid-cols-[155px_1fr] lg:gap-3"
    >
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <img
          src={imageUrl}
          alt={card.fullName}
          className="aspect-[3/4] w-full object-contain"
          draggable={false}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="min-h-0 overflow-hidden">
        <div className="text-sm font-black text-white">{card.fullName}</div>
        <div className="mt-1 text-[10px] font-bold tracking-widest text-white/45">
          {card.id} · {card.type} · {card.color}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          <div className="rounded-lg border border-white/5 bg-white/5 px-2 py-1 text-center">
            <div className="text-[8px] font-black text-white/35">AC</div>
            <div className="text-xs font-black text-white">{card.acValue ?? '-'}</div>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/5 px-2 py-1 text-center">
            <div className="text-[8px] font-black text-white/35">力量</div>
            <div className="text-xs font-black text-white">{card.type === 'UNIT' ? card.power : '-'}</div>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/5 px-2 py-1 text-center">
            <div className="text-[8px] font-black text-white/35">伤害</div>
            <div className="text-xs font-black text-white">{card.type === 'UNIT' ? card.damage : '-'}</div>
          </div>
        </div>
        <div className="mt-2">
          <KeywordBadges card={card} variant="compact" />
        </div>
        {card.description && (
          <div className="mt-2 rounded-xl border border-white/5 bg-white/5 p-2 text-[11px] leading-relaxed text-white/55">
            {card.description}
          </div>
        )}
        <CardEffectList
          card={card}
          compact
          className="mt-2 max-h-[270px] overflow-y-auto pr-1 custom-scrollbar"
        />
      </div>
    </motion.div>
  );
};
