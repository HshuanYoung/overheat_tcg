import { Card, CardEffect } from '../types/game';
import { addInfluence } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '103000138_annihilation',
  type: 'CONTINUOUS',
  description: '获得歼灭。',
  applyContinuous: (_gameState, instance) => {
    instance.isAnnihilation = true;
    addInfluence(instance, instance, '获得效果: 【歼灭】');
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103000138
 * Card2 Row: 116
 * Card Row: 116
 * Source CardNo: BT02-G10
 * Package: BT02(U)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【歼灭】
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103000138',
  fullName: '苹果鹿',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 5,
  power: 3500,
  basePower: 3500,
  damage: 3,
  baseDamage: 3,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isAnnihilation: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'U',
  availableRarities: ['U'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
