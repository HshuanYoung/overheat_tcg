import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000046
 * Card2 Row: 511
 * Card Row: 334
 * Source CardNo: PR06-07Y
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1回合1次〗{你的主要阶段，选择1名对手}：被选择的玩家可以将自己卡组顶的1张卡送入墓地。若没有如此做，那名玩家宣言1个卡片种类。之后，公开你的卡组顶的1张卡，若那张卡的种类和宣言的不一致，将其加入手牌。若一致，将那张卡按原样放回。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305000046',
  fullName: '「糖果魔盒」',
  specialName: '糖果魔盒',
  type: 'ITEM',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '无',
  acValue: 3,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'PR',
  availableRarities: ['PR'],
  cardPackage: '特殊',
  uniqueId: null as any,
};

export default card;
