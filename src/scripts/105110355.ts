import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110355
 * Card2 Row: 492
 * Card Row: 424
 * Source CardNo: BT06-Y11
 * Package: BT06(OHR)，特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：你战场上的具有【菲晶】的单位也具备黄色和蓝色。
 * 【创痕1】（你的侵蚀区中的背面卡有1张以上时才有效）【诱】{你的战场上有蓝色单位，你的回合结束时}：你可以将你卡组或墓地中的1张没有颜色限制的单位放置到战场上，那个单位的所有能力无效（不包括基本能力），变为〖伤害0〗/〖力量0〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110355',
  fullName: '商队护卫「真理」',
  specialName: '真理',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '学院要塞',
  acValue: 3,
  power: 1000,
  basePower: 1000,
  damage: 1,
  baseDamage: 1,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: true,
  canResetCount: 0,
  effects: [],
  rarity: 'UR',
  availableRarities: ['UR'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
