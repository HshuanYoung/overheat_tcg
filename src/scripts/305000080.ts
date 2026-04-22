import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000080
 * Card2 Row: 258
 * Card Row: 614
 * Source CardNo: BT03-Y16
 * Package: BT03(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【装备】（〖1回合1次〗你的主要阶段中，你可以选择你的1个单位装备这张卡，或者解除这张卡的装备状态。）
 * 【永】:装备单位获得“【启】:[〖横置〗]公开你的卡组顶的1张卡。你可以将那张卡加入手牌，并将1张手牌放置到卡组底。若没有加入手牌，将公开的卡按原样放回。”的能力。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305000080',
  fullName: '索美琳童话集',
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
