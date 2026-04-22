import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 203000076
 * Card2 Row: 207
 * Card Row: 207
 * Source CardNo: BT03-G16
 * Package: BT03(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕3】（你的侵蚀区中的背面卡有3张以上时才有效）选择战场上的1个单位，若那个单位是具有【神依】的单位，本回合中，那个单位〖伤害+4〗〖力量+4000〗并获得【歼灭】；若不是，本回合中，那个单位〖伤害+2〗〖力量+2000〗并获得【神依】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '203000076',
  fullName: '天鬼降灵',
  specialName: '',
  type: 'STORY',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '无',
  acValue: 5,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
