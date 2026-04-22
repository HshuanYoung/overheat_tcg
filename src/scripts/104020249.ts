import { Card, CardEffect, GameEvent, GameState, PlayerState } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';

const getMinotaurUnitCount = (playerState: PlayerState) => {
  return playerState.unitZone.filter(unit => unit && unit.fullName.includes('牛头人')).length;
};

const getGraveMinotaurCards = (playerState: PlayerState) => {
  return playerState.grave.filter((card): card is Card => !!card && card.fullName.includes('牛头人'));
};

const trigger_104020249_draw: CardEffect = {
  id: '104020249_draw_trigger',
  type: 'TRIGGER',
  triggerLocation: ['UNIT'],
  triggerEvent: ['CARD_ENTERED_ZONE', 'TURN_END' as any],
  isMandatory: false,
  limitCount: 1,
  limitNameType: true,
  description: '【诱发】【卡名一回合一次】这个单位进入战场或者你的回合结束时，如果你的单位区有4个或者以上卡名包含“牛头人”的单位：你可以选择发动：将你墓地的2张卡名含有“牛头人”的卡放逐：抽1张卡。',
  condition: (_gameState: GameState, playerState: PlayerState, instance: Card, event?: GameEvent) => {
    const isSelfEnter =
      event?.type === 'CARD_ENTERED_ZONE' &&
      event.data?.zone === 'UNIT' &&
      (event.sourceCardId === instance.gamecardId || event.sourceCard === instance);
    const isMyTurnEnd =
      event?.type === ('TURN_END' as any) &&
      event.playerUid === playerState.uid;

    if (!isSelfEnter && !isMyTurnEnd) return false;
    if (getMinotaurUnitCount(playerState) < 4) return false;

    return getGraveMinotaurCards(playerState).length >= 2;
  },
  execute: async (instance: Card, gameState: GameState, playerState: PlayerState) => {
    const options = getGraveMinotaurCards(playerState);
    if (options.length < 2) {
      gameState.logs.push(`[${instance.fullName}] 墓地中没有足够的“牛头人”卡，效果中止。`);
      return;
    }

    gameState.pendingQuery = {
      id: Math.random().toString(36).substring(7),
      type: 'SELECT_CARD',
      playerUid: playerState.uid,
      options: AtomicEffectExecutor.enrichQueryOptions(
        gameState,
        playerState.uid,
        options.map(card => ({ card, source: 'GRAVE' as any }))
      ),
      title: '选择要放逐的卡',
      description: '请选择墓地中2张卡名含有“牛头人”的卡放逐，然后抽1张卡。',
      minSelections: 2,
      maxSelections: 2,
      callbackKey: 'EFFECT_RESOLVE',
      context: {
        sourceCardId: instance.gamecardId,
        effectIndex: 0,
        step: 'SELECT_BANISH_TARGETS'
      }
    };
  },
  onQueryResolve: async (instance: Card, gameState: GameState, playerState: PlayerState, selections: string[], context: any) => {
    if (context?.step !== 'SELECT_BANISH_TARGETS' || selections.length !== 2) return;

    const selectedCards = selections
      .map(id => playerState.grave.find(card => card?.gamecardId === id && card.fullName.includes('牛头人')) || null)
      .filter((card): card is Card => !!card);

    if (selectedCards.length !== 2) {
      gameState.logs.push(`[${instance.fullName}] 选择的墓地卡已不合法，效果结算失败。`);
      return;
    }

    for (const card of selectedCards) {
      await AtomicEffectExecutor.execute(gameState, playerState.uid, {
        type: 'BANISH_CARD',
        targetFilter: { gamecardId: card.gamecardId }
      }, instance);
    }

    await AtomicEffectExecutor.execute(gameState, playerState.uid, {
      type: 'DRAW',
      value: 1
    }, instance);

    gameState.logs.push(`[${instance.fullName}] 放逐了2张“牛头人”卡并抽了1张卡。`);
  }
};

const card: Card = {
  id: '104020249',
  gamecardId: null as any,
  fullName: '牛头人盟约巫女【达】',
  specialName: '达',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: { BLUE: 2 },
  faction: '九尾商会联盟',
  acValue: 3,
  power: 2000,
  basePower: 2000,
  damage: 1,
  baseDamage: 1,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [trigger_104020249_draw],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'ST03',
  uniqueId: null,
};

export default card;
