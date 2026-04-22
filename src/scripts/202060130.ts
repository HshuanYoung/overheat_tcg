import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 202060130
 * Card2 Row: 310
 * Card Row: 549
 * Source CardNo: BT04-R09
 * Package: BT04(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 选择你的1个卡名含有《炎雷》的单位，本回合中，〖力量+1500〗.
 * 【你为<雷霆>的卡支付使用费用时，你可以将手牌中的这张卡放逐作为这次费用的代替。】
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '202060130',
  fullName: '炎雷之箭',
  specialName: '',
  type: 'STORY',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '雷霆',
  acValue: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
