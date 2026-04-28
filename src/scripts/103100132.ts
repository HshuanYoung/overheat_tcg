import { Card, CardEffect } from '../types/game';
import { addInfluence, ensureData } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '103100132_indestructible_effect',
  type: 'CONTINUOUS',
  description: '不会被效果破坏。',
  applyContinuous: (_gameState, instance) => {
    ensureData(instance).indestructibleByEffect = true;
    addInfluence(instance, instance, '不会被效果破坏');
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103100132
 * Card2 Row: 110
 * Card Row: 110
 * Source CardNo: BT02-G04
 * Package: BT02(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:这个单位不会被效果破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103100132',
  fullName: '日蚀的幸存者',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '艾柯利普斯',
  acValue: 2,
  power: 2000,
  basePower: 2000,
  damage: 2,
  baseDamage: 2,
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
