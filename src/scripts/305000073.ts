import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000073
 * Card2 Row: 330
 * Card Row: 569
 * Source CardNo: BT04-Y09
 * Package: BT04(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：由于「神秘工坊」的效果放置到战场上的单位不受对手的所有卡的效果影响，〖伤害+4〗〖力量+4000〗并获得【英勇】【歼灭】。
 * 【启】〖一游戏一次〗：[横置]选择你的3个从卡组放置到战场上的单位，将其送入墓地。之后，选择你的卡组中的1张卡名含有《炼金》的单位卡，将其放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305000073',
  fullName: '「神秘工坊」',
  specialName: '神秘工坊',
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
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
