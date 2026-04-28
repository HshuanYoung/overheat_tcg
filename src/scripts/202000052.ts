import { Card, CardEffect } from '../types/game';
import { createPlayerSelectQuery, damagePlayerByEffect, getOpponentUid, story } from './BaseUtil';

const cardEffects: CardEffect[] = [story('202000052_damage_player', '选择1名玩家，给予其1点伤害。若你在女神化状态下使用，改为2点。', async (instance, gameState, playerState) => {
  createPlayerSelectQuery(
    gameState,
    playerState.uid,
    '选择伤害玩家',
    `选择1名玩家，给予他${playerState.isGoddessMode ? 2 : 1}点伤害。`,
    { sourceCardId: instance.gamecardId, effectId: '202000052_damage_player' }
  );
}, {
  onQueryResolve: async (instance, gameState, playerState, selections) => {
    const targetUid = selections[0] === 'PLAYER_SELF' ? playerState.uid : getOpponentUid(gameState, playerState.uid);
    await damagePlayerByEffect(gameState, playerState.uid, targetUid, playerState.isGoddessMode ? 2 : 1, instance);
  }
})];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 202000052
 * Card2 Row: 135
 * Card Row: 135
 * Source CardNo: BT02-R12
 * Package: BT02(U)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 选择1名玩家，给予他1点伤害。若你在女神化状态下使用这张卡，改为给予他2点伤害。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '202000052',
  fullName: '星火',
  specialName: '',
  type: 'STORY',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '无',
  acValue: 0,
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
