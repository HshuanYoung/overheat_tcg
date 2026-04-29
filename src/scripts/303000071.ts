import { Card, CardEffect } from '../types/game';
import { addContinuousKeyword, getOnlyGodMarkUnit, markCannotBeEffectTarget, ownerOf } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '303000071_lone_god_protect',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  description: '若你的战场上仅有1个神蚀单位，那个单位不能成为效果对象，并获得【歼灭】。',
  applyContinuous: (gameState, instance) => {
    const owner = ownerOf(gameState, instance);
    if (!owner) return;
    const target = getOnlyGodMarkUnit(owner);
    if (!target) return;
    markCannotBeEffectTarget(target, instance);
    addContinuousKeyword(target, instance, 'annihilation');
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 303000071
 * Card2 Row: 301
 * Card Row: 540
 * Source CardNo: BT04-G10
 * Package: BT04(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：若你的战场上仅有1个神蚀单位，那个单位不能成为效果对象，并获得【歼灭】
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '303000071',
  fullName: '「萨拉拉的银笛」',
  specialName: '萨拉拉的银笛',
  type: 'ITEM',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '无',
  acValue: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
