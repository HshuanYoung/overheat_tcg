import { Card, CardEffect } from '../types/game';
import {
  addInfluence,
  createSelectCardQuery,
  ensureData,
  faceUpErosion,
  moveCard,
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

const treasureBoxActive = (gameState: any, ownerUid: string) => {
  const owner = gameState.players[ownerUid];
  const erosion = totalErosionCount(owner);
  return erosion >= 5 &&
    erosion <= 8 &&
    ownUnits(owner).some(unit => unit.godMark && hasIrodoriAbility(unit));
};

const findOpponentNonGodStackItem = (gameState: any, playerUid: string) => {
  for (let index = (gameState.counterStack?.length || 0) - 1; index >= 0; index -= 1) {
    const item = gameState.counterStack[index];
    const card = item?.card as Card | undefined;
    if (
      item &&
      (item.type === 'PLAY' || item.type === 'EFFECT') &&
      item.ownerUid !== playerUid &&
      !item.isNegated &&
      card &&
      !card.godMark
    ) {
      return item;
    }
  }
  return undefined;
};

const hasTwoColorHandCost = (playerState: any) =>
  new Set(playerState.hand.filter((card: Card) => card.color !== 'NONE').map((card: Card) => card.color)).size >= 2;

const effect_304000057_protect_self: CardEffect = {
  id: '304000057_protect_self',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  description: '5~8且己方有具有异彩的神蚀单位时，这张卡不会由于对手卡牌效果从战场离开。',
  applyContinuous: (gameState, instance) => {
    const ownerUid = ownerUidOf(gameState, instance);
    if (!ownerUid || !treasureBoxActive(gameState, ownerUid)) return;
    const data = ensureData(instance);
    data.cannotLeaveFieldByOpponentEffectTurn = gameState.turnCount;
    data.cannotLeaveFieldByOpponentEffectSourceName = instance.fullName;
    addInfluence(instance, instance, '不会由于对手卡牌效果从战场离开');
  }
};

const effect_304000057_counter_non_god: CardEffect = {
  id: '304000057_counter_non_god',
  type: 'ACTIVATE',
  triggerLocation: ['ITEM'],
  limitCount: 1,
  limitNameType: true,
  description: '5~8且己方有具有异彩的神蚀单位时，对抗对手使用非神蚀卡，舍弃手牌中2种颜色的卡各1张：反击那张卡。',
  condition: (gameState, playerState, instance) =>
    instance.cardlocation === 'ITEM' &&
    treasureBoxActive(gameState, playerState.uid) &&
    gameState.phase === 'COUNTERING' &&
    !!findOpponentNonGodStackItem(gameState, playerState.uid) &&
    hasTwoColorHandCost(playerState),
  cost: async (gameState, playerState, instance) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      playerState.hand.filter((card: Card) => card.color !== 'NONE'),
      '舍弃2种颜色手牌',
      '舍弃手牌中的2种颜色的卡各1张作为费用。',
      2,
      2,
      { sourceCardId: instance.gamecardId, effectId: '304000057_counter_non_god', step: 'COLOR_COST' },
      () => 'HAND'
    );
    return true;
  },
  execute: async (instance, gameState, playerState) => {
    const target = findOpponentNonGodStackItem(gameState, playerState.uid);
    if (target) {
      target.isNegated = true;
      gameState.logs.push(`[${instance.fullName}] 反击了 [${target.card?.fullName || '对手使用的非神蚀卡'}]。`);
    }
  },
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.step !== 'COLOR_COST') return;
    const selected = selections
      .map(id => playerState.hand.find((card: Card) => card.gamecardId === id))
      .filter((card: Card | undefined): card is Card => !!card && card.color !== 'NONE');
    if (selected.length !== 2 || new Set(selected.map(card => card.color)).size !== 2) {
      context.cancelActivation = true;
      return;
    }
    selected.forEach(card => moveCardAsCost(gameState, playerState.uid, card, 'GRAVE', instance));
  }
};

const effect_304000057_send_erosion_to_grave: CardEffect = {
  id: '304000057_send_erosion_to_grave',
  type: 'ACTIVATE',
  triggerLocation: ['ITEM'],
  limitCount: 1,
  limitNameType: true,
  description: '5~8且己方有具有异彩的神蚀单位时，舍弃1张手牌：将侵蚀区中的3张正面卡送入墓地。',
  condition: (gameState, playerState, instance) =>
    instance.cardlocation === 'ITEM' &&
    treasureBoxActive(gameState, playerState.uid) &&
    playerState.hand.length > 0 &&
    faceUpErosion(playerState).length >= 3,
  cost: async (gameState, playerState, instance) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      playerState.hand,
      '舍弃1张手牌',
      '舍弃1张手牌作为费用。',
      1,
      1,
      {
        sourceCardId: instance.gamecardId,
        effectId: '304000057_send_erosion_to_grave',
        costType: 'DISCARD_HAND_COST',
        discardCostAmount: 1
      },
      () => 'HAND'
    );
    return true;
  },
  execute: async (instance, gameState, playerState) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      faceUpErosion(playerState),
      '选择正面侵蚀卡',
      '选择侵蚀区中的3张正面卡送入墓地。',
      3,
      3,
      { sourceCardId: instance.gamecardId, effectId: '304000057_send_erosion_to_grave', step: 'EROSION' },
      () => 'EROSION_FRONT'
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.step !== 'EROSION') return;
    selections
      .map(id => faceUpErosion(playerState).find(card => card.gamecardId === id))
      .filter((card: Card | undefined): card is Card => !!card)
      .forEach(card => moveCard(gameState, playerState.uid, card, 'GRAVE', instance));
  }
};

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 304000057
 * Card2 Row: 528
 * Card Row: 442
 * Source CardNo: SP03-B04
 * Package: SP03(R,SPR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖5~8〗【永】{若你的战场上有具有异彩的神蚀单位，这张卡获得下列能力}：
 * “【永】：令这张卡离场的卡的效果不处理。”
 * “【启】〖1回合1次〗{对抗对手使用非神蚀卡}[舍弃手牌中的2种颜色的卡各1张]：反击那张卡。”
 * “【启】〖1回合1次〗[舍弃1张手牌]：将你侵蚀区中的3张正面卡送入墓地。”
 */
const card: Card = {
  id: '304000057',
  fullName: '「宝物箱」',
  specialName: '宝物箱',
  type: 'ITEM',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [effect_304000057_protect_self, effect_304000057_counter_non_god, effect_304000057_send_erosion_to_grave],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'SP03',
  uniqueId: null as any,
};

export default card;
