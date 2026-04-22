import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 205000064
 * Card2 Row: 171
 * Card Row: 171
 * Source CardNo: BT02-Y14
 * Package: BT02(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 公开你的卡组顶的3张卡，你从中选择1张非神蚀单位卡，将其放置到战场上，那个单位获得【速攻】，将其余的卡以任意顺序放置到卡组顶。回合结束时，若那个单位不是卡名含有《炼金》单位，将其放逐。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '205000064',
  fullName: '禁忌炼金',
  specialName: '',
  type: 'STORY',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '无',
  acValue: 2,
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
