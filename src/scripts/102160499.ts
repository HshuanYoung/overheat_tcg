import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102160499
 * Card2 Row: 290
 * Card Row: 646
 * Source CardNo: SF01-R01
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖2~7〗【永】:这个单位获得【速攻】，并可以攻击对手的单位。
 * 〖2~7〗【诱】:[〖+1〗]这个单位参与的战斗的伤害判定步骤开始时，你可以中断这次战斗。
 * 〖10+〗【启】〖同名1回合1次〗:[〖侵蚀2〗]这个能力只能在你的回合中发动。选择1个单位，你获得其控制权。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102160499',
  fullName: '蛊惑之主 欧吉尔',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '御庭院',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: '特殊',
  uniqueId: null as any,
};

export default card;
