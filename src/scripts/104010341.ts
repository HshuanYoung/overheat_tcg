import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104010341
 * Card2 Row: 470
 * Card Row: 404
 * Source CardNo: BT06-B11
 * Package: BT06(OHR)，特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖1回合1次〗{你的回合中，这个单位被道具卡装备时}：你可以抽1张卡。
 * 【创痕4】【启】〖同名1回合1次〗{选择战场上的1张非神蚀卡 }（舍弃2张手牌）：将被选择的卡放置到持有者的卡组顶。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104010341',
  fullName: '炉火之舞「风花」',
  specialName: '风花',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 2 },
  faction: '百濑之水城',
  acValue: 4,
  power: 3000,
  basePower: 3000,
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
  rarity: 'UR',
  availableRarities: ['UR'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
