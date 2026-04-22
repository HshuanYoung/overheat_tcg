import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110114
 * Card2 Row: 80
 * Card Row: 80
 * Source CardNo: BT01-Y08
 * Package: BT01(SR,ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【英勇】【歼灭】【速攻】
 * 【永】:这个单位不能组成联军，也不会被破坏。
 * 【诱】:回合结束时，若本回合中，你进入过女神化状态，将这个单位送入墓地。 
 * 〖10+〗【永】:这个单位〖伤害+2〗〖力量+1500〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110114',
  fullName: '「瓦尔基里」ZERO',
  specialName: '瓦尔基里',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '学院要塞',
  acValue: 4,
  power: 3500,
  basePower: 3500,
  damage: 2,
  baseDamage: 2,
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
  rarity: 'SR',
  availableRarities: ['SR', 'SER'],
  cardPackage: 'BT01',
  uniqueId: null as any,
};

export default card;
