import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102060393
 * Card2 Row: 600
 * Card Row: 484
 * Source CardNo: BT08-R07
 * Package: BT08(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】噬魂〖1回合1次〗{你的主要阶段}[将这个单位以外你的战场上的的1个非神蚀单位送入墓地]:本回合中，你的所有单位〖力量+500〗。    
 * 〖5~8〗【诱】〖同名1回合1次〗{你的单位由于卡的能力的费用从战场上送入墓地时}:抽1张卡。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102060393',
  fullName: '噬魂术士',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '雷霆',
  acValue: 2,
  power: 1000,
  basePower: 1000,
  damage: 0,
  baseDamage: 0,
  godMark: false,
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
