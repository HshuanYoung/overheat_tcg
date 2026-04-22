import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110445
 * Card2 Row: 325
 * Card Row: 564
 * Source CardNo: BT04-Y04
 * Package: BT04(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：你的战场上只能有一个神蚀单位。
 * 【诱】：你的回合结束时，你可以抽最多X张卡。
 * 【启】〖同名1回合1次〗：[从你的手牌，卡组，墓地放逐合计2张「真理」的神蚀卡]你的主要阶段才能发动。将你卡组中的一张ACCESS值+X以下的非神蚀卡放置到战场上。（X均为你的战场上的道具卡的种类数）
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110445',
  fullName: '彼岸共鸣「真理」',
  specialName: '真理',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '学院要塞',
  acValue: 5,
  power: 4000,
  basePower: 4000,
  damage: 4,
  baseDamage: 4,
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
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
