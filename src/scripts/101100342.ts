import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101100342
 * Card2 Row: 471
 * Card Row: 405
 * Source CardNo: BT06-W01
 * Package: BT06(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{你的回合结束时}[〖横置〗]：你可以将你的卡组或墓地中的1张《祈祷》或《献身》加入手牌。
 * 【创痕2】（你的侵蚀区中的背面卡有2张以上时才有效）【诱】〖1回合1次〗{你的回合中，你是用故事卡时}：你可以将你的卡组或墓地中的1张没有颜色限制的非神蚀单位卡放置到战场上，那个单位失去所有能力（不包括基本能力）。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101100342',
  fullName: '虔诚少女「柯莉尔」',
  specialName: '柯莉尔',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '艾柯利普斯',
  acValue: 3,
  power: 0,
  basePower: 0,
  damage: 0,
  baseDamage: 0,
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
