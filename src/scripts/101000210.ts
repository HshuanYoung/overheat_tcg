import { Card, CardEffect } from '../types/game';
import { moveCard, ownUnits } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '101000210_bottom_to_hand',
  type: 'TRIGGER',
  triggerEvent: 'CARD_ENTERED_ZONE',
  triggerLocation: ['UNIT'],
  isMandatory: true,
  description: '入场时，若你的战场上有具有【神依】的单位，将卡组底1张卡加入手牌。',
  condition: (_gameState, playerState, instance, event) =>
    event?.sourceCardId === instance.gamecardId &&
    event.data?.zone === 'UNIT' &&
    ownUnits(playerState).some(unit => unit.isShenyi),
  execute: async (instance, gameState, playerState) => {
    const bottom = playerState.deck[0];
    if (bottom) moveCard(gameState, playerState.uid, bottom, 'HAND', instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101000210
 * Card2 Row: 236
 * Card Row: 236
 * Source CardNo: BT03-W11
 * Package: BT03(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】:这个单位进入战场时，若你的战场上有具有【神依】的单位，将你的卡组底的1张卡加入手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101000210',
  fullName: '析梦人',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '无',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isShenyi: false,
  baseShenyi: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
