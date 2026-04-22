import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110467
 * Card2 Row: 243
 * Card Row: 599
 * Source CardNo: BT03-Y01
 * Package: BT03(SR,ESR,OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖1回合1次〗:这个单位宣言攻击时，将你的卡组洗切，公开你的卡组顶的1张卡。若那张卡是单位卡，选择战场上的这个单位以外的1个单位，将其〖横置〗或〖重置〗；若不是，这次战斗中，对手不能用〖力量3000〗以上的单位宣言防御。之后，若那张卡是神蚀卡，将这个单位〖重置〗。将公开的卡按原样放回。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110467',
  fullName: '魔偶姬「斯蒂芬妮」',
  specialName: '斯蒂芬妮',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '学院要塞',
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
  rarity: 'SR',
  availableRarities: ['SR', 'SER', 'UR'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
