import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103080184
 * Card2 Row: 197
 * Card Row: 197
 * Source CardNo: BT03-G06
 * Package: BT03(SR,ESR,OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】:你的回合结束时，选择你的卡组或墓地中的1张卡名含有《降灵》的卡，将其加入手牌。
 * 〖2~4〗【永】:你的所有卡名含有《图腾》的单位卡获得“【启】:[舍弃2张手牌]这个能力只能从墓地发动，将这张卡放置到战场上。”的能力。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103080184',
  fullName: '神木大灵萨「温多娜」',
  specialName: '温多娜',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 2 },
  faction: '神木森',
  acValue: 2,
  power: 500,
  basePower: 500,
  damage: 0,
  baseDamage: 0,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR', 'SER', 'UR'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
