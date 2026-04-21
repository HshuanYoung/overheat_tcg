import { Card, CardEffect, GameState, PlayerState, TriggerLocation } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';

const isValidMinotaurFeijing = (card: Card) => {
  return card.feijingMark && card.fullName.includes('牛头人');
};

const getSearchTargets = (playerState: PlayerState): { card: Card; source: TriggerLocation }[] => {
  const erosionTargets = playerState.erosionFront
    .filter((card): card is Card => !!card && card.displayState === 'FRONT_UPRIGHT' && isValidMinotaurFeijing(card))
    .map(card => ({ card, source: 'EROSION_FRONT' as TriggerLocation }));

  const deckTargets = playerState.deck
    .filter(card => isValidMinotaurFeijing(card))
    .map(card => ({ card, source: 'DECK' as TriggerLocation }));

  return [...erosionTargets, ...deckTargets];
};

const activate_10402028_search: CardEffect = {
  id: '10402028_activate_search',
  type: 'ACTIVATE',
  triggerLocation: ['UNIT'],
  limitCount: 1,
  limitNameType: true,
  description: '【启动】【卡名一回合一次】在你的主要阶段发动，将这个单位横置：选择你的侵蚀区正面或者卡组中一张卡名含有“牛头人”的菲晶卡，加入手牌。',
  condition: (gameState: GameState, playerState: PlayerState, instance: Card) => {
    if (!playerState.isTurn || gameState.phase !== 'MAIN') return false;
    if (instance.cardlocation !== 'UNIT' || instance.isExhausted) return false;
    return getSearchTargets(playerState).length > 0;
  },
  execute: async (instance: Card, gameState: GameState, playerState: PlayerState) => {
    await AtomicEffectExecutor.execute(gameState, playerState.uid, {
      type: 'ROTATE_HORIZONTAL',
      targetFilter: { gamecardId: instance.gamecardId }
    }, instance);

    const targets = getSearchTargets(playerState);
    if (targets.length === 0) {
      gameState.logs.push(`[${instance.fullName}] 没有可加入手牌的“牛头人”菲晶卡。`);
      return;
    }

    gameState.pendingQuery = {
      id: Math.random().toString(36).substring(7),
      type: 'SELECT_CARD',
      playerUid: playerState.uid,
      options: AtomicEffectExecutor.enrichQueryOptions(gameState, playerState.uid, targets),
      title: '选择加入手牌的卡',
      description: '请选择你的侵蚀区正面或卡组中的1张卡名含有“牛头人”的菲晶卡，加入手牌。',
      minSelections: 1,
      maxSelections: 1,
      callbackKey: 'EFFECT_RESOLVE',
      context: {
        sourceCardId: instance.gamecardId,
        effectIndex: 0,
        step: 'SELECT_TARGET'
      }
    };
  },
  onQueryResolve: async (instance: Card, gameState: GameState, playerState: PlayerState, selections: string[], context: any) => {
    if (context?.step !== 'SELECT_TARGET' || selections.length === 0) return;

    const targetId = selections[0];
    const target = AtomicEffectExecutor.findCardById(gameState, targetId);
    if (!target || !isValidMinotaurFeijing(target)) {
      gameState.logs.push(`[${instance.fullName}] 目标已不合法，效果结算失败。`);
      return;
    }

    const sourceZone = target.cardlocation;
    if (sourceZone === 'EROSION_FRONT') {
      await AtomicEffectExecutor.execute(gameState, playerState.uid, {
        type: 'MOVE_FROM_EROSION',
        targetFilter: { gamecardId: targetId },
        destinationZone: 'HAND'
      }, instance);
    } else if (sourceZone === 'DECK') {
      await AtomicEffectExecutor.execute(gameState, playerState.uid, {
        type: 'MOVE_FROM_DECK',
        targetFilter: { gamecardId: targetId },
        destinationZone: 'HAND'
      }, instance);
      await AtomicEffectExecutor.execute(gameState, playerState.uid, {
        type: 'SHUFFLE_DECK'
      }, instance);
    } else {
      gameState.logs.push(`[${instance.fullName}] 目标区域不正确，效果结算失败。`);
      return;
    }

    gameState.logs.push(`[${instance.fullName}] 将 [${target.fullName}] 加入了手牌。`);
  }
};

const card: Card = {
  id: '10402028',
  fullName: '牛头人盟约工匠【央】',
  specialName: '央',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 2 },
  faction: '九尾商会联盟',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [activate_10402028_search],
  rarity: 'R',
  availableRarities: ['R'],
  uniqueId: null,
};

export default card;
