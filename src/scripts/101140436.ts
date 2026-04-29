import { Card, CardEffect } from '../types/game';
import { addContinuousPower, ownerOf, ownUnits } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '101140436_church_power',
  type: 'CONTINUOUS',
  triggerLocation: ['UNIT'],
  description: '你的战场上每有1个<女神教会>单位，这个单位力量+500。',
  applyContinuous: (gameState, instance) => {
    const owner = ownerOf(gameState, instance);
    if (!owner) return;
    const amount = ownUnits(owner).filter(unit => unit.faction === '女神教会').length * 500;
    if (amount > 0) addContinuousPower(instance, instance, amount);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101140436
 * Card2 Row: 313
 * Card Row: 552
 * Source CardNo: BT04-W02
 * Package: BT04(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：你的战场上每有一个<女神教会>的单位，这个单位〖力量+500〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101140436',
  fullName: '光耀天使',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: {},
  faction: '女神教会',
  acValue: 2,
  power: 1000,
  basePower: 1000,
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
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
