import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101130204
 * Card2 Row: 230
 * Card Row: 230
 * Source CardNo: BT03-W05
 * Package: BT03(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】:这个单位进入战场时，若你的战场上有具有【神依】的单位，你可以选择对手战场上的1张非神蚀卡，将其放置到卡组底。
 * 〖0~3〗【永】:你所有的非神蚀单位〖伤害+1〗〖力量+500〗并获得【英勇】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101130204',
  fullName: '战歌的圣少女「蒂雅」',
  specialName: '蒂雅',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '圣王国',
  acValue: 4,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
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
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
