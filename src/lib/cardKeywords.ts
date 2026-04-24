import { Card } from '../types/game';

export type CardKeywordId = 'RUSH' | 'ANNIHILATION' | 'SHENYI' | 'HEROIC';

export interface CardKeywordMeta {
  id: CardKeywordId;
  label: string;
  shortLabel: string;
  description: string;
}

export const CARD_KEYWORD_DEFINITIONS: Record<CardKeywordId, CardKeywordMeta> = {
  RUSH: {
    id: 'RUSH',
    label: '速攻',
    shortLabel: '速',
    description: '这张单位在进入战场的回合也可以宣言攻击。'
  },
  ANNIHILATION: {
    id: 'ANNIHILATION',
    label: '歼灭',
    shortLabel: '歼',
    description: '若这张单位在战斗中破坏对手单位并存活，会再对对手造成等同于自身伤害值的额外战斗伤害。联军攻击时，存活的歼灭单位也会分别追加伤害。'
  },
  SHENYI: {
    id: 'SHENYI',
    label: '神依',
    shortLabel: '神',
    description: '1回合1次，当你进入女神化状态时，将这张单位重置。'
  },
  HEROIC: {
    id: 'HEROIC',
    label: '英勇',
    shortLabel: '勇',
    description: '如果这张单位在你的回合中参与过攻击，则在你的回合结束时将其重置。'
  }
};

export const getCardKeywords = (card?: Card | null): CardKeywordMeta[] => {
  if (!card) return [];

  const keywords: CardKeywordMeta[] = [];

  if (card.isrush) {
    keywords.push(CARD_KEYWORD_DEFINITIONS.RUSH);
  }
  if (card.isAnnihilation) {
    keywords.push(CARD_KEYWORD_DEFINITIONS.ANNIHILATION);
  }
  if (card.isShenyi) {
    keywords.push(CARD_KEYWORD_DEFINITIONS.SHENYI);
  }
  if (card.isHeroic) {
    keywords.push(CARD_KEYWORD_DEFINITIONS.HEROIC);
  }

  return keywords;
};
