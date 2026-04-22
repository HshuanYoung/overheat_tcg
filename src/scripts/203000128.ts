import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 203000128
 * Card2 Row: 299
 * Card Row: 538
 * Source CardNo: BT04-G08
 * Package: BT04(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖同名1回合1次〗：将你的1个具有指定名的神蚀单位返回持有者的手牌，选择你墓地中的1张与那个单位指定名相同、卡名不同的单位卡，将其放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '203000128',
  fullName: '魔女觉醒',
  specialName: '',
  type: 'STORY',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '无',
  acValue: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
