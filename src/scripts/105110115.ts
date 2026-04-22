import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110115
 * Card2 Row: 81
 * Card Row: 81
 * Source CardNo: BT01-Y09
 * Package: BT01(SR,ESR,OHR),BTO3(FVR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1回合1次〗:[〖+2〗]选择你的卡组中的1张卡，放置到卡组顶。
 * 〖3~5〗【启】〖1回合1次〗:这个能力只能在你的主要阶段中发动，且不能用于对抗。公开你的卡组顶的1张卡。若符合使用条件，你可以立刻支付ACCESS值来使用那张卡。否则，将其按原样放回。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110115',
  fullName: '阿卡迪亚圣女「真理」',
  specialName: '真理',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '学院要塞',
  acValue: 4,
  power: 3000,
  basePower: 3000,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR', 'SER', 'UR'],
  cardPackage: 'BT01,BTO3',
  uniqueId: null as any,
};

export default card;
