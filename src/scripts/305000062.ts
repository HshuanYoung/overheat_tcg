import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000062
 * Card2 Row: 586
 * Card Row: 470
 * Source CardNo: BT07-Y09
 * Package: BT07(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：卡名含有《炼金》的卡的效果将战场上的这张卡送入墓地时，这张卡视作具备所有颜色。
 * 【诱】{这张卡被卡名含有《炼金》的卡的效果送入墓地时}：你可以将你墓地中的最多2张卡名含有《炼金》的卡放置到你的卡组底。之后，抽1张卡，将这张卡放逐。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305000062',
  fullName: '永生石',
  specialName: '',
  type: 'ITEM',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '无',
  acValue: 1,
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
