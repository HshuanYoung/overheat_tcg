import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 303000022
 * Card2 Row: 123
 * Card Row: 123
 * Source CardNo: BT02-G17
 * Package: BT02(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】:这张卡进入战场时，选择战场上的1个单位，只要这张卡在战场上，那个单位获得“【永】:这个单位不能〖横置〗，不能宣言攻击和防御。”的能力。那个单位离开战场时，将这张卡送入墓地。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '303000022',
  fullName: '「灵魂束缚」',
  specialName: '灵魂束缚',
  type: 'ITEM',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '无',
  acValue: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
