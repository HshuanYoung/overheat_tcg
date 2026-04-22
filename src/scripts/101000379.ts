import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101000379
 * Card2 Row: 572
 * Card Row: 456
 * Source CardNo: BT07-W06
 * Package: BT07(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{这个单位被战斗破坏或由于卡的效果离开战场时}：将你墓地中的1张卡名含有《神仪》的卡加入手牌。
 * 【启】〖1回合1次〗{若这个单位由于卡名含有《神仪》的卡的效果进入战场，你的主要阶段，选择战场上1个ACCESS值+3以下的非神蚀单位}[AC+1]：直到对手回合结束时为止，将被选择的单位冻结。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101000379',
  fullName: '「小雪女」',
  specialName: '小雪女',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '无',
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
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
