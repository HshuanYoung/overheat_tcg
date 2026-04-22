import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101130380
 * Card2 Row: 577
 * Card Row: 461
 * Source CardNo: BT07-W11
 * Package: BT07(OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【速攻】【英勇】
 * 【诱】{这个单位参与联军攻击时}：直到对手回合结束时为止，这个单位不会被战斗破坏。
 * 【创痕2】【启】〖1回合1次〗{这个单位与<圣王国>单位的联军攻击的战斗自由步骤中，选择对手战场上的1张非神蚀卡}：将被选择的卡破坏
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101130380',
  fullName: '王国骑士「尤卡蒂亚」',
  specialName: '尤卡蒂亚',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '圣王国',
  acValue: 2,
  power: 2000,
  basePower: 2000,
  damage: 1,
  baseDamage: 1,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: true,
  isHeroic: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'UR',
  availableRarities: ['UR'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
