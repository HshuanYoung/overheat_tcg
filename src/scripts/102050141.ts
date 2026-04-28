import { Card, CardEffect } from '../types/game';
import { addContinuousDamage, addContinuousPower, getOpponentUid, ownUnits } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '102050141_weaken_if_opponent_god',
  type: 'CONTINUOUS',
  description: '若对手战场上有神蚀单位，伤害-1，力量-1500。',
  applyContinuous: (gameState, instance) => {
    const ownerUid = Object.entries(gameState.players).find(([, player]) =>
      player.unitZone.some(unit => unit?.gamecardId === instance.gamecardId)
    )?.[0];
    if (!ownerUid) return;
    const opponent = gameState.players[getOpponentUid(gameState, ownerUid)];
    if (!ownUnits(opponent).some(unit => unit.godMark)) return;
    addContinuousDamage(instance, instance, -1);
    addContinuousPower(instance, instance, -1500);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050141
 * Card2 Row: 125
 * Card Row: 125
 * Source CardNo: BT02-R02
 * Package: BT02(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:若对手的战场上有神蚀单位，这个单位〖伤害-1〗〖力量-1500〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050141',
  fullName: '铁道巡逻兵',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: {},
  faction: '伊列宇王国',
  acValue: 2,
  power: 3000,
  basePower: 3000,
  damage: 3,
  baseDamage: 3,
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
