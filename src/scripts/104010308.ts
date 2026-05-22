import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, canPutUnitOntoBattlefield, createChoiceQuery, paymentCost, putUnitOntoField, totalErosionCount } from './BaseUtil';

const modeOptions = (playerState: any, instance: Card) => {
  const options = [{ id: 'DRAW', label: '抽1张卡' }];
  if (canPutUnitOntoBattlefield(playerState, instance)) {
    options.push({ id: 'PUT_EXHAUSTED', label: '横置放置到战场' });
  }
  return options;
};

const cardEffects: CardEffect[] = [{
  id: '104010308_deck_to_hand_discard',
  type: 'CONTINUOUS',
  triggerLocation: ['UNIT'],
  replaceDeckToHandWithDiscard: true,
  description: '玩家以抽卡以外的方式从卡组将卡加入手牌时，将那张卡舍弃。'
}, {
  id: '104010308_discarded_choice',
  type: 'TRIGGER',
  triggerLocation: ['GRAVE'],
  triggerEvent: 'CARD_DISCARDED',
  erosionTotalLimit: [3, 6],
  description: '3-6：这张卡从手牌送去墓地时，支付0蓝，抽1张卡或将这张卡横置放置到战场。',
  condition: (_gameState, playerState, instance, event) =>
    event?.sourceCardId === instance.gamecardId &&
    event.playerUid === playerState.uid &&
    event.data?.sourceZone === 'HAND' &&
    event.data?.targetZone === 'GRAVE' &&
    totalErosionCount(playerState) >= 3 &&
    totalErosionCount(playerState) <= 6,
  cost: paymentCost(0, 'BLUE'),
  execute: async (instance, gameState, playerState) => {
    createChoiceQuery(
      gameState,
      playerState.uid,
      '选择艾琳娜效果',
      '选择抽1张卡，或将这张卡横置放置到战场。',
      modeOptions(playerState, instance),
      { sourceCardId: instance.gamecardId, effectId: '104010308_discarded_choice', step: 'MODE' }
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections) => {
    if (selections[0] === 'PUT_EXHAUSTED' && instance.cardlocation === 'GRAVE' && canPutUnitOntoBattlefield(playerState, instance)) {
      putUnitOntoField(gameState, playerState.uid, instance, instance, { exhausted: true });
      return;
    }
    await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'DRAW', value: 1 }, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104010308
 * Card2 Row: 538
 * Card Row: 358
 * Source CardNo: BT07-B05
 * Package: BT07(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：玩家以抽卡以外的方式从卡组将卡加入手牌时，将那张卡舍弃。
 * 【3-6】【诱】：{这张卡从手牌送去墓地时，选择下列的1项效果执行 }［0：蓝］：
 * ◆抽1张卡。
 * ◆将这张卡以横置状态放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104010308',
  fullName: '「艾琳娜」',
  specialName: '艾琳娜',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: {},
  faction: '百濑之水城',
  acValue: 2,
  power: 1000,
  basePower: 1000,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
