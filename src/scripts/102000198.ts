import { Card, CardEffect } from '../types/game';
import { addContinuousDamage, addContinuousPower, ownUnits, ownerOf } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '102000198_pack_boost',
  type: 'CONTINUOUS',
  triggerLocation: ['UNIT'],
  description: '你的战场上每有1张这个单位以外的《异神的魔犬》，这个单位伤害+1、力量+500。',
  applyContinuous: (gameState, instance) => {
    const owner = ownerOf(gameState, instance);
    if (!owner) return;
    const count = ownUnits(owner).filter(unit => unit.gamecardId !== instance.gamecardId && unit.id === '102000198').length;
    if (count <= 0) return;
    addContinuousDamage(instance, instance, count);
    addContinuousPower(instance, instance, count * 500);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102000198
 * Card2 Row: 217
 * Card Row: 217
 * Source CardNo: BT03-R09
 * Package: BT03(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:你的战场上每有1张这个单位以外的《异神的魔犬》，这个单位〖伤害+1〗〖力量+500〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102000198',
  fullName: '异神的魔犬',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 2,
  power: 2000,
  basePower: 2000,
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
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
