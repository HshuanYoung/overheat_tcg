import { Card, CardEffect } from '../types/game';
import {
  addTempKeyword,
  addTempPower,
  canActivateDefaultTiming,
  createSelectCardQuery,
  moveCardAsCost,
  ownUnits
} from './BaseUtil';

const MODE_HEROIC = 'HEROIC';
const MODE_POWER = 'POWER';

const selectedModeFromContext = (context?: any) =>
  context?.modeId || context?.selectedModeId || context?.declaredModeId;

const cardEffects: CardEffect[] = [{
  id: '101000487_grave_exile_boost',
  type: 'ACTIVATE',
  triggerLocation: ['UNIT'],
  limitCount: 1,
  description: '【启】一回合一次：[将你墓地中的3张卡放逐]选择1项效果执行。本回合中，这个单位获得【英勇】；或本回合中，这个单位力量+500。',
  condition: (gameState, playerState, instance) =>
    canActivateDefaultTiming(gameState, playerState) &&
    instance.cardlocation === 'UNIT' &&
    playerState.grave.length >= 3,
  targetSpec: {
    modeTitle: '选择雪原狮鹫',
    modeDescription: '选择要执行的效果。',
    modeOptions: [{
      id: MODE_HEROIC,
      label: '获得英勇',
      title: '获得英勇',
      description: '本回合中，这个单位获得【英勇】。',
      minSelections: 0,
      maxSelections: 0,
      zones: [],
      step: MODE_HEROIC
    }, {
      id: MODE_POWER,
      label: '力量+500',
      title: '力量+500',
      description: '本回合中，这个单位力量+500。',
      minSelections: 0,
      maxSelections: 0,
      zones: [],
      step: MODE_POWER
    }]
  },
  cost: async (gameState, playerState, instance, context?: any) => {
    const mode = context?.declaredModeId;
    if (mode !== MODE_HEROIC && mode !== MODE_POWER) return false;
    if (playerState.grave.length < 3) return false;

    createSelectCardQuery(
      gameState,
      playerState.uid,
      playerState.grave,
      '选择放逐的墓地卡',
      '选择墓地中的3张卡放逐作为费用。',
      3,
      3,
      {
        sourceCardId: instance.gamecardId,
        effectId: '101000487_grave_exile_boost',
        step: 'GRAVE_EXILE_COST',
        costType: 'CUSTOM_CARD_COST',
        skipEffectResolveAfterCost: true
      },
      () => 'GRAVE'
    );
    return !!gameState.pendingQuery;
  },
  onCostResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.step !== 'GRAVE_EXILE_COST') return;
    const selectedCards = selections
      .map(id => playerState.grave.find(card => card.gamecardId === id))
      .filter((card): card is Card => !!card);

    if (selectedCards.length !== 3 || new Set(selectedCards.map(card => card.gamecardId)).size !== 3) {
      context.cancelActivation = true;
      return;
    }

    selectedCards.forEach(card => moveCardAsCost(gameState, playerState.uid, card, 'EXILE', instance));
  },
  onQueryResolve: async (instance, gameState, playerState, _selections, context) => {
    const live = ownUnits(playerState).find(unit => unit.gamecardId === instance.gamecardId);
    if (!live) return;

    const mode = selectedModeFromContext(context);
    if (mode === MODE_HEROIC) addTempKeyword(live, instance, 'heroic');
    if (mode === MODE_POWER) addTempPower(live, instance, 500, gameState);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101000487
 * Card2 Row: 277
 * Card Row: 633
 * Source CardNo: PR02-01W
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1回合1次〗:[将你墓地中的3张卡放逐]你选择下列的1项效果并执行。
 * 本回合中，这个单位获得【英勇】。
 * 本回合中，这个单位〖力量+500〗。
 */
const card: Card = {
  id: '101000487',
  fullName: '雪原狮鹫',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '无',
  acValue: 2,
  power: 2000,
  basePower: 2000,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isHeroic: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'PR',
  availableRarities: ['PR'],
  cardPackage: 'PR',
  uniqueId: null as any,
};

export default card;
