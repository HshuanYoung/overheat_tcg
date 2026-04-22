import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000081
 * Card2 Row: 259
 * Card Row: 615
 * Source CardNo: BT03-Y17
 * Package: BT03(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【装备】（〖1回合1次〗你的主要阶段中，你可以选择你的1个单位装备这张卡，或者解除这张卡的装备状态。）
 * 【永】:装备单位不能参与战斗，也不能成为攻击对象或单位卡的能力的效果对象。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305000081',
  fullName: '秘影斗篷',
  specialName: '',
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
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
