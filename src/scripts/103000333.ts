import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103000333
 * Card2 Row: 455
 * Card Row: 390
 * Source CardNo: BT06-G07
 * Package: BT06(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】共鸣（〖1回合1次〗｛你的主要阶段，选择你的墓地中的1张卡｝：将被选择的卡放逐）。
 * 【创痕1】（你的侵蚀区中的背面卡有1张以上时才有效）【诱】｛这个单位的共鸣能力将「萨拉拉」或「奇美拉」或「特特鲁」的单位卡放逐时，你可以选择对手战场上的1张非神蚀卡｝[〖横置〗]：被选择的卡直到对手回合结束为止不能〖横置〗。之后，将你墓地中的1张ACCESS值+3以下的非神蚀单位卡加入手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103000333',
  fullName: '瑟族少女「萨拉拉」',
  specialName: '萨拉拉',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '无',
  acValue: 2,
  power: 1000,
  basePower: 1000,
  damage: 1,
  baseDamage: 1,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
