import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 303080070
 * Card2 Row: 647
 * Card Row: 529
 * Source CardNo: BT08-G10
 * Package: BT08(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:你的战场上的被唤醒适用的单位〖伤害+1〗。
 * 〖2~5〗【诱】{你的战场上有2个以上单位返回过卡组的回合结束时}[〖+1〗]:将卡组中的1张<神木森>的非神蚀单位卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '303080070',
  fullName: '「绿野幻想」',
  specialName: '绿野幻想',
  type: 'ITEM',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '神木森',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
