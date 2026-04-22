import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102060373
 * Card2 Row: 566
 * Card Row: 450
 * Source CardNo: BT07-R11
 * Package: BT07(OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】根据本回合中从战场上送入墓地的单位的数量，这个单位获得以下能力：
 * ◆1个：“【永】：你的战场上的所有单位〖力量+1000〗。”
 * ◆2个：“【永】：这个单位获得【速攻】【英勇】【神依】。”
 * ◆4个：“【永】：你的单位可以攻击对手的单位。”
 * ◆6个：“【启】〖1游戏1次〗{选择战场上的1张卡}：将被选择的卡破坏。”
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102060373',
  fullName: '炎雷之舞「塔米」',
  specialName: '塔米',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '雷霆',
  acValue: 5,
  power: 3000,
  basePower: 3000,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: true,
  isHeroic: true,
  isShenyi: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'UR',
  availableRarities: ['UR'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
