import { Card, CardEffect } from '../types/game';
import { destroyByEffect, getOpponentUid, story } from './BaseUtil';

const cardEffects: CardEffect[] = [story('203000129_trample', '创痕2：你的战场上有ACCESS+5以上且具有【神依】的神蚀单位才可使用。破坏对手所有非神蚀单位。', async (instance, gameState, playerState) => {
  const opponent = gameState.players[getOpponentUid(gameState, playerState.uid)];
  opponent.unitZone.filter(unit => unit && !unit.godMark).forEach(unit => {
    if (unit) destroyByEffect(gameState, unit, instance);
  });
}, {
  erosionBackLimit: [2, 10],
  condition: (gameState, playerState) =>
    playerState.unitZone.some(unit => unit && unit.godMark && unit.isShenyi && (unit.acValue || 0) >= 5) &&
    gameState.players[getOpponentUid(gameState, playerState.uid)].unitZone.some(unit => unit && !unit.godMark)
})];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 203000129
 * Card2 Row: 300
 * Card Row: 539
 * Source CardNo: BT04-G09
 * Package: BT04(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕2】（你的侵蚀区中的背面卡有2张以上时才有效）你的战场上有ACCESS值在+5以上并具有【神依】的神蚀单位才可以使用。将对手的所有非神蚀单位破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '203000129',
  fullName: '霸者的践踏',
  specialName: '',
  type: 'STORY',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 2 },
  faction: '无',
  acValue: 5,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
