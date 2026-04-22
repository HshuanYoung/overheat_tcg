import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 203000095
 * Card2 Row: 456
 * Card Row: 391
 * Source CardNo: BT06-G08
 * Package: BT06(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * {选择战场上的1张非神蚀道具卡}[将你的墓地中的1张神蚀卡放逐]：将被选择的卡破坏。
 * {你的主要阶段，你的墓地中的这张卡被放逐时，选择对手的战场上的1个非神蚀单位}：本回合中，你的战场上的<瑟诺布>单位可以攻击被选择的单位。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '203000095',
  fullName: '银乐器咒法',
  specialName: '',
  type: 'STORY',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '无',
  acValue: -2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
