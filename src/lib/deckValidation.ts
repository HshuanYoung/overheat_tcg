import { CARD_LIBRARY } from '../data/cards';
import { Card, Deck } from '../types/game';

const cardIndex = new Map<string, Card>();

for (const card of CARD_LIBRARY) {
  if (!cardIndex.has(card.id)) {
    cardIndex.set(card.id, card);
  }
  if (card.uniqueId && !cardIndex.has(card.uniqueId)) {
    cardIndex.set(card.uniqueId, card);
  }
}

const resolveDeckCards = (deck: Deck): Card[] | null => {
  const cards = deck.cards.map(cardId => cardIndex.get(cardId)).filter(Boolean) as Card[];
  return cards.length === deck.cards.length ? cards : null;
};

export const validateDeckForBattle = (deck?: Deck | null): { valid: boolean; error?: string } => {
  if (!deck) {
    return { valid: false, error: '请先选择一个卡组' };
  }

  const cards = resolveDeckCards(deck);
  if (!cards) {
    return { valid: false, error: '卡组中包含未找到的卡牌，请重新保存该卡组后再试' };
  }

  if (cards.length !== 50) {
    return { valid: false, error: `卡组必须正好为 50 张卡牌 (当前: ${cards.length})` };
  }

  const godMarkCount = cards.filter(card => card.godMark).length;
  if (godMarkCount > 10) {
    return { valid: false, error: `卡组中带有神蚀标记的卡牌不能超过 10 张 (当前: ${godMarkCount})` };
  }

  const nameCount = new Map<string, number>();
  for (const card of cards) {
    const nextCount = (nameCount.get(card.fullName) || 0) + 1;
    if (nextCount > 4) {
      return { valid: false, error: `同名卡牌 [${card.fullName}] 在卡组中不能超过 4 张` };
    }
    nameCount.set(card.fullName, nextCount);
  }

  return { valid: true };
};
