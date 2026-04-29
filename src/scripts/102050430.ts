import { Card, CardEffect } from '../types/game';
import { canPutUnitOntoBattlefield, createPlayerSelectQuery, damagePlayerByEffect, getOpponentUid, putUnitOntoField } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '102050430_goddess_enter_damage',
  type: 'TRIGGER',
  triggerEvent: 'GODDESS_TRANSFORMATION',
  triggerLocation: ['HAND'],
  erosionTotalLimit: [10, 10],
  description: '10+：你的回合中，你进入女神化状态时，可以将这张卡从手牌放置到战场上。之后选择1名玩家给予2点伤害。',
  condition: (_gameState, playerState, instance, event) =>
    playerState.isTurn &&
    event?.playerUid === playerState.uid &&
    canPutUnitOntoBattlefield(playerState, instance),
  execute: async (instance, gameState, playerState) => {
    if (!putUnitOntoField(gameState, playerState.uid, instance, instance)) return;
    createPlayerSelectQuery(gameState, playerState.uid, '选择伤害玩家', '选择1名玩家，给予他2点伤害。', {
      sourceCardId: instance.gamecardId,
      effectId: '102050430_goddess_enter_damage'
    });
  },
  onQueryResolve: async (instance, gameState, playerState, selections) => {
    const targetUid = selections[0] === 'PLAYER_SELF' ? playerState.uid : getOpponentUid(gameState, playerState.uid);
    await damagePlayerByEffect(gameState, playerState.uid, targetUid, 2, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050430
 * Card2 Row: 305
 * Card Row: 544
 * Source CardNo: BT04-R04
 * Package: BT04(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖10+〗【诱】:你的回合中，你由于你的卡的效果的伤害而进入女神化状态时，你可以将这张卡从手牌放置到战场上。之后，选择1名玩家，给予他2点伤害。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050430',
  fullName: '血焰的塔炮手',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '伊列宇王国',
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
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
