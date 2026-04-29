import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, allUnitsOnField, createSelectCardQuery, destroyByEffect, getOpponentUid, ownUnits, story } from './BaseUtil';

const cardEffects: CardEffect[] = [story('202000131_duel', '创痕3，1游戏1次：所有玩家各选择自己的1个单位，破坏选择以外的所有单位。', async (instance, gameState, playerState) => {
  createSelectCardQuery(gameState, playerState.uid, ownUnits(playerState), '选择保留单位', '选择你的1个单位，其余单位稍后会被破坏。', 1, 1, {
    sourceCardId: instance.gamecardId,
    effectId: '202000131_duel',
    step: 'SELF'
  });
}, {
  erosionBackLimit: [3, 10],
  limitCount: 1,
  limitGlobal: true,
  condition: (_gameState, playerState) => ownUnits(playerState).length > 0,
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.step === 'SELF') {
      const opponentUid = getOpponentUid(gameState, playerState.uid);
      const opponentUnits = ownUnits(gameState.players[opponentUid]);
      if (opponentUnits.length > 0) {
        createSelectCardQuery(gameState, opponentUid, opponentUnits, '选择保留单位', '选择你的1个单位，其余单位稍后会被破坏。', 1, 1, {
          sourceCardId: instance.gamecardId,
          effectId: '202000131_duel',
          step: 'OPPONENT',
          keepIds: selections
        });
        return;
      }
    }
    const keepIds = new Set([...(context?.keepIds || []), ...selections]);
    allUnitsOnField(gameState).forEach(unit => {
      if (!keepIds.has(unit.gamecardId)) destroyByEffect(gameState, unit, instance);
    });
  }
})];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 202000131
 * Card2 Row: 311
 * Card Row: 550
 * Source CardNo: BT04-R10
 * Package: BT04(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖侵蚀3〗（你的侵蚀区中的背面卡有3张以上时才有效）
 * 〖1游戏1次〗所有玩家选择他自己的一个单位，将选择的单位以外的所有单位破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '202000131',
  fullName: '单人对决',
  specialName: '',
  type: 'STORY',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 3 },
  faction: '无',
  acValue: 3,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
