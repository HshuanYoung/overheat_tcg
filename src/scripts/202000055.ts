import { Card, CardEffect } from '../types/game';
import { allUnitsOnField, destroyByEffect, story } from './BaseUtil';

const cardEffects: CardEffect[] = [story('202000055_destroy_small', '创痕2：将战场上力量2000以下的所有单位破坏。', async (instance, gameState) => {
  allUnitsOnField(gameState)
    .filter(unit => (unit.power || 0) <= 2000)
    .forEach(unit => destroyByEffect(gameState, unit, instance));
}, {
  erosionBackLimit: [2, 10]
})];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 202000055
 * Card2 Row: 139
 * Card Row: 139
 * Source CardNo: BT02-R15
 * Package: BT02(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕2】将战场上的〖力量2000〗以下的所有单位破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '202000055',
  fullName: '连锁闪电',
  specialName: '',
  type: 'STORY',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '无',
  acValue: 4,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
