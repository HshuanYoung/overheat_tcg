import { Card, CardEffect } from '../types/game';
import {
  addContinuousDamage,
  addContinuousKeyword,
  addContinuousPower,
  addInfluence,
  canActivateDefaultTiming,
  canPutUnitOntoBattlefield,
  createSelectCardQuery,
  ensureData,
  moveCardAsCost,
  putUnitOntoField,
  readyByEffect
} from './BaseUtil';

const differentColorNonGodUnitsInGrave = (playerState: any) =>
  playerState.grave.filter((card: Card) => card.type === 'UNIT' && !card.godMark);

const distinctGraveColors = (playerState: any) =>
  new Set(playerState.grave.filter((card: Card) => card.color !== 'NONE').map((card: Card) => card.color));

const hasIrodoriCost = (playerState: any, amount: number) =>
  new Set(differentColorNonGodUnitsInGrave(playerState).map((card: Card) => card.color)).size >= amount;

const payIrodoriCost = (gameState: any, playerState: any, instance: Card, selections: string[], amount: number) => {
  const selected = selections
    .map(id => playerState.grave.find((card: Card) => card.gamecardId === id))
    .filter((card: Card | undefined): card is Card => !!card && card.type === 'UNIT' && !card.godMark);
  const colors = new Set(selected.map(card => card.color));
  if (selected.length !== amount || colors.size !== amount) return false;

  selected.forEach(card => moveCardAsCost(gameState, playerState.uid, card, 'EXILE', instance));
  return true;
};

const effect_102000367_irodori_enter: CardEffect = {
  id: '102000367_irodori_enter',
  type: 'ACTIVATE',
  triggerLocation: ['HAND'],
  limitCount: 1,
  limitNameType: true,
  description: '异彩5：将墓地5种颜色的非神蚀单位卡各1张放逐，将手牌中的这张卡放置到战场上。',
  condition: (_gameState, playerState, instance) =>
    instance.cardlocation === 'HAND' &&
    playerState.isTurn &&
    canPutUnitOntoBattlefield(playerState, instance) &&
    hasIrodoriCost(playerState, 5),
  cost: async (gameState, playerState, instance) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      differentColorNonGodUnitsInGrave(playerState),
      '选择异彩费用',
      '选择墓地中5种颜色的非神蚀单位卡各1张放逐。',
      5,
      5,
      { sourceCardId: instance.gamecardId, effectId: '102000367_irodori_enter', costType: 'SP03_R07_IRODORI5' },
      () => 'GRAVE'
    );
    return true;
  },
  execute: async (instance, gameState, playerState) => {
    (instance as any).data = {
      ...((instance as any).data || {}),
      enteredByIrodoriTurn: gameState.turnCount,
      enteredByIrodori: true
    };
    if (putUnitOntoField(gameState, playerState.uid, instance, instance)) {
      (instance as any).data = {
        ...((instance as any).data || {}),
        enteredByIrodoriTurn: gameState.turnCount,
        enteredByIrodori: true
      };
    }
  },
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.costType !== 'SP03_R07_IRODORI5') return;
    if (!payIrodoriCost(gameState, playerState, instance, selections, 5)) {
      context.cancelActivation = true;
    }
  }
};

const effect_102000367_irodori_continuous: CardEffect = {
  id: '102000367_irodori_continuous',
  type: 'CONTINUOUS',
  triggerLocation: ['UNIT'],
  description: '通过异彩入场后获得速攻、英勇、歼灭，不会因对手ACCESS4以下卡效果离场；墓地每有1种颜色，伤害+1、力量+1000。',
  condition: (_gameState, _playerState, instance) =>
    instance.cardlocation === 'UNIT' &&
    !!(instance as any).data?.enteredByIrodori,
  applyContinuous: (gameState, instance) => {
    const owner = Object.values(gameState.players).find(player =>
      player.unitZone.some(unit => unit?.gamecardId === instance.gamecardId)
    );
    if (!owner) return;

    addContinuousKeyword(instance, instance, 'rush');
    addContinuousKeyword(instance, instance, 'heroic');
    addContinuousKeyword(instance, instance, 'annihilation');

    const data = ensureData(instance);
    data.unaffectedByOpponentAcLe = 4;
    data.cannotLeaveFieldByOpponentAcLe = 4;
    addInfluence(instance, instance, '不受对手ACCESS4以下卡牌效果影响和离场效果影响');

    const colorCount = distinctGraveColors(owner).size;
    if (colorCount > 0) {
      addContinuousDamage(instance, instance, colorCount);
      addContinuousPower(instance, instance, colorCount * 1000);
    }
  }
};

const effect_102000367_discard_three_ready: CardEffect = {
  id: '102000367_discard_three_ready',
  type: 'ACTIVATE',
  triggerLocation: ['UNIT'],
  limitCount: 1,
  limitNameType: true,
  description: '同名1回合1次：舍弃3张手牌，将这个单位重置。',
  condition: (gameState, playerState, instance) =>
    instance.cardlocation === 'UNIT' &&
    canActivateDefaultTiming(gameState, playerState) &&
    instance.isExhausted === true &&
    playerState.hand.length >= 3,
  cost: async (gameState, playerState, instance) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      playerState.hand,
      '舍弃3张手牌',
      '舍弃3张手牌作为费用，将这个单位重置。',
      3,
      3,
      { sourceCardId: instance.gamecardId, effectId: '102000367_discard_three_ready', costType: 'DISCARD_HAND_COST', discardCostAmount: 3 },
      () => 'HAND'
    );
    return true;
  },
  execute: async (instance, gameState) => {
    readyByEffect(gameState, instance, instance);
  }
};

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102000367
 * Card2 Row: 516
 * Card Row: 440
 * Source CardNo: SP03-R07
 * Package: SP03(OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】异彩5。
 * 【永】{这个单位通过异彩能力进入战场时}：这个单位获得【速攻】【英勇】【歼灭】，不会由于对手ACCESS值+4以下的卡的效果从战场上离开。你的墓地中每有1中颜色的卡，这个单位〖+1〗〖+1000〗。
 * 【启】[舍弃3张手牌]：将这个单位【重置】。
 */
const card: Card = {
  id: '102000367',
  fullName: '霜梦虹彩「赛利亚」',
  specialName: '赛利亚',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1, WHITE: 1, YELLOW: 1, BLUE: 1, GREEN: 1 },
  faction: '无',
  acValue: 9,
  power: 0,
  basePower: 0,
  damage: 0,
  baseDamage: 0,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  baseIsrush: false,
  isAnnihilation: false,
  baseAnnihilation: false,
  isHeroic: false,
  baseHeroic: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [effect_102000367_irodori_enter, effect_102000367_irodori_continuous, effect_102000367_discard_three_ready],
  rarity: 'UR',
  availableRarities: ['UR'],
  cardPackage: 'SP03',
  uniqueId: null as any,
};

export default card;
