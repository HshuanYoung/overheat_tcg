import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110112
 * Card2 Row: 78
 * Card Row: 78
 * Source CardNo: BT01-Y06
 * Package: BT01(R),ST04(TD)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】:你选择下列的1项效果并执行。之后，失去这个【启】能力。
 * ◆抽1张卡。
 * ◆选择1名玩家，给予他1点伤害。
 * ◆选择你的1张手牌舍弃，选择1个〖力量1500〗以下的单位，将其破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110112',
  fullName: '元素魔法教官',
  specialName: '',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '学院要塞',
  acValue: 3,
  power: 2500,
  basePower: 2500,
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
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT01,ST04',
  uniqueId: null as any,
};

export default card;
