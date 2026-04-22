import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 205000153
 * Card2 Row: 624
 * Card Row: 508
 * Source CardNo: BT08-Y09
 * Package: BT08(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕2】{你的主要阶段}:将你战场上的非神蚀卡或你的卡组中的神蚀卡合计2张以上送入墓地，将你的卡组中的1张卡名含有《炼金》的非神蚀单位卡放置到战场上。这个效果也视作《高位炼金》的效果将单位卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '205000153',
  fullName: '虹彩炼金',
  specialName: '',
  type: 'STORY',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '无',
  acValue: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
