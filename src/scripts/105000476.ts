import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105000476
 * Card2 Row: 252
 * Card Row: 608
 * Source CardNo: BT03-Y10
 * Package: BT03(SR,ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:若对手的手牌在2张以下，这个单位获得【英勇】【神依】。
 * 【启】〖1回合1次〗:这个能力只能在你的主要阶段中发动。若对手的手牌有3张以上，选择你的战场上的1张道具卡，将其破坏。之后，选择1名对手，那名对手选择他自己的1张手牌舍弃，并给予那名对手1点伤害。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105000476',
  fullName: '惊奇的魔术家「库因塔」',
  specialName: '库因塔',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '无',
  acValue: 4,
  power: 3500,
  basePower: 3500,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isHeroic: true,
  isShenyi: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR', 'SER'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
