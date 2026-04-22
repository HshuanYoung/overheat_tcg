import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102000372
 * Card2 Row: 562
 * Card Row: 446
 * Source CardNo: BT07-R07
 * Package: BT07(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖1回合1次〗{对手战场上的单位由于你的卡的效果破坏时}：给予所有对手2点伤害。
 * 【OH】【启】〖1回合1次〗{选择战场上1张非神蚀卡}[舍弃1张手牌]：将被选择卡破坏。直到下一次你的回合开始时为止，失去这个【启】能力。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102000372',
  fullName: '圣神八部「阿修罗」',
  specialName: '阿修罗',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
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
