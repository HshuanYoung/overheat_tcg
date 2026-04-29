import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import { addInfluence, canPutUnitOntoBattlefield, createSelectCardQuery, getOpponentUid, moveCard, ownerUidOf } from './BaseUtil';

const effect_205000144_activate: CardEffect = {
  id: '205000144_activate',
  type: 'ACTIVATE',
  triggerLocation: ['PLAY'],
  description: 'Destroy 1 of your items. Then the opponent discards 1 card. If it is a non-god unit, put it onto your battlefield. If they had no hand, mill 3 from the top of their deck.',
  condition: (_gameState, playerState) => playerState.itemZone.some(card => !!card),
  execute: async (instance, gameState, playerState) => {
    const ownItems = playerState.itemZone.filter((card): card is Card => !!card);
    createSelectCardQuery(
      gameState,
      playerState.uid,
      ownItems,
      'Choose An Item',
      'Choose 1 of your items to destroy.',
      1,
      1,
      { sourceCardId: instance.gamecardId, effectId: '205000144_activate', step: 'DESTROY_ITEM' }
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    if (context.step === 'DESTROY_ITEM') {
      await AtomicEffectExecutor.execute(gameState, playerState.uid, {
        type: 'DESTROY_CARD',
        targetFilter: { gamecardId: selections[0], type: 'ITEM' }
      }, instance);

      const opponentUid = getOpponentUid(gameState, playerState.uid);
      const opponent = gameState.players[opponentUid];
      if (opponent.hand.length === 0) {
        await AtomicEffectExecutor.execute(gameState, opponentUid, {
          type: 'MOVE_FROM_DECK',
          destinationZone: 'GRAVE',
          targetCount: 3
        }, instance);
        return;
      }

      createSelectCardQuery(
        gameState,
        opponentUid,
        [...opponent.hand],
        'Discard A Card',
        'Choose 1 card from your hand to discard.',
        1,
        1,
        {
          sourceCardId: instance.gamecardId,
          effectId: '205000144_activate',
          step: 'OPPONENT_DISCARD',
          controllerUid: playerState.uid,
          discardPlayerUid: opponentUid
        },
        () => 'HAND'
      );
      return;
    }

    if (context.step !== 'OPPONENT_DISCARD') return;

    const controllerUid = context.controllerUid || ownerUidOf(gameState, instance) || getOpponentUid(gameState, playerState.uid);
    const discardPlayerUid = context.discardPlayerUid || playerState.uid;
    const controller = gameState.players[controllerUid];
    const discardedCard = AtomicEffectExecutor.findCardById(gameState, selections[0]);
    const canSteal =
      !!controller &&
      !!discardedCard &&
      discardedCard.type === 'UNIT' &&
      !discardedCard.godMark &&
      canPutUnitOntoBattlefield(controller, discardedCard);

    await AtomicEffectExecutor.execute(gameState, discardPlayerUid, {
      type: 'DISCARD_CARD',
      targetFilter: { gamecardId: selections[0] }
    }, instance);

    if (!canSteal) return;

    const movedCard = AtomicEffectExecutor.findCardById(gameState, selections[0]);
    if (!movedCard || movedCard.cardlocation !== 'GRAVE') return;

    moveCard(gameState, discardPlayerUid, movedCard, 'UNIT', instance, { toPlayerUid: controllerUid });
    (movedCard as any).data = {
      ...((movedCard as any).data || {}),
      placedOnOpponentFieldSourceName: instance.fullName
    };
    addInfluence(movedCard, instance, '被放置到对手战场');
  }
};

const card: Card = {
  id: '205000144',
  fullName: '礼帽秘法',
  specialName: '',
  type: 'STORY',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '无',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [effect_205000144_activate],
  rarity: 'U',
  availableRarities: ['U'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
