import { Card, CardEffect } from '../types/game';
import { getOpponentUid, millTop } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '103000500_grave_to_deck_mill',
  type: 'TRIGGER',
  triggerEvent: 'CARD_ENTERED_ZONE',
  triggerLocation: ['UNIT'],
  isGlobal: true,
  limitCount: 1,
  description: '1回合1次：对手从墓地将卡放置到卡组时，将他的卡组顶3张送入墓地。',
  condition: (_gameState, playerState, _instance, event) =>
    event?.playerUid === getOpponentUid(_gameState, playerState.uid) &&
    event.data?.sourceZone === 'GRAVE' &&
    event.data?.zone === 'DECK',
  execute: async (instance, gameState, playerState) => {
    millTop(gameState, getOpponentUid(gameState, playerState.uid), 3, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103000500
 * Card2 Row: 292
 * Card Row: 647
 * Source CardNo: BT04-G01
 * Package: BT04(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖1回合1次〗：对手从墓地将卡放置到卡组时，将他的卡组顶的三张卡送入墓地。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103000500',
  fullName: '隐居的精灵',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 1,
  power: 500,
  basePower: 500,
  damage: 0,
  baseDamage: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
