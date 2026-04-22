import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103000334
 * Card2 Row: 459
 * Card Row: 394
 * Source CardNo: BT06-G11
 * Package: BT06(OHR)，特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{共鸣能力将你的墓地中的这张卡放逐时，选择你的墓地中的1张「奇美拉」单位卡}：将被选择的卡放置到战场上。
 * 【启】〖1回合1次〗{这个单位从墓地放置到战场上的回合中，选择战场上1张非神蚀卡}：将被选择的卡破坏。若你的战场上有「萨拉拉」单位，本回合中，这个单位获得【速攻】【英勇】【歼灭】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103000334',
  fullName: '白色异兽「奇美拉」',
  specialName: '奇美拉',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 2 },
  faction: '无',
  acValue: 4,
  power: 3500,
  basePower: 3500,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: true,
  isAnnihilation: true,
  isHeroic: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'UR',
  availableRarities: ['UR', 'PR'],
  cardPackage: 'BT06，特殊',
  uniqueId: null as any,
};

export default card;
