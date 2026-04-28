import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 203100049
 * Card2 Row: 118
 * Card Row: 118
 * Source CardNo: BT02-G12
 * Package: BT02(SR,ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕3】选择对手的1个单位，你得到其控制权。只要你控制着那个单位，那个单位同时也视为卡名含有《魔女》的单位。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '203100049',
  fullName: '魔女凭依',
  specialName: '',
  type: 'STORY',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 3 },
  faction: '艾柯利普斯',
  acValue: 7,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR', 'SER'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
