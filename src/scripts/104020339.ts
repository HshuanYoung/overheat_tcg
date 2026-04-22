import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104020339
 * Card2 Row: 464
 * Card Row: 399
 * Source CardNo: BT06-B05
 * Package: BT06(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】财富2（只要这个单位在战场上，你获得2个财富指示物）。
 * 【创痕2】【启】〖1回合1次〗{选择你的战场上的1个非神蚀单位}：将被选择的卡破坏，将你的侵蚀区或墓地中的1张《阿克蒂的记录》加入手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104020339',
  fullName: '商队领袖「阿克蒂」',
  specialName: '阿克蒂',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 2 },
  faction: '九尾商会联盟',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 1,
  baseDamage: 1,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
