import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 201000132
 * Card2 Row: 319
 * Card Row: 558
 * Source CardNo: BT04-W08
 * Package: BT04(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 选择一名玩家的墓地中2张卡，将其放逐。之后，若你场上有<仙雪原>的神蚀单位，你可以选择你侵蚀区中的1张卡，将其放逐。
 * 【你为ACCESS值+3以下的白色卡支付使用费用时，你可以将手牌中的这张卡放逐作为这次费用的代替。】
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '201000132',
  fullName: '狮鹫之息',
  specialName: '',
  type: 'STORY',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 1,
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
