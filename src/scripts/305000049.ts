import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import {
  addContinuousPower,
  addInfluence,
  createSelectCardQuery,
  ensureData,
  moveCardAsCost,
  ownUnits,
  ownerUidOf,
  totalErosionCount
} from './BaseUtil';

const hasIrodoriAbility = (card: Card) =>
  card.type === 'UNIT' &&
  (card.effects || []).some(effect =>
    (effect.id || '').toLowerCase().includes('irodori') ||
    (effect.description || '').includes('异彩')
  );

const beachActive = (gameState: any, ownerUid: string) => {
  const owner = gameState.players[ownerUid];
  const erosion = totalErosionCount(owner);
  return erosion >= 1 &&
    erosion <= 4 &&
    ownUnits(owner).some(unit => unit.godMark && hasIrodoriAbility(unit));
};

const effect_305000049_protect_self: CardEffect = {
  id: '305000049_protect_self',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  description: '1~4且己方有具有异彩的神蚀单位时，这张卡不会由于对手卡牌效果从战场离开。',
  applyContinuous: (gameState, instance) => {
    const ownerUid = ownerUidOf(gameState, instance);
    if (!ownerUid || !beachActive(gameState, ownerUid)) return;
    const data = ensureData(instance);
    data.cannotLeaveFieldByOpponentEffectTurn = gameState.turnCount;
    data.cannotLeaveFieldByOpponentEffectSourceName = instance.fullName;
    addInfluence(instance, instance, '不会由于对手卡牌效果从战场离开');
  }
};

const effect_305000049_non_god_power: CardEffect = {
  id: '305000049_non_god_power',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  description: '1~4且己方有具有异彩的神蚀单位时，己方战场上的非神蚀单位力量+500。',
  applyContinuous: (gameState, instance) => {
    const ownerUid = ownerUidOf(gameState, instance);
    if (!ownerUid || !beachActive(gameState, ownerUid)) return;
    ownUnits(gameState.players[ownerUid])
      .filter(unit => !unit.godMark)
      .forEach(unit => addContinuousPower(unit, instance, 500));
  }
};

const effect_305000049_sac_draw: CardEffect = {
  id: '305000049_sac_draw',
  type: 'ACTIVATE',
  triggerLocation: ['ITEM'],
  limitCount: 1,
  limitNameType: true,
  description: '1~4且己方有具有异彩的神蚀单位时，主要阶段，送墓己方1个非神蚀单位：抽1张卡。',
  condition: (gameState, playerState, instance) =>
    instance.cardlocation === 'ITEM' &&
    playerState.isTurn &&
    gameState.phase === 'MAIN' &&
    beachActive(gameState, playerState.uid) &&
    playerState.deck.length > 0 &&
    ownUnits(playerState).some(unit => !unit.godMark),
  cost: async (gameState, playerState, instance) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      ownUnits(playerState).filter(unit => !unit.godMark),
      '选择送墓单位',
      '选择自己战场上的1个非神蚀单位送入墓地作为费用。',
      1,
      1,
      { sourceCardId: instance.gamecardId, effectId: '305000049_sac_draw', step: 'COST' },
      () => 'UNIT'
    );
    return true;
  },
  execute: async (instance, gameState, playerState) => {
    await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'DRAW', value: 1 }, instance);
  },
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.step !== 'COST') return;
    const target = selections[0] ? playerState.unitZone.find((unit: Card | null) => unit?.gamecardId === selections[0]) : undefined;
    if (!target || target.godMark) {
      context.cancelActivation = true;
      return;
    }
    moveCardAsCost(gameState, playerState.uid, target, 'GRAVE', instance);
  }
};

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000049
 * Card2 Row: 524
 * Card Row: 346
 * Source CardNo: SP03-Y04
 * Package: SP03(R,SPR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖1~4〗【永】{若你的战场上有具有异彩的神蚀单位，这张卡获得下列能力}：
 * “【永】：令这张卡离场的卡的效果不处理。”
 * “【永】：你的战场上的非神蚀单位〖力量+500〗。”
 * “【启】〖1回合1次〗{你的主要阶段}[将你战场上的一个非神蚀单位送入墓地]：抽1张卡。”
 */
const card: Card = {
  id: '305000049',
  fullName: '「黄昏海滩」',
  specialName: '黄昏海滩',
  type: 'ITEM',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [effect_305000049_protect_self, effect_305000049_non_god_power, effect_305000049_sac_draw],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'SP03',
  uniqueId: null as any,
};

export default card;
