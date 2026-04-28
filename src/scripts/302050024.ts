import { Card, CardEffect } from '../types/game';
import { addInfluence, ownUnits, ownerOf } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '302050024_ten_rush',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  erosionTotalLimit: [10, 10],
  description: '10+：你的所有单位获得速攻。',
  applyContinuous: (gameState, instance) => {
    const owner = ownerOf(gameState, instance);
    if (!owner) return;
    ownUnits(owner).forEach(unit => {
      unit.isrush = true;
      addInfluence(unit, instance, '获得效果: 【速攻】');
    });
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 302050024
 * Card2 Row: 140
 * Card Row: 140
 * Source CardNo: BT02-R17
 * Package: BT02(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖10+〗【永】:你的所有单位获得【速攻】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '302050024',
  fullName: '「伊列宇大石碑」',
  specialName: '伊列宇大石碑',
  type: 'ITEM',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '伊列宇王国',
  acValue: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
