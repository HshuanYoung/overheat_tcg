import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 304010054
 * Card2 Row: 469
 * Card Row: 403
 * Source CardNo: BT06-B10
 * Package: BT06(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【装备】
 * 【永】：装备单位不会成为白色或绿色卡的效果的对象。
 * 【诱】〖同名1回合1次〗{你的〈百濑之水城〉的神蚀单位从手牌进入战场时，选择那些单位中的一个}：将手牌中的这张卡放置到战场上并装备给被选择的单位。
 * 【诱】{装备单位由于卡的效果返回持有者的手牌时}：将这张卡返回持有者的手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '304010054',
  fullName: '「纳剑仙鞘」',
  specialName: '纳剑仙鞘',
  type: 'ITEM',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '百濑之水城',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
