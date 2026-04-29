import { Card, CardEffect } from '../types/game';
import { forbidAttackAndDefenseUntil, ownerOf } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '101000206_exile_attack_limit',
  type: 'CONTINUOUS',
  triggerLocation: ['UNIT'],
  description: '若你的放逐区少于7张，这个单位不能宣言攻击或防御。',
  applyContinuous: (gameState, instance) => {
    const owner = ownerOf(gameState, instance);
    if (!owner || owner.exile.length >= 7) return;
    forbidAttackAndDefenseUntil(instance, instance, gameState.turnCount);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101000206
 * Card2 Row: 232
 * Card Row: 232
 * Source CardNo: BT03-W07
 * Package: BT03(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:若你的放逐区的卡有7张以上，这个单位才能宣言攻击或防御。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101000206',
  fullName: '冰封猛犸',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 2,
  power: 3000,
  basePower: 3000,
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
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
