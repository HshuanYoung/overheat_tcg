import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000017
 * Card2 Row: 88
 * Card Row: 88
 * Source CardNo: BT01-Y16
 * Package: BT01(C),ST04(TD)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:你的回合开始阶段中，这张卡不能重置。 
 * 【启】:[〖+1〗，〖横置〗]选择你的1个单位，那个单位在本回合中被破坏时，将其返回手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305000017',
  fullName: '烟雾弹',
  specialName: '',
  type: 'ITEM',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '无',
  acValue: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT01,ST04',
  uniqueId: null as any,
};

export default card;
