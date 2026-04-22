import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050363
 * Card2 Row: 493
 * Card Row: 436
 * Source CardNo: BT06-R01
 * Package: BT06(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{这个单位进入战场时，或这个单位从战场上离开时}：你可以将你的卡组或墓地中的1张《追迹》或《探寻》加入手牌。
 * 【创痕3】〖OH〗【启】〖1游戏1次〗{所有对手的卡组中的卡的数量在10张以下，你的战场上有「柯莉尔」和「赛利亚」单位，且你的放逐区中的《追迹》和《探寻》合计有8张}：你获得这场游戏的胜利。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050363',
  fullName: '追迹探寻「迪凯」',
  specialName: '迪凯',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '伊列宇王国',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 1,
  baseDamage: 1,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
