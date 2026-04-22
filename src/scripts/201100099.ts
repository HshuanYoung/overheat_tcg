import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 201100099
 * Card2 Row: 477
 * Card Row: 410
 * Source CardNo: BT06-W07
 * Package: BT06(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕2】（你的侵蚀区中的背面卡有2张以上时才有效）[将你的战场上的1个神蚀单位放逐]：本回合中，你的单位不会由于对手的卡的效果从战场上离开，放置你将要受到的所有伤害。放逐这张卡。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '201100099',
  fullName: '献身',
  specialName: '',
  type: 'STORY',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '艾柯利普斯',
  acValue: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
