import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import { addInfluence, addTempDamage, ensureData, ownUnits, ownerUidOf, totalErosionCount } from './BaseUtil';

const hasIrodoriAbility = (card: Card) =>
  card.type === 'UNIT' &&
  (card.effects || []).some(effect =>
    (effect.id || '').toLowerCase().includes('irodori') ||
    (effect.description || '').includes('异彩')
  );

const snowHouseActive = (gameState: any, ownerUid: string) => {
  const owner = gameState.players[ownerUid];
  const erosion = totalErosionCount(owner);
  return erosion >= 3 &&
    erosion <= 6 &&
    ownUnits(owner).some(unit => unit.godMark && hasIrodoriAbility(unit));
};

const effect_301000048_protect_self: CardEffect = {
  id: '301000048_protect_self',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  description: '3~6且己方有具有异彩的神蚀单位时，这张卡不会由于对手卡牌效果从战场离开。',
  applyContinuous: (gameState, instance) => {
    const ownerUid = ownerUidOf(gameState, instance);
    if (!ownerUid || !snowHouseActive(gameState, ownerUid)) return;
    const data = ensureData(instance);
    data.cannotLeaveFieldByOpponentEffectTurn = gameState.turnCount;
    data.cannotLeaveFieldByOpponentEffectSourceName = instance.fullName;
    addInfluence(instance, instance, '不会由于对手卡牌效果从战场离开');
  }
};

const effect_301000048_draw_on_destroy: CardEffect = {
  id: '301000048_draw_on_destroy',
  type: 'TRIGGER',
  triggerEvent: ['CARD_DESTROYED_EFFECT', 'CARD_DESTROYED_BATTLE'],
  isGlobal: true,
  isMandatory: false,
  triggerLocation: ['ITEM'],
  description: '3~6且己方有具有异彩的神蚀单位时，自己的回合中己方ACCESS 3非神蚀单位被破坏，抽1张卡。',
  condition: (gameState, playerState, instance, event) => {
    const destroyed = (event?.sourceCard as Card | undefined) ||
      (event?.targetCardId ? AtomicEffectExecutor.findCardById(gameState, event.targetCardId) : undefined);
    const targetZone = event?.type === 'CARD_DESTROYED_BATTLE'
      ? 'GRAVE'
      : (event?.data?.targetZone || destroyed?.cardlocation);
    return instance.cardlocation === 'ITEM' &&
      playerState.isTurn &&
      snowHouseActive(gameState, playerState.uid) &&
      !!destroyed &&
      ownerUidOf(gameState, destroyed) === playerState.uid &&
      targetZone === 'GRAVE' &&
      destroyed.type === 'UNIT' &&
      !destroyed.godMark &&
      Number(destroyed.acValue || 0) === 3 &&
      playerState.deck.length > 0;
  },
  execute: async (instance, gameState, playerState) => {
    await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'DRAW', value: 1 }, instance);
  }
};

const effect_301000048_irodori_attack_damage: CardEffect = {
  id: '301000048_irodori_attack_damage',
  type: 'TRIGGER',
  triggerEvent: 'CARD_ATTACK_DECLARED',
  isGlobal: true,
  isMandatory: false,
  triggerLocation: ['ITEM'],
  description: '3~6且己方有具有异彩的神蚀单位时，自己的具有异彩的单位攻击宣言时，那个单位本回合伤害+1。',
  condition: (gameState, playerState, instance, event) => {
    if (instance.cardlocation !== 'ITEM' || event?.playerUid !== playerState.uid || !snowHouseActive(gameState, playerState.uid)) return false;
    return (event.data?.attackerIds || [])
      .map((id: string) => AtomicEffectExecutor.findCardById(gameState, id))
      .some((unit: Card | undefined) => !!unit && ownerUidOf(gameState, unit) === playerState.uid && hasIrodoriAbility(unit));
  },
  execute: async (_instance, gameState, playerState, event) => {
    const attackers = (event?.data?.attackerIds || [])
      .map((id: string) => AtomicEffectExecutor.findCardById(gameState, id))
      .filter((unit: Card | undefined): unit is Card =>
        !!unit &&
        ownerUidOf(gameState, unit) === playerState.uid &&
        hasIrodoriAbility(unit)
      );
    attackers.forEach(unit => addTempDamage(unit, _instance, 1));
  }
};

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 301000048
 * Card2 Row: 520
 * Card Row: 342
 * Source CardNo: SP03-W04
 * Package: SP03(R,SPR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖3~6〗【永】{若你的战场上有具有异彩的神蚀单位，这张卡获得下列能力}：
 * “【永】：令这张卡离场的卡的效果不处理。”
 * “【诱】{你的回合中，你的ACCESS+3的非神蚀单位被破坏时}：抽1张卡。”
 * “【启】{你的具有异彩的单位攻击宣言时}：那个单位本回合〖伤害+1〗。”
 */
const card: Card = {
  id: '301000048',
  fullName: '「雪夜小屋」',
  specialName: '雪夜小屋',
  type: 'ITEM',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [effect_301000048_protect_self, effect_301000048_draw_on_destroy, effect_301000048_irodori_attack_damage],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'SP03',
  uniqueId: null as any,
};

export default card;
