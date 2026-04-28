import { Card, CardEffect } from '../types/game';
import { addInfluence, ownerOf } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '101130153_first_holy_discount',
  type: 'CONTINUOUS',
  description: '每回合第1张<圣王国>单位卡ACCESS值-1，最低0。',
  applyContinuous: (gameState, instance) => {
    const owner = ownerOf(gameState, instance);
    if (!owner) return;
    const used = (owner as any).holyKingdomUnitDiscountUsedTurn === gameState.turnCount;
    owner.hand.forEach(card => {
      if (card.type !== 'UNIT' || card.faction !== '圣王国' || used) return;
      const base = card.baseAcValue ?? card.acValue ?? 0;
      const next = Math.max(0, base - 1);
      if (card.acValue !== next) {
        card.acValue = next;
        addInfluence(card, instance, 'ACCESS值-1');
      }
    });
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101130153
 * Card2 Row: 143
 * Card Row: 143
 * Source CardNo: BT02-W03
 * Package: BT02(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:你在每个回合中使用的第1张<圣王国>单位卡的ACCESS值减少1。（最低降到〖0〗）
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101130153',
  fullName: '祷告的群众',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: {},
  faction: '圣王国',
  acValue: 1,
  power: 500,
  basePower: 500,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
