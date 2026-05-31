import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, allCardsOnField, createSelectCardQuery, destroyByEffect, isNonGodFieldCard, story } from './BaseUtil';

const cardEffects: CardEffect[] = [story('202000087_destroy_two', '主要阶段中，舍弃2张手牌。之后选择战场上的最多2张非神蚀卡破坏。', async (instance, gameState, playerState) => {
  const discardCandidates = playerState.hand.filter(card => card.gamecardId !== instance.gamecardId);
  createSelectCardQuery(
    gameState,
    playerState.uid,
    discardCandidates,
    '选择舍弃手牌',
    '选择2张手牌舍弃。之后，选择战场上的最多2张非神蚀卡破坏。',
    2,
    2,
    { sourceCardId: instance.gamecardId, effectId: '202000087_destroy_two', step: 'DISCARD_HAND_EFFECT' },
    () => 'HAND'
  );
}, {
  limitCount: 1,
  limitNameType: true,
  condition: (gameState, playerState, instance) =>
    gameState.phase === 'MAIN' &&
    playerState.isTurn &&
    playerState.hand.filter(card => card.gamecardId !== instance.gamecardId).length >= 2 &&
    allCardsOnField(gameState).some(isNonGodFieldCard),
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.step === 'DISCARD_HAND_EFFECT') {
      const selectedHands = selections
        .map(id => playerState.hand.find(card => card.gamecardId === id))
        .filter((card): card is Card => !!card);
      if (selectedHands.length !== 2 || new Set(selectedHands.map(card => card.gamecardId)).size !== 2) return;

      for (const card of selectedHands) {
        await AtomicEffectExecutor.execute(gameState, playerState.uid, {
          type: 'DISCARD_CARD',
          targetFilter: { gamecardId: card.gamecardId }
        }, instance);
      }

      const targets = allCardsOnField(gameState).filter(isNonGodFieldCard);
      createSelectCardQuery(
        gameState,
        playerState.uid,
        targets,
        '选择破坏目标',
        '选择战场上的最多2张非神蚀卡破坏。',
        0,
        Math.min(2, targets.length),
        { sourceCardId: instance.gamecardId, effectId: '202000087_destroy_two', step: 'DESTROY_TARGETS' },
        card => card.cardlocation as any
      );
      return;
    }

    if (context?.step !== 'DESTROY_TARGETS') return;
    for (const id of selections) {
      const target = AtomicEffectExecutor.findCardById(gameState, id);
      if (target && isNonGodFieldCard(target)) destroyByEffect(gameState, target, instance);
    }
  }
})];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 202000087
 * Card2 Row: 415
 * Card Row: 285
 * Source CardNo: BT05-R09
 * Package: BT05(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖同名1回合1次〗{你的主要阶段}:舍弃2张手牌。之后，选择战场上的最多2张非神蚀卡，将其破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '202000087',
  fullName: '炎雨',
  specialName: '',
  type: 'STORY',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '无',
  acValue: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT05',
  uniqueId: null as any,
};

export default card;
