import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 205000085
 * Card2 Row: 394
 * Card Row: 264
 * Source CardNo: BT05-Y08
 * Package: BT05(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖同名1回合1次〗{选择你的战场上的1个卡名含有《怪盗》或《魔术家》的单位}:将你的战场上的1张道具卡破坏。之后，将被选择的单位〖重置〗，选择对手的1个单位，将其〖横置〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '205000085',
  fullName: '怪盗？魔术？钟结！',
  specialName: '',
  type: 'STORY',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '无',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT05',
  uniqueId: null as any,
};

export default card;
