import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 304010068
 * Card2 Row: 636
 * Card Row: 520
 * Source CardNo: BT08-B10
 * Package: BT08(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1回合1次〗{你的主要阶段}:将你战场上或手牌中1张卡名含有《剑仙》的卡送入墓地，将你的卡组或侵蚀区的正面卡中的1张卡名含有《剑仙》的卡加入手牌。
 * 〖1~4〗【永】:你战场上的卡名含有《剑仙》的单位〖力量+500〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '304010068',
  fullName: '「东剑仙庄」',
  specialName: '东剑仙庄',
  type: 'ITEM',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '百濑之水城',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
