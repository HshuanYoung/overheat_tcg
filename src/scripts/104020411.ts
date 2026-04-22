import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104020411
 * Card2 Row: 628
 * Card Row: 512
 * Source CardNo: BT08-B02
 * Package: BT08(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:财富1(只要这个单位在战场上，你获得1个财富指示物)。
 * 【诱】〖1回合1次〗{你的财富指示物有3个以上，你的回合结束时}：将你的墓地或侵蚀区的正面卡中的1张《金钱美梦》加入手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104020411',
  fullName: '「暮城的大珠宝商」',
  specialName: '暮城的大珠宝商',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: {},
  faction: '九尾商会联盟',
  acValue: 4,
  power: 3500,
  basePower: 3500,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
