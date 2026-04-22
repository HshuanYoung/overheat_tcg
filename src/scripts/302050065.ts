import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 302050065
 * Card2 Row: 603
 * Card Row: 487
 * Source CardNo: BT08-R10
 * Package: BT08(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】{你战场上有由于晋升进入战场的<伊列宇王国>的单位}:你战场上的卡在每个回合中第一次将要由于对手的卡的效果离开战场时，防止那次离开战场。
 * 〖4~7〗【诱】{你的单位由于晋升能力放置到你的战场上时}:你可以抽1张卡。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '302050065',
  fullName: '「英雄广场」',
  specialName: '英雄广场',
  type: 'ITEM',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '伊列宇王国',
  acValue: 2,
  godMark: true,
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
