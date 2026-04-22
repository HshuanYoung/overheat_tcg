import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103080212
 * Card2 Row: 370
 * Card Row: 240
 * Source CardNo: BT05-G04
 * Package: BT05(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖同名1回合1次〗{你有3个以上单位返回过卡组的你的回合结束时}:你可以将你的卡组中1张卡名含有《神木》的单位卡加入手牌。
 * 【启】〖同名1回合1次〗:{你的回合中，选择你的战场上的1个<神木森>单位}:将被选择的单位放置到你的卡组底。之后，将你的卡组中的1张与那个单位卡名不同的<神木森>非神蚀单位卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103080212',
  fullName: '神木规划师「希尔维娅」',
  specialName: '希尔维娅',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 2 },
  faction: '神木森',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
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
  cardPackage: 'BT05',
  uniqueId: null as any,
};

export default card;
