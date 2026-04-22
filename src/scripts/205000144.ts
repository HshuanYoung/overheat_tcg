import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 205000144
 * Card2 Row: 256
 * Card Row: 612
 * Source CardNo: BT03-Y14
 * Package: BT03(U)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 选择你的战场上的1张道具卡，将其破坏。之后，选择1名对手，那名对手选择他自己的1张手牌舍弃。若舍弃的是非神蚀单位卡，将那张卡放置到你的战场上。若那名对手没有手牌可以舍弃，将其卡组顶的3张卡送入墓地。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '205000144',
  fullName: '礼帽秘法',
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
  rarity: 'U',
  availableRarities: ['U'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
