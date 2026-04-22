import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103080314
 * Card2 Row: 548
 * Card Row: 368
 * Source CardNo: BT07-G04
 * Package: BT07(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】唤醒（〖1回合1次〗{你的主要阶段，选择你的战场上的1个单位}:本回合中，被选择的单位〖力量+1000〗。回合结束时，将其放置到你的卡组底）。
 * 【诱】〖1回合1次〗{你的单位由于卡的效果从战场上离开时}:你可以将你卡组中的1张<神木森>的非神蚀卡送入墓地。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103080314',
  fullName: '报晓猿猴',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '神木森',
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
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
