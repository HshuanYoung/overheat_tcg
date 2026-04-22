import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 304020067
 * Card2 Row: 635
 * Card Row: 519
 * Source CardNo: BT08-B09
 * Package: BT08(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{你的财富指示物有15个以上，你的回合结束时}:你获得这场游戏的胜利。
 * 【诱】{对手以抽卡以外的方式从卡组将卡加入手牌时}:将那名对手的卡组顶的2张卡送入墓地。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '304020067',
  fullName: '「财富的马车」',
  specialName: '财富的马车',
  type: 'ITEM',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: {},
  faction: '九尾商会联盟',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
