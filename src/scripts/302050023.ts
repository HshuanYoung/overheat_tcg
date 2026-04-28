import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, addContinuousDamage, addContinuousPower, battlingUnits, universalEquipEffect } from './BaseUtil';

const cardEffects: CardEffect[] = [universalEquipEffect, {
  id: '302050023_equip_battle_boost',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  description: '装备单位参与攻击的战斗中，装备单位伤害+1、力量+1000。',
  applyContinuous: (gameState, instance) => {
    if (!instance.equipTargetId) return;
    const target = AtomicEffectExecutor.findCardById(gameState, instance.equipTargetId);
    if (!target || !battlingUnits(gameState).some(unit => unit.gamecardId === target.gamecardId)) return;
    addContinuousDamage(target, instance, 1);
    addContinuousPower(target, instance, 1000);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 302050023
 * Card2 Row: 138
 * Card Row: 138
 * Source CardNo: BT02-R16
 * Package: BT02(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【装备】（〖1回合1次〗你的主要阶段中，你可以选择你的1个单位装备这张卡，或者解除这张卡的装备状态。）
 * 【永】:装备单位参与攻击的战斗中，那个单位〖伤害+1〗〖力量+1000〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '302050023',
  fullName: '提亚塞斯长枪',
  specialName: '',
  type: 'ITEM',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '伊列宇王国',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
