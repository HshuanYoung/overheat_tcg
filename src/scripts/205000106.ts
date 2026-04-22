import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 205000106
 * Card2 Row: 489
 * Card Row: 435
 * Source CardNo: BT06-Y08
 * Package: BT06(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕1】（你的侵蚀区中的背面卡有1张以上时才有效）
 * 〖同名1回合1次〗{你的主要阶段}[舍弃1张黄色手牌]：将你卡组中的2张没有颜色限制的非神蚀单位卡放置到战场上，那些单位的所有能力无效（不包括基本能力），变为〖伤害0〗〖力量0〗，离开战场时将其放逐。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '205000106',
  fullName: '日常的光景',
  specialName: '',
  type: 'STORY',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
