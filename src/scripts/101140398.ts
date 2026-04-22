import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101140398
 * Card2 Row: 608
 * Card Row: 492
 * Source CardNo: BT08-W04
 * Package: BT08(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕1】【启】〖1回合1次〗{选择战场上的1个非神蚀单位}[舍弃2张手牌]:将被选择的单位放逐。本回合结束时，将其放置到战场上。
 * 〖0~4〗【永】:这个单位〖力量+500〗并获得【英勇】
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101140398',
  fullName: '菲之使徒「杜鲁」',
  specialName: '杜鲁',
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
  isHeroic: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
