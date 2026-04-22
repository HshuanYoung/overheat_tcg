import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105120167
 * Card2 Row: 165
 * Card Row: 165
 * Source CardNo: BT02-Y08
 * Package: BT02(SR,ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖同名1回合1次〗:[〖横置〗]选择你的战场上的这个单位以外的2张卡，将其送入墓地，选择你的卡组中的1张卡名含有《炼金》的单位卡，将其放置到战场上。
 * 〖10+〗【启】〖1游戏1次〗:将你的墓地中的所有卡放置到卡组底。你的回合结束时，你败北。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105120167',
  fullName: '大炼金术士「伊丽瑟薇」',
  specialName: '伊丽瑟薇',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '永生之乡',
  acValue: 3,
  power: 2000,
  basePower: 2000,
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
  rarity: 'SR',
  availableRarities: ['SR', 'SER'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
