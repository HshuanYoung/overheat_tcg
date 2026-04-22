import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101140345
 * Card2 Row: 475
 * Card Row: 408
 * Source CardNo: BT06-W05
 * Package: BT06(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】{你的战场上有由于卡名含有《神仪》的卡的效果放置到战场上的单位}：这个单位〖伤害+1〗〖力量+1000〗且不会被战斗破坏。
 * 【创痕1】（你的侵蚀区中的背面卡有1张以上时才有效）【启】〖1游戏1次〗{你的主要阶段}[展示你手牌中的1张卡名含有《神仪》的故事卡]：将你的手牌、卡组、墓地中最多3张《黎明教众》以横置状态放置到战场上。回合结束时，将其放逐。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101140345',
  fullName: '「暮城教区长」',
  specialName: '暮城教区长',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '女神教会',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
