import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101140347
 * Card2 Row: 481
 * Card Row: 414
 * Source CardNo: BT06-W11
 * Package: BT06(OHR)，特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：由于卡名含有《神仪》的卡的效果进入战场的这个单位获得
 * “【诱】{这个单位从战场上离开时，选择1名对手}：将被选择的玩家的卡组顶的2张卡放逐，恢复2（随机选择你的墓地中的2张卡，将其放置到你的卡组底）。”
 * 和“【启】〖1回合1次〗{只能在对抗对手使用卡的宣言时发动}[将这个单位放逐]：反击那张卡。”的能力。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101140347',
  fullName: '菲之使徒「莉薇安」',
  specialName: '莉薇安',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '女神教会',
  acValue: 5,
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
  availableRarities: ['UR', 'PR'],
  cardPackage: 'BT06，特殊',
  uniqueId: null as any,
};

export default card;
