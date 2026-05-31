import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import {
  canActivateDefaultTiming,
  canPutUnitOntoBattlefield,
  createSelectCardQuery,
  millTop,
  moveCard,
  moveCardAsCost,
  putUnitOntoField
} from './BaseUtil';

const MODE_HAND_SEARCH = 'HAND_SEARCH';
const MODE_GRAVE_SELF_PUT = 'GRAVE_SELF_PUT';

const selectedModeFromContext = (context?: any) =>
  context?.declaredModeId ||
  context?.selectedModeId ||
  context?.modeId ||
  context?.mode ||
  context?.declaredTargets?.[0]?.modeId ||
  context?.declaredTargets?.declaredModeId;

const isKuyaCard = (card: Card) =>
  card.fullName.includes('九夜') || !!card.specialName?.includes('九夜');

const otherHandCards = (playerState: any, instance: Card) =>
  playerState.hand.filter((card: Card) => card.gamecardId !== instance.gamecardId);

const wasDiscardedAsCostFromHandThisTurn = (card: Card, gameState: any) => {
  const data = (card as any).data || {};
  return card.cardlocation === 'GRAVE' &&
    data.lastMovedAsCostTurn === gameState.turnCount &&
    data.lastMovedFromZone === 'HAND' &&
    data.lastMovedToZone === 'GRAVE';
};

const canUseHandSearchMode = (gameState: any, playerState: any, instance: Card) =>
  instance.cardlocation === 'HAND' &&
  playerState.isTurn &&
  gameState.phase === 'MAIN' &&
  otherHandCards(playerState, instance).length > 0 &&
  playerState.deck.some(isKuyaCard);

const canUseGraveSelfPutMode = (gameState: any, playerState: any, instance: Card) =>
  instance.cardlocation === 'GRAVE' &&
  canActivateDefaultTiming(gameState, playerState) &&
  wasDiscardedAsCostFromHandThisTurn(instance, gameState) &&
  playerState.deck.length >= 3 &&
  canPutUnitOntoBattlefield(playerState, instance);

const effect_103000303_kuya_modes: CardEffect = {
  id: '103000303_kuya_modes',
  type: 'ACTIVATE',
  triggerLocation: ['HAND', 'GRAVE'],
  limitCount: 1,
  limitNameType: true,
  description: '同名1回合1次：选择1项效果执行；从手牌舍弃这张卡和另1张卡检索九夜，或从墓地送3张卡后放置自身。',
  condition: (gameState, playerState, instance) =>
    canUseHandSearchMode(gameState, playerState, instance) ||
    canUseGraveSelfPutMode(gameState, playerState, instance),
  targetSpec: {
    modeTitle: '选择效果',
    modeDescription: '选择下列的一项效果并执行。',
    modeOptions: [{
      id: MODE_HAND_SEARCH,
      label: '检索九夜',
      title: '确认检索九夜',
      description: '你的主要阶段，舍弃手牌中的这张卡和另1张卡，将卡组中1张卡名含有《九夜》的卡加入手牌。',
      minSelections: 0,
      maxSelections: 0,
      zones: [],
      step: MODE_HAND_SEARCH,
      condition: canUseHandSearchMode,
      getCandidates: () => [] as any[]
    }, {
      id: MODE_GRAVE_SELF_PUT,
      label: '从墓地放置',
      title: '确认从墓地放置',
      description: '只能在这张卡作为卡的能力费用从手牌送入墓地的回合从墓地发动。将你卡组顶的3张卡送入墓地，之后将这张卡放置到战场上。',
      minSelections: 0,
      maxSelections: 0,
      zones: [],
      step: MODE_GRAVE_SELF_PUT,
      condition: canUseGraveSelfPutMode,
      getCandidates: () => [] as any[]
    }]
  },
  cost: async (gameState, playerState, instance, context?: any) => {
    const mode = selectedModeFromContext(context);
    if (mode !== MODE_HAND_SEARCH) return mode === MODE_GRAVE_SELF_PUT;

    const candidates = otherHandCards(playerState, instance);
    if (instance.cardlocation !== 'HAND' || candidates.length === 0) return false;
    createSelectCardQuery(
      gameState,
      playerState.uid,
      candidates,
      '舍弃另一张手牌',
      '舍弃手牌中的这张卡和另1张卡作为发动费用。',
      1,
      1,
      {
        sourceCardId: instance.gamecardId,
        effectId: '103000303_kuya_modes',
        step: 'DISCARD_COST',
        mode,
        skipEffectResolveAfterCost: true
      },
      () => 'HAND'
    );
    return !!gameState.pendingQuery;
  },
  onCostResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.mode !== MODE_HAND_SEARCH) return;
    const other = selections[0]
      ? otherHandCards(playerState, instance).find((card: Card) => card.gamecardId === selections[0])
      : undefined;
    if (!other || instance.cardlocation !== 'HAND') {
      context.cancelActivation = true;
      gameState.logs.push(`[${instance.fullName}] 舍弃费用不合法，发动中止。`);
      return;
    }

    moveCardAsCost(gameState, playerState.uid, instance, 'GRAVE', instance);
    moveCardAsCost(gameState, playerState.uid, other, 'GRAVE', instance);
  },
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    const mode = selectedModeFromContext(context);

    if (context?.step === 'SEARCH') {
      const target = selections[0]
        ? playerState.deck.find((card: Card) => card.gamecardId === selections[0] && isKuyaCard(card))
        : undefined;
      if (target) {
        moveCard(gameState, playerState.uid, target, 'HAND', instance);
        await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'SHUFFLE_DECK' }, instance);
      }
      return;
    }

    if (mode === MODE_HAND_SEARCH) {
      createSelectCardQuery(
        gameState,
        playerState.uid,
        playerState.deck.filter(isKuyaCard),
        '选择九夜卡',
        '选择卡组中的1张卡名含有《九夜》的卡加入手牌。',
        1,
        1,
        { sourceCardId: instance.gamecardId, effectId: '103000303_kuya_modes', step: 'SEARCH', mode },
        () => 'DECK'
      );
      return;
    }

    if (mode === MODE_GRAVE_SELF_PUT) {
      millTop(gameState, playerState.uid, 3, instance);
      putUnitOntoField(gameState, playerState.uid, instance, instance);
    }
  }
};

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103000303
 * Card2 Row: 533
 * Card Row: 353
 * Source CardNo: SP03-G05
 * Package: SP03(R,SPR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖同名1回合1次〗{选择下列的一项效果并执行}：
 * ●{你的主要阶段}[舍弃手牌中的这张卡和另1张卡]：将你卡组中的1张卡名含有《九夜》的卡加入手牌。
 * ●{只能在这张卡由于卡的能力的费用从手牌送入墓地的回合中从墓地发动}：将你卡组顶的3张卡送入墓地，之后，将墓地中的这张卡放置到战场上。
 */
const card: Card = {
  id: '103000303',
  fullName: '九夜晚宴的兽娘',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 5,
  power: 3500,
  basePower: 3500,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [effect_103000303_kuya_modes],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'SP03',
  uniqueId: null as any,
};

export default card;
