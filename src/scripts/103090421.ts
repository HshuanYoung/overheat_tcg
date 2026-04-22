import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103090421
 * Card2 Row: 648
 * Card Row: 530
 * Source CardNo: BT08-G11
 * Package: BT08(OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{你的单位的共鸣能力将<瑟诺布>的神蚀卡放逐时，选择对手战场上的1个单位}:直到对手的回合结束时为止，被选择的单位失去所有能力。本回合中，你的<瑟诺布>单位的下一次攻击可以攻击被选择的单位。
 * 〖5~8〗【诱】{共鸣能力将你的墓地中的这张卡放逐时}[舍弃1张手牌]:你可以将你墓地中的1张卡名含有《银乐》的单位卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103090421',
  fullName: '银乐器之诗「夏洛」',
  specialName: '夏洛',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 2 },
  faction: '瑟诺布',
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
  rarity: 'UR',
  availableRarities: ['UR'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
