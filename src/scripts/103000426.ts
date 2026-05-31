import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, addInfluence, cardsInZones, ensureData, getOpponentUid, millTop, moveCardAsCost } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '103000426_god_limit',
  type: 'CONTINUOUS',
  description: '你的战场上只能有1个神蚀单位。',
  limitGodmarkCount: 1
}, {
  id: '103000426_battle_silence',
  type: 'CONTINUOUS',
  triggerLocation: ['UNIT'],
  description: '与这个单位进行战斗的对方所有单位在那个战斗阶段中，所有非关键词效果无效。',
  applyContinuous: (gameState, instance) => {
    const battle = gameState.battleState;
    if (!battle) return;
    const includesSelf = battle.attackers.includes(instance.gamecardId) || battle.defender === instance.gamecardId;
    if (!includesSelf) return;
    const opponentIds = battle.attackers.includes(instance.gamecardId)
      ? (battle.defender ? [battle.defender] : [])
      : battle.attackers;
    opponentIds.forEach(id => {
      const target = AtomicEffectExecutor.findCardById(gameState, id);
      if (!target) return;
      const data = ensureData(target);
      data.fullEffectSilencedTurn = gameState.turnCount;
      data.fullEffectSilenceSource = instance.fullName;
      addInfluence(target, instance, '本回合失去所有非关键词效果');
    });
  }
}, {
  id: '103000426_mill_three',
  type: 'ACTIVATE',
  triggerLocation: ['UNIT'],
  limitCount: 1,
  limitNameType: true,
  description: '同名1回合1次：主要阶段，放逐合计2张「萨拉拉」神蚀卡，选择1名对手，将其卡组顶3张送去墓地。',
  condition: (gameState, playerState) =>
    playerState.isTurn &&
    gameState.phase === 'MAIN' &&
    cardsInZones(playerState, ['HAND', 'DECK', 'GRAVE']).filter(({ card }) => card.godMark && card.specialName === '萨拉拉').length >= 2,
  cost: async (gameState, playerState, instance) => {
    const costs = cardsInZones(playerState, ['HAND', 'DECK', 'GRAVE']).filter(({ card }) => card.godMark && card.specialName === '萨拉拉');
    gameState.pendingQuery = {
      id: Math.random().toString(36).substring(7),
      type: 'SELECT_CARD',
      playerUid: playerState.uid,
      options: AtomicEffectExecutor.enrichQueryOptions(gameState, playerState.uid, costs),
      title: '选择放逐费用',
      description: '选择合计2张「萨拉拉」神蚀卡放逐作为费用。',
      minSelections: 2,
      maxSelections: 2,
      callbackKey: 'EFFECT_RESOLVE',
      context: {
        sourceCardId: instance.gamecardId,
        effectId: '103000426_mill_three',
        step: 'SALALA_EXILE_COST',
        costType: 'CUSTOM_CARD_COST',
        skipEffectResolveAfterCost: true
      }
    };
    return true;
  },
  onCostResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.step !== 'SALALA_EXILE_COST') return;
    const costEntries = cardsInZones(playerState, ['HAND', 'DECK', 'GRAVE'])
      .filter(({ card }) => card.godMark && card.specialName === '萨拉拉');
    const selected = selections
      .map(id => costEntries.find(({ card }) => card.gamecardId === id)?.card)
      .filter((card): card is Card => !!card);
    if (selected.length !== 2 || new Set(selected.map(card => card.gamecardId)).size !== 2) {
      context.cancelActivation = true;
      return;
    }
    selected.forEach(card => {
      const ownerUid = AtomicEffectExecutor.findCardOwnerKey(gameState, card.gamecardId);
      if (ownerUid) moveCardAsCost(gameState, ownerUid, card, 'EXILE', instance);
    });
  },
  execute: async (instance, gameState, playerState) => {
    millTop(gameState, getOpponentUid(gameState, playerState.uid), 3, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103000426
 * Card2 Row: 296
 * Card Row: 535
 * Source CardNo: BT04-G05
 * Package: BT04(ESR,OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【歼灭】
 * 【永】：你的战场上只能有一个神蚀单位。与这个单位进行战斗的对方的所有单位在那个战斗阶段中，所有效果无效。（不包括关键词效果）
 * 【启】〖同名一回合一次〗：[从你的手牌，卡组，墓地放逐合计2张「萨拉拉」的神蚀卡]这个能力只能在你的主要阶段发动。选择1名对手，将他卡组顶的3张卡送去墓地。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103000426',
  fullName: '风清无音「萨拉拉」',
  specialName: '萨拉拉',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 2 },
  faction: '无',
  acValue: 5,
  power: 4000,
  basePower: 4000,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isAnnihilation: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
