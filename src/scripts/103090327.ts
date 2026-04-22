import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103090327
 * Card2 Row: 449
 * Card Row: 384
 * Source CardNo: BT06-G01
 * Package: BT06(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】共鸣（〖1回合1次〗｛你的主要阶段，选择你的墓地中的1张卡｝：将被选择的卡放逐）。
 * 【诱】〖同名1回合1次〗｛这个单位的共鸣能力将卡名含有《银乐器》的卡或具有【菲晶】的单位卡放逐时｝：你可以抽1张卡。之后，舍弃1张手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103090327',
  fullName: '银乐风琴师',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '瑟诺布',
  acValue: 2,
  power: 2000,
  basePower: 2000,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: true,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
