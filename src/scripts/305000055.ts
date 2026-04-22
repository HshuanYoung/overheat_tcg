import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000055
 * Card2 Row: 491
 * Card Row: 423
 * Source CardNo: BT06-Y10
 * Package: BT06(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{你的回合开始时}：你可以将你卡组顶的1张卡背面放逐（放逐区的背面卡可以被其持有者确认）
 * 【诱】{你的回合结束时，你的放逐区的背面卡有2张以上}[将这张卡送入墓地]：将你的卡组中的1张卡名含有《钢兵》或「瓦尔基里」的单位卡放置到战场上。之后，将你放逐区中的所有背面卡放置到卡组底。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305000055',
  fullName: '钢铁蓝图',
  specialName: '',
  type: 'ITEM',
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
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
