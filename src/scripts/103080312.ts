import { Card, CardEffect } from '../types/game';
import { moveRandomGraveToDeckBottom } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '103080312_awaken_recover',
  type: 'TRIGGER',
  triggerLocation: ['UNIT'],
  triggerEvent: 'UNIT_AWAKENED' as any,
  limitCount: 1,
  description: '1回合1次：这个单位适用唤醒时，恢复2。',
  condition: (_gameState, playerState, instance, event) =>
    event?.sourceCardId === instance.gamecardId &&
    playerState.grave.length > 0,
  execute: async (instance, gameState, playerState) => {
    moveRandomGraveToDeckBottom(gameState, playerState.uid, Math.min(2, playerState.grave.length), instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103080312
 * Card2 Row: 546
 * Card Row: 366
 * Source CardNo: BT07-G02
 * Package: BT07(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖1回合1次〗{这个单位适用唤醒时}:恢复2（随机选择你墓地中的2张卡，将其放置到你的卡组底）。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103080312',
  fullName: '有翼图腾',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '神木森',
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
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
