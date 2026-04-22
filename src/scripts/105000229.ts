import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105000229
 * Card2 Row: 393
 * Card Row: 263
 * Source CardNo: BT05-Y07
 * Package: BT05(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖同名1回合1次〗{这个单位进入战场时，或这个单位从战场离开时}:将卡组中的1张ACCESS值+1以下的黄色道具卡放置到战场上。
 * 【启】〖同名1回合1次〗{选择你的战场上的1张道具卡}:将被选择的卡破坏。之后，选择1名对手，他可以选择他的1张手牌舍弃。若不舍弃，你将卡组中的1张卡名含有《怪盗》的卡加入手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105000229',
  fullName: '天变的魔术家「追月」',
  specialName: '追月',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '无',
  acValue: 4,
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
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT05',
  uniqueId: null as any,
};

export default card;
