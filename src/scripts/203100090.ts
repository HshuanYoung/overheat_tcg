import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 203100090
 * Card2 Row: 509
 * Card Row: 332
 * Source CardNo: PR06-09G
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕3】〖同名一回合一次〗{你的主要阶段}：本回合中，你的战场上的所有卡名含有《魔女》的单位〖+1〗并获得“【诱】{这个单位被战斗破坏送入墓地时}：将这张卡以横置状态放置到战场上。”的能力。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '203100090',
  fullName: '魔女之夜',
  specialName: '',
  type: 'STORY',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '艾柯利普斯',
  acValue: 3,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'PR',
  availableRarities: ['PR'],
  cardPackage: '特殊',
  uniqueId: null as any,
};

export default card;
