import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101140152
 * Card2 Row: 142
 * Card Row: 142
 * Source CardNo: BT02-W02
 * Package: BT02(SR,ESR,OHR),BT05(FVR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】:[〖横置〗]选择对手的1个神蚀单位，直到对手的回合结束时为止，那个单位不能发动能力，不能宣言攻击和防御。
 * 〖10+〗【启】〖1回合1次〗:[〖侵蚀2〗]选择战场上的1个正在进行攻击的神蚀单位，将其放置到其持有者的卡组底。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101140152',
  fullName: '未来先读「莉薇安」',
  specialName: '莉薇安',
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
  availableRarities: ['SR', 'SER'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
