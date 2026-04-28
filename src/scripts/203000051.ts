import { Card, CardEffect } from '../types/game';
import { allUnitsOnField, destroyByEffect, story } from './BaseUtil';

const cardEffects: CardEffect[] = [story('203000051_destroy_except_highest', '创痕3：将战场上除了力量值最高的单位以外的所有单位破坏。', async (instance, gameState) => {
  const units = allUnitsOnField(gameState);
  if (units.length === 0) return;
  const highest = Math.max(...units.map(unit => unit.power || 0));
  units
    .filter(unit => (unit.power || 0) < highest)
    .forEach(unit => destroyByEffect(gameState, unit, instance));
}, {
  erosionBackLimit: [3, 10]
})];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 203000051
 * Card2 Row: 120
 * Card Row: 120
 * Source CardNo: BT02-G14
 * Package: BT02(U)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕3】将战场上的除了力量值最高的单位以外的所有单位破坏。（若力量值最高的单位有复数个，这些单位都不会破坏）
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '203000051',
  fullName: '优胜劣汰',
  specialName: '',
  type: 'STORY',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '无',
  acValue: 7,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'U',
  availableRarities: ['U'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
