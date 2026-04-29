import { Card, CardEffect } from '../types/game';
import { createSelectCardQuery, moveCardsToBottom, story } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '201000081_exile_replacement',
  type: 'CONTINUOUS',
  triggerLocation: ['PLAY'],
  content: 'EXILE_WHEN_LEAVES_PLAY_TO_GRAVE',
  description: '这张卡将要被送入墓地时，放逐作为代替。'
}, story('201000081_blessing', '所有玩家选择自己墓地中的3张卡，放置到自己的卡组底。', async (instance, gameState, playerState) => {
  const targets = playerState.grave;
  if (targets.length === 0) {
    const opponentUid = gameState.playerIds.find(id => id !== playerState.uid)!;
    const opponent = gameState.players[opponentUid];
    if (opponent.grave.length === 0) return;
    createSelectCardQuery(gameState, opponentUid, opponent.grave, '选择墓地的卡', '选择你的墓地中的至多3张卡，放置到卡组底。', Math.min(3, opponent.grave.length), Math.min(3, opponent.grave.length), { sourceCardId: instance.gamecardId, effectId: '201000081_blessing', step: 'OPPONENT', targetUid: opponentUid }, () => 'GRAVE');
    return;
  }
  createSelectCardQuery(gameState, playerState.uid, targets, '选择墓地的卡', '选择你的墓地中的至多3张卡，放置到卡组底。', Math.min(3, targets.length), Math.min(3, targets.length), { sourceCardId: instance.gamecardId, effectId: '201000081_blessing', step: 'SELF', actingUid: playerState.uid }, () => 'GRAVE');
}, {
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    const uid = context?.targetUid || context?.actingUid || playerState.uid;
    const player = gameState.players[uid];
    const cards = selections.map(id => player.grave.find(card => card.gamecardId === id)).filter((card): card is Card => !!card);
    moveCardsToBottom(gameState, uid, cards, instance);
    if (context?.step === 'SELF') {
      const opponentUid = gameState.playerIds.find(id => id !== uid)!;
      const opponent = gameState.players[opponentUid];
      if (opponent.grave.length > 0) {
        createSelectCardQuery(gameState, opponentUid, opponent.grave, '选择墓地的卡', '选择你的墓地中的至多3张卡，放置到卡组底。', Math.min(3, opponent.grave.length), Math.min(3, opponent.grave.length), { sourceCardId: instance.gamecardId, effectId: '201000081_blessing', step: 'OPPONENT', targetUid: opponentUid }, () => 'GRAVE');
      }
    }
  }
})];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 201000081
 * Card2 Row: 237
 * Card Row: 237
 * Source CardNo: BT03-W12
 * Package: BT03(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 这张卡将要被送入墓地时，将这张卡放逐作为代替。
 * 所有玩家选择他自己的墓地中的3张卡，将其放置到他自己的卡组底。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '201000081',
  fullName: '恩泽',
  specialName: '',
  type: 'STORY',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '无',
  acValue: -3,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
