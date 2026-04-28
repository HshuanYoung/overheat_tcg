import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101130203
 * Card2 Row: 229
 * Card Row: 229
 * Source CardNo: BT03-W04
 * Package: BT03(SR,ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:你的抽卡阶段中，你可以代替通常抽卡，选择你的墓地中的2张卡，放置到卡组底。
 * 〖10+〗【诱】〖1游戏1次〗:[〖支付0费，我方单位区有两个或者以上的白色单位〗，〖侵蚀1〗]对手的回合中，你进入女神化状态时，你可以将这张卡从手牌放置到战场上。之后，将你的侵蚀区中的所有正面卡放逐。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101130203',
  fullName: '天空之白魔术师「琳」',
  specialName: '琳',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '圣王国',
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
  availableRarities: ['SR', 'SER'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
