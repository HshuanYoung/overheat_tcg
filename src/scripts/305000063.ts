import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000063
 * Card2 Row: 587
 * Card Row: 471
 * Source CardNo: BT07-Y10
 * Package: BT07(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{这张卡进入战场时}：将你卡组顶的2张卡背面放逐。
 * 【2~5】【启】{你的主要阶段，选择对手墓地中的1张卡}[〖横置〗]:将你卡组顶的1张卡背面放逐。之后，对手将他卡组或手牌中的1张被选择的卡的同名卡送入墓地。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305000063',
  fullName: '「机关分析室」',
  specialName: '机关分析室',
  type: 'ITEM',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '无',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
