import { Card, CardEffect } from '../types/game';
import { addContinuousDamage, addContinuousPower, getOnlyGodMarkUnit, ownerOf, preventFirstDestroyEachTurn } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '301000072_lone_god_boost',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  description: '若你的战场上仅有1个神蚀单位，那个单位伤害+1、力量+1000，且每回合第一次将被破坏时防止。',
  applyContinuous: (gameState, instance) => {
    const owner = ownerOf(gameState, instance);
    if (!owner) return;
    const target = getOnlyGodMarkUnit(owner);
    if (!target) return;
    addContinuousDamage(target, instance, 1);
    addContinuousPower(target, instance, 1000);
    preventFirstDestroyEachTurn(target, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 301000072
 * Card2 Row: 321
 * Card Row: 560
 * Source CardNo: BT04-W10
 * Package: BT04(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：若你的战场上仅有1个神蚀单位的话，那个单位〖伤害+1〗〖力量+1000〗，那个单位在每个回合第一次将要被破坏时，防止那次破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '301000072',
  fullName: '「撒玛利亚长诗」',
  specialName: '撒玛利亚长诗',
  type: 'ITEM',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '无',
  acValue: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
