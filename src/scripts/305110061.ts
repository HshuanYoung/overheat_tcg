import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305110061
 * Card2 Row: 585
 * Card Row: 469
 * Source CardNo: BT07-Y08
 * Package: BT07(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{你的回合开始时}:你可以将你卡组顶的1张卡背面放逐。（放逐区的背面卡可以被其持有者确认）
 * 【诱】{你的回合结束时}[将这张卡送入墓地]:若你的放逐区的背面卡有4张以上，你可以将你放逐区中的所有背面卡放置到你的卡组底，之后，将你的卡组中的1张<学院要塞>的ACCESS值+4以上的单位卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305110061',
  fullName: '要塞蓝图',
  specialName: '',
  type: 'ITEM',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '学院要塞',
  acValue: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
