import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101150208
 * Card2 Row: 234
 * Card Row: 234
 * Source CardNo: BT03-W09
 * Package: BT03(SR,ESR,OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:若你的放逐区的卡有15张以上，你所有的单位〖伤害+1〗〖力量+500〗并获得【神依】。
 * 〖4~9〗【启】〖1回合1次〗:对手的回合中才可以发动。选择你的侵蚀区的3张正面卡，将其放逐。之后，选择你的1个单位，本回合中，那个单位下一次将要被战斗破坏时，防止那次破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101150208',
  fullName: '神谕的巫女「妮可拉丝」',
  specialName: '妮可拉丝',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '仙雪原',
  acValue: 2,
  power: 500,
  basePower: 500,
  damage: 0,
  baseDamage: 0,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isShenyi: true,
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
