import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110108
 * Card2 Row: 74
 * Card Row: 74
 * Source CardNo: BT01-Y02
 * Package: BT01(U)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖同名1回合1次〗:这个能力只能在你的主要阶段中发动。宣言1个卡名，将你的卡组顶的1张卡送入墓地。若那张卡的卡名和宣言一致，你可以选择你的墓地中的2张卡，放置到卡组底。
 * 〖3~5〗【永】:这个单位+1/+500。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110108',
  fullName: '治疗术学徒',
  specialName: '',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: {},
  faction: '学院要塞',
  acValue: 1,
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
  rarity: 'U',
  availableRarities: ['U'],
  cardPackage: 'BT01',
  uniqueId: null as any,
};

export default card;
