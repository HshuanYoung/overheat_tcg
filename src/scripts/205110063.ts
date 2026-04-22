import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 205110063
 * Card2 Row: 170
 * Card Row: 170
 * Source CardNo: BT02-Y13
 * Package: BT02(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 选择你的卡组中的1张 「瓦尔基里」单位卡，将其放置到战场上。
 * 你的战场上每有1张道具卡，手牌中的这张卡的ACCESS值便减少1。（最低降到〖0:黄黄〗）
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '205110063',
  fullName: '瓦尔基里计划',
  specialName: '',
  type: 'STORY',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '学院要塞',
  acValue: 5,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
