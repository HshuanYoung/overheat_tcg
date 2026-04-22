import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 205110040
 * Card2 Row: 84
 * Card Row: 84
 * Source CardNo: BT01-Y12
 * Package: BT01(C),ST04(TD)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 选择1名对手，公开他的所有手牌。之后，那名对手选择他自己的手牌中的1张非单位卡，将其舍弃。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '205110040',
  fullName: '机密窥探',
  specialName: '',
  type: 'STORY',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '学院要塞',
  acValue: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT01,ST04',
  uniqueId: null as any,
};

export default card;
