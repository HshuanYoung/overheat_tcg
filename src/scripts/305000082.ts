import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000082
 * Card2 Row: 272
 * Card Row: 628
 * Source CardNo: PR01-04Y
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1回合1次〗:这个能力只能在你的回合中发动。宣言一个卡名，公开你的卡组顶的一张卡。若那张卡的卡名和宣言一致，将其加入手牌。否则，将那卡按原样放回。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305000082',
  fullName: '「魔法扫描仪」',
  specialName: '魔法扫描仪',
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
