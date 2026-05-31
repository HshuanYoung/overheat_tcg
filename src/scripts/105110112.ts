import { Card, CardEffect, GameState } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import { addInfluence, canActivateDefaultTiming, createPlayerSelectQuery, getBattlefieldUnits } from './BaseUtil';

const EFFECT_ID = '105110112_activate';
const MODE_DRAW = 'DRAW';
const MODE_DAMAGE = 'DAMAGE';
const MODE_DESTROY = 'DESTROY';

const hasLostActivate = (instance: Card) => !!(instance as any).data?.lostActivateEffect_105110112;

const markActivateLost = (instance: Card) => {
  (instance as any).data = {
    ...((instance as any).data || {}),
    lostActivateEffect_105110112: true
  };
  addInfluence(instance, instance, '已使用效果，失去此能力');
};

const selectedModeFromContext = (context?: any) =>
  context?.modeId || context?.selectedModeId || context?.declaredModeId;

const weakUnits = (gameState: GameState) =>
  getBattlefieldUnits(gameState).filter(unit => (unit.power || 0) <= 1500);

const effect_105110112_activate: CardEffect = {
  id: EFFECT_ID,
  type: 'ACTIVATE',
  triggerLocation: ['UNIT'],
  description: '【启】:你选择下列的1项效果并执行。之后，失去这个【启】能力。抽1张卡；或选择1名玩家，给予他1点伤害；或选择你的1张手牌舍弃，选择1个力量1500以下的单位，将其破坏。',
  condition: (gameState, playerState, instance) =>
    canActivateDefaultTiming(gameState, playerState) &&
    instance.cardlocation === 'UNIT' &&
    !hasLostActivate(instance),
  targetSpec: {
    modeTitle: '选择元素魔法教官',
    modeDescription: '选择要执行的效果。之后，这个单位失去这个【启】能力。',
    modeOptions: [{
      id: MODE_DRAW,
      label: '抽1张卡',
      title: '抽1张卡',
      description: '抽1张卡。',
      minSelections: 0,
      maxSelections: 0,
      zones: [],
      step: MODE_DRAW
    }, {
      id: MODE_DAMAGE,
      label: '给予1点伤害',
      title: '给予1点伤害',
      description: '选择1名玩家，给予他1点伤害。',
      minSelections: 0,
      maxSelections: 0,
      zones: [],
      step: MODE_DAMAGE
    }, {
      id: MODE_DESTROY,
      label: '舍弃手牌并破坏单位',
      title: '舍弃手牌并破坏单位',
      description: '选择你的1张手牌和1个力量1500以下的单位。',
      minSelections: 0,
      maxSelections: 0,
      zones: [],
      step: MODE_DESTROY,
      condition: (gameState, playerState) => playerState.hand.length > 0 && weakUnits(gameState).length > 0,
      getCandidates: () => [],
      targetGroups: [{
        title: '选择要舍弃的手牌',
        description: '选择你的1张手牌舍弃。',
        minSelections: 1,
        maxSelections: 1,
        zones: ['HAND'],
        controller: 'SELF',
        step: 'DISCARD_HAND',
        getCandidates: (_gameState, playerState) =>
          playerState.hand.map(card => ({ card, source: 'HAND' as any }))
      }, {
        title: '选择破坏目标',
        description: '选择1个力量1500以下的单位，将其破坏。',
        minSelections: 1,
        maxSelections: 1,
        zones: ['UNIT'],
        controller: 'ANY',
        step: 'DESTROY_UNIT',
        getCandidates: gameState =>
          weakUnits(gameState).map(card => ({ card, source: 'UNIT' as any }))
      }]
    }]
  },
  execute: async () => {
  },
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.effectId === EFFECT_ID && context.step === 'PLAYER_TARGET') {
      const targetUid =
        selections[0] === 'PLAYER_SELF'
          ? playerState.uid
          : gameState.playerIds.find(uid => uid !== playerState.uid)!;

      if (targetUid === playerState.uid) {
        await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'DEAL_EFFECT_DAMAGE_SELF', value: 1 }, instance);
      } else {
        await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'DEAL_EFFECT_DAMAGE', value: 1 }, instance);
      }
      return;
    }

    if (selectedModeFromContext(context) === MODE_DESTROY) {
      const declaredTargets = context?.declaredTargets || [];
      const discardId = declaredTargets.find((target: any) => target.step === 'DISCARD_HAND')?.gamecardId || selections[0];
      const targetId = declaredTargets.find((target: any) => target.step === 'DESTROY_UNIT')?.gamecardId || selections[1];
      const discardCard = playerState.hand.find(card => card.gamecardId === discardId);
      if (!discardCard) return;

      const target = targetId ? AtomicEffectExecutor.findCardById(gameState, targetId) : undefined;
      if (!target || target.cardlocation !== 'UNIT' || (target.power || 0) > 1500) return;

      markActivateLost(instance);
      await AtomicEffectExecutor.execute(
        gameState,
        playerState.uid,
        {
          type: 'DISCARD_CARD',
          targetFilter: { gamecardId: discardId }
        },
        instance
      );

      const ownerUid = AtomicEffectExecutor.findCardOwnerKey(gameState, target.gamecardId);
      if (!ownerUid) return;

      await AtomicEffectExecutor.execute(
        gameState,
        ownerUid,
        {
          type: 'DESTROY_CARD',
          targetFilter: { gamecardId: target.gamecardId }
        },
        instance
      );
      return;
    }

    const mode = selectedModeFromContext(context);
    if (mode === MODE_DRAW) {
      markActivateLost(instance);
      await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'DRAW', value: 1 }, instance);
      return;
    }

    if (mode === MODE_DAMAGE) {
      markActivateLost(instance);
      createPlayerSelectQuery(
        gameState,
        playerState.uid,
        '选择玩家',
        '选择1名玩家，给予他1点伤害。',
        {
          sourceCardId: instance.gamecardId,
          effectId: EFFECT_ID,
          step: 'PLAYER_TARGET'
        }
      );
      return;
    }

  }
};

const effect_105110112_lost_display: CardEffect = {
  id: '105110112_lost_display',
  type: 'CONTINUOUS',
  description: '使用过【启】效果后，在影响来源中显示已失去此能力。',
  applyContinuous: (_gameState, instance) => {
    if (!hasLostActivate(instance)) return;
    addInfluence(instance, instance, '已使用效果，失去此能力');
  }
};

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110112
 * Card2 Row: 78
 * Card Row: 78
 * Source CardNo: BT01-Y06
 * Package: BT01(R),ST04(TD)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】:你选择下列的1项效果并执行。之后，失去这个【启】能力。
 * ◆抽1张卡。
 * ◆选择1名玩家，给予他1点伤害。
 * ◆选择你的1张手牌舍弃，选择1个〖力量1500〗以下的单位，将其破坏。
 */
const card: Card = {
  id: '105110112',
  fullName: '元素魔法教官',
  specialName: '',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '学院要塞',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [effect_105110112_activate, effect_105110112_lost_display],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT01',
  uniqueId: null as any,
};

export default card;
