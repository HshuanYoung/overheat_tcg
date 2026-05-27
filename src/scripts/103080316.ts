import { Card, CardEffect } from '../types/game';
import { addTempKeyword, readyByEffect } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '103080316_cub_enter_awaken',
  type: 'TRIGGER',
  isMandatory: true,
  triggerLocation: ['UNIT'],
  triggerEvent: 'UNIT_AWAKENED' as any,
  limitCount: 1,
  description: '1回合1次：由于《仔虎》的效果进入战场的这个单位适用唤醒时，重置并获得歼灭。',
  condition: (_gameState, _playerState, instance, event) =>
    event?.sourceCardId === instance.gamecardId &&
    (instance as any).data?.enteredByCubEffectTurn !== undefined,
  execute: async (instance, gameState, playerState) => {
    readyByEffect(gameState, instance, instance);
    addTempKeyword(instance, instance, 'annihilation');
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103080316
 * Card2 Row: 550
 * Card Row: 370
 * Source CardNo: BT07-G06
 * Package: BT07(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖1回合1次〗{由于《仔虎》的效果进入战场的这个单位适用唤醒时}:将这个单位〖重置〗，并获得【歼灭】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103080316',
  fullName: '利牙剑虎',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '神木森',
  acValue: 4,
  power: 3000,
  basePower: 3000,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isAnnihilation: false,
  baseAnnihilation: false,
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
