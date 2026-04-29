import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, attackingUnits, createSelectCardQuery, destroyByEffect, getOpponentUid, story } from './BaseUtil';

const cardEffects: CardEffect[] = [story('201000133_counter', '只能在你有卡被放逐的回合使用。选择对手1个正在攻击的单位破坏。', async (instance, gameState, playerState) => {
  const opponentUid = getOpponentUid(gameState, playerState.uid);
  const targets = attackingUnits(gameState).filter(unit => AtomicEffectExecutor.findCardOwnerKey(gameState, unit.gamecardId) === opponentUid);
  createSelectCardQuery(gameState, playerState.uid, targets, '选择攻击单位', '选择对手1个正在进行攻击的单位破坏。', 1, 1, {
    sourceCardId: instance.gamecardId,
    effectId: '201000133_counter'
  });
}, {
  condition: (gameState, playerState) => (playerState as any).cardExiledTurn === gameState.turnCount && attackingUnits(gameState).some(unit => AtomicEffectExecutor.findCardOwnerKey(gameState, unit.gamecardId) === getOpponentUid(gameState, playerState.uid)),
  onQueryResolve: async (instance, gameState, _playerState, selections) => {
    const target = selections[0] ? AtomicEffectExecutor.findCardById(gameState, selections[0]) : undefined;
    if (target?.cardlocation === 'UNIT') destroyByEffect(gameState, target, instance);
  }
})];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 201000133
 * Card2 Row: 320
 * Card Row: 559
 * Source CardNo: BT04-W09
 * Package: BT04(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 只能在你有卡被放逐的回合中使用。选择对手的1个正在进行攻击的单位破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '201000133',
  fullName: '神圣反击',
  specialName: '',
  type: 'STORY',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '无',
  acValue: 2,
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
