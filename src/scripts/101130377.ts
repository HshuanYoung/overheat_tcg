import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101130377
 * Card2 Row: 570
 * Card Row: 454
 * Source CardNo: BT07-W04
 * Package: BT07(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：这个单位在每个回合中第一次将要被战斗破坏时，放止那次破坏。
 * 【诱】〖1回合1次〗{这个单位宣言非联军攻击时}：你可以将你卡组中1张《王国重骑》以外的的ACCESS值+3以下的<圣王国>非神蚀单位卡以横置状态放置到战场上。这次战斗中，那个单位视为正在与这个单位进行联军攻击。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101130377',
  fullName: '王国重骑',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '圣王国',
  acValue: 3,
  power: 1000,
  basePower: 1000,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
