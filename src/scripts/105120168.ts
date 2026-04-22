import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105120168
 * Card2 Row: 166
 * Card Row: 166
 * Source CardNo: BT02-Y09
 * Package: BT02(SR,ESR,OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】:这个单位进入战场时，选择你的墓地中的2张 「艾尔蒙特」以外的卡名含有《炼金》的卡，将其放置到卡组底。之后，抽1张卡。
 * 【启，A3-5】〖1回合1次〗:[舍弃1张手牌]这个能力只能在你的主要阶段中发动。公开你的卡组顶的1张卡。若那张卡是ACCESS值+3以下的非神蚀单位卡或非神蚀道具卡，将其放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105120168',
  fullName: '炼金骑士「艾尔蒙特」',
  specialName: '艾尔蒙特',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '永生之乡',
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
  rarity: 'SR',
  availableRarities: ['SR', 'SER', 'UR'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
