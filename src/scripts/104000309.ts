import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104000309
 * Card2 Row: 539
 * Card Row: 359
 * Source CardNo: BT07-B06
 * Package: BT07(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕2】【启】〖一回合一次〗{你的回合中，你由于卡的效果抽过卡，选择战场上的1张非神蚀卡}[+2]：将被选择的卡破坏。
 * 【OH】【启】〖一回合一次〗{选择战场上1个单位}：将被选择的单位横置，将对方卡组顶的2张卡送入墓地。直到下一次你的回合开始时为止，失去这个【启】能力。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104000309',
  fullName: '圣神八部「摩呼罗迦」',
  specialName: '摩呼罗迦',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '蓝',
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
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
