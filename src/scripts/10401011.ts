import { Card, GameState, PlayerState, CardEffect, GameEvent } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';

const trigger_10401011_1: CardEffect = {
  id: '10401011_trigger_1',
  type: 'TRIGGER',
  description: '【诱发】这个单位进入战场时，选择你的1个蓝色非神蚀单位，本回合中+1/+1000。回合结束时，将那个单位返回持有者的手牌。',
  triggerLocation: ['UNIT'],
  triggerEvent: 'CARD_ENTERED_ZONE',
  isMandatory: true,
  condition: (gameState: GameState, playerState: PlayerState, instance: Card, event?: GameEvent) => {
    const isOnUnitZone = instance.cardlocation === 'UNIT';
    if (!event) return isOnUnitZone;

    const isSelf = event.type === 'CARD_ENTERED_ZONE' &&
      (event.sourceCardId === instance.gamecardId || event.sourceCard === instance);
    const isTargetZone = event.data?.zone === 'UNIT';

    if (!isSelf || !isTargetZone || !isOnUnitZone) return false;

    // Check if there's at least one blue non-EX unit on my field
    const targets = playerState.unitZone.filter(u => u && u.color === 'BLUE' && !u.godMark);
    return targets.length > 0;
  },
  execute: (instance: Card, gameState: GameState, playerState: PlayerState) => {
    const targets = playerState.unitZone.filter(u => u && u.color === 'BLUE' && !u.godMark) as Card[];

    gameState.pendingQuery = {
      id: Math.random().toString(36).substring(7),
      type: 'SELECT_CARD',
      playerUid: playerState.uid,
      options: AtomicEffectExecutor.enrichQueryOptions(gameState, playerState.uid, targets.map(t => ({ card: t, source: 'UNIT' }))),
      title: '选择强化的单位',
      description: '请选择你的1个蓝色非神蚀单位进行强化，该单位将在回合结束时返回手牌。',
      minSelections: 1,
      maxSelections: 1,
      callbackKey: 'EFFECT_RESOLVE',
      context: {
        sourceCardId: instance.gamecardId,
        effectId: '10401011_trigger_1',
        step: 1
      }
    };
  },
  onQueryResolve: (instance: Card, gameState: GameState, playerState: PlayerState, selections: string[], context: any) => {
    if (context.step === 1) {
      const targetId = selections[0];
      const targetUnit = playerState.unitZone.find(u => u?.gamecardId === targetId);

      if (targetUnit) {
        // [等级+1/ATK+1000]
        AtomicEffectExecutor.execute(gameState, playerState.uid, {
          type: 'CHANGE_AC',
          value: 1,
          turnDuration: 1 // For this turn
        }, instance, undefined, [targetId]);

        AtomicEffectExecutor.execute(gameState, playerState.uid, {
          type: 'CHANGE_POWER',
          value: 1000,
          turnDuration: 1 // For this turn
        }, instance, undefined, [targetId]);

        gameState.logs.push(`[百濑刃匠] 强化了 ${targetUnit.fullName} (+1 等级 / +1000 ATK)。`);

        // Schedule return to hand at end of turn
        gameState.pendingResolutions.push({
          card: instance,
          effect: trigger_10401011_1,
          effectIndex: 0,
          playerUid: playerState.uid,
          event: {
            type: 'CARD_ENTERED_ZONE',
            data: { targetGamecardId: targetId }
          } as any
        });
      }
    }
  },
  resolve: (instance: Card, gameState: GameState, playerState: PlayerState, event?: GameEvent) => {
    // This is called at finishTurnTransition for each record in pendingResolutions
    const targetId = event?.data?.targetGamecardId;
    if (targetId) {
      const targetUnit = playerState.unitZone.find(u => u?.gamecardId === targetId);
      if (targetUnit) {
        AtomicEffectExecutor.execute(gameState, playerState.uid, {
          type: 'MOVE_FROM_FIELD',
          targetFilter: { gamecardId: targetId },
          destinationZone: 'HAND'
        }, instance);
        gameState.logs.push(`[百濑刃匠] 效果结束：${targetUnit.fullName} 返回手牌。`);
      }
    }
  }
};

const card: Card = {
  id: '10401011',
  fullName: '百濑刃匠',
  specialName: '',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: {},
  faction: '百濑之水城',
  acValue: 1,
  power: 500,
  basePower: 500,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [trigger_10401011_1],
  rarity: 'U',
  availableRarities: ['U'],
  uniqueId: null,
};

export default card;
