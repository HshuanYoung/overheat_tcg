import { Card, CardEffect } from '../types/game';
import { getBattlefieldUnits, markDeclarationTax } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '301000027_rush_tax',
  type: 'CONTINUOUS',
  description: '具有速攻的单位宣言攻击或防御需要其控制者支付1费。',
  applyContinuous: (gameState, instance) => {
    getBattlefieldUnits(gameState)
      .filter(unit => unit.isrush)
      .forEach(unit => markDeclarationTax(unit, instance, 1));
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 301000027
 * Card2 Row: 157
 * Card Row: 157
 * Source CardNo: BT02-W17
 * Package: BT02(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:具有【速攻】的单位的控制者需要支付〖1费〗才能选择那些单位宣言攻击或防御。（若不支付，则不能进行这次宣言。）
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '301000027',
  fullName: '扎马钉',
  specialName: '',
  type: 'ITEM',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '无',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
