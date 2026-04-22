import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 205000142
 * Card2 Row: 254
 * Card Row: 610
 * Source CardNo: BT03-Y12
 * Package: BT03(R,ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕2】（你的侵蚀区中的背面卡有2张以上时才有效）公开你的卡组顶的7张卡。你从中选择1张卡，将其加入手牌。将公开的其余的卡按原样放回，将你的卡组洗切。
 * 若你的战场上有「真理」单位，不公开你的卡组顶，从你的卡组中选择1张卡，将其加入手牌，将你的卡组洗切。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '205000142',
  fullName: '世界目录',
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
  availableRarities: ['R', 'SER'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
