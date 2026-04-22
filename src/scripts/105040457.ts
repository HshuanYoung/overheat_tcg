import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105040457
 * Card2 Row: 345
 * Card Row: 583
 * Source CardNo: PR04-01Y
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：若你的战场上有「Brave Immortal」或「Eternal」和「Guardian Promise」卡，你的战场上的所有<魔王不死传说>单位+2/+2500，并获得【英勇】【歼灭】
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105040457',
  fullName: '伊特诺「Eternal」',
  specialName: 'Eternal',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '魔王不死传说',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isAnnihilation: true,
  isHeroic: true,
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
