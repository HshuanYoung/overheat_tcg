import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 303090053
 * Card2 Row: 458
 * Card Row: 393
 * Source CardNo: BT06-G10
 * Package: BT06(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{共鸣能力将你的墓地中的这张卡放逐时，选择战场上的1个单位}：本回合中，将被选择的单位的1个【启】或【诱】能力无效。
 * 【启】〖同名1回合1次〗{主要阶段中，选择战场上1个非神蚀单位}[〖横置〗]：本回合中，将被选择的单位的1个【启】或【诱】能力无效。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '303090053',
  fullName: '银乐器手风琴',
  specialName: '',
  type: 'ITEM',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '瑟诺布',
  acValue: 2,
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
