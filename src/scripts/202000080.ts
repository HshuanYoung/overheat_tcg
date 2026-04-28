import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 202000080
 * Card2 Row: 222
 * Card Row: 222
 * Source CardNo: BT03-R14
 * Package: BT03(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖5~7〗选择战场上的1张卡，将其破坏。若你的战场上有具有【神依】的单位，这张卡的ACCESS值减少4。（最低降到〖0费〗）
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '202000080',
  fullName: '神雷',
  specialName: '',
  type: 'STORY',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '无',
  acValue: 6,
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
