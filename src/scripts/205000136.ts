import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 205000136
 * Card2 Row: 329
 * Card Row: 568
 * Source CardNo: BT04-Y08
 * Package: BT04(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕1】（你的侵蚀区中的背面卡有1张以上时才有效）只能在你的主要阶段中使用。选择你的卡组中的1张单位卡，将其放置到战场上，给予你与那个单位ACCESS值相同的伤害。之后，这个回合结束。
 * 【你为ACCESS值+3以下的黄色卡支付使用费用时，你可以将手牌中的这张卡放逐作为这次费用的代替。】
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '205000136',
  fullName: '神灵的炼金',
  specialName: '',
  type: 'STORY',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '无',
  acValue: 3,
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
