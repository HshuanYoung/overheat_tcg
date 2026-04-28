import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, addInfluence, ensureData, universalEquipEffect } from './BaseUtil';

const cardEffects: CardEffect[] = [universalEquipEffect, {
  id: '301130025_reset_equipped',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  description: '非神蚀单位装备这张卡时，将装备单位重置。',
  applyContinuous: (gameState, instance) => {
    if (!instance.equipTargetId) return;
    const target = AtomicEffectExecutor.findCardById(gameState, instance.equipTargetId);
    if (!target || target.godMark) return;
    const data = ensureData(instance);
    if (data.resetEquipTargetId === target.gamecardId) return;
    target.isExhausted = false;
    data.resetEquipTargetId = target.gamecardId;
    addInfluence(target, instance, '装备时重置');
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 301130025
 * Card2 Row: 155
 * Card Row: 155
 * Source CardNo: BT02-W15
 * Package: BT02(U)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【装备】（〖1回合1次〗你的主要阶段中，你可以选择你的1个单位装备这张卡，或者解除这张卡的装备状态。）
 * 【永】:1个单位只能装备1张《银白十字战衣》。
 * 【诱】:非神蚀单位装备这张卡时，将装备单位〖重置〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '301130025',
  fullName: '银白十字战衣',
  specialName: '',
  type: 'ITEM',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '圣王国',
  acValue: 3,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'U',
  availableRarities: ['U'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
