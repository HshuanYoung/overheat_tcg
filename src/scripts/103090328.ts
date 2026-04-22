import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103090328
 * Card2 Row: 450
 * Card Row: 385
 * Source CardNo: BT06-G02
 * Package: BT06(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】共鸣（〖1回合1次〗｛你的主要阶段，选择你的墓地中的1张卡｝：将被选择的卡放逐）。
 * 【诱】｛这个单位的共鸣能力将卡名含有《银乐器》的卡放逐时，选择战场上1个非神蚀单位｝：被选择的单位本回合中〖伤害+1〗〖力量+1500〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103090328',
  fullName: '聚居地的诗人',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '瑟诺布',
  acValue: 3,
  power: 2000,
  basePower: 2000,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
