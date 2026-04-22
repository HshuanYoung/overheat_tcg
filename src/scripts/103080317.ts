import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103080317
 * Card2 Row: 551
 * Card Row: 371
 * Source CardNo: BT07-G07
 * Package: BT07(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖同名1回合1次〗{你的单位由于卡的效果从战场上离开时}[〖0：绿〗将你卡组顶的2张卡送入墓地]:你可以将墓地中的这张卡放置到战场上。
 * 【创痕1】【启】〖同名1回合1次〗[〖+2〗，将手牌或战场上的这张卡送入墓地]：将你卡组或墓地中的1张具有唤醒的单位卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103080317',
  fullName: '翠绿守护「格里恩」',
  specialName: '格里恩',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 2 },
  faction: '神木森',
  acValue: 4,
  power: 3500,
  basePower: 3500,
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
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
