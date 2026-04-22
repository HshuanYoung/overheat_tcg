import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 301140059
 * Card2 Row: 575
 * Card Row: 459
 * Source CardNo: BT07-W09
 * Package: BT07(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：对手不能对抗你对卡名含有《神仪》的卡的使用。
 * 【0-4】【诱】〖1回合1次〗{你的单位由于卡名含有《神仪》的卡的效果进入战场时}：你可以抽1张卡。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '301140059',
  fullName: '「黎明礼拜堂」',
  specialName: '黎明礼拜堂',
  type: 'ITEM',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '女神教会',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
