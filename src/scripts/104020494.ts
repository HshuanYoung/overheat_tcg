import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104020494
 * Card2 Row: 284
 * Card Row: 640
 * Source CardNo: PR03-03B
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】:[〖横置〗]选择1名玩家的侵蚀区中的1张正面卡，将其送入墓地。之后，将他的卡组顶的1张卡放置到侵蚀区。 
 * 〖4~6〗【启】〖同名1回合1次〗:[〖横置〗]选择1名玩家抽2张卡，之后，那名玩家选择他自己的1张手牌，放置到侵蚀区。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104020494',
  fullName: '老练的狐族商人pr',
  specialName: '',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '九尾商会联盟',
  acValue: 2,
  power: 1500,
  basePower: 1500,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'PR',
  availableRarities: ['PR'],
  cardPackage: '特殊',
  uniqueId: null as any,
};

export default card;
