import { Card, CardEffect } from '../types/game';
import { addContinuousPower, ownUnits, totalErosionCount } from './BaseUtil';

const SHINBOKU = '神木森';

const isShinbokuUnit = (card: Card) =>
  card.type === 'UNIT' &&
  (
    String(card.faction || '').includes(SHINBOKU) ||
    card.fullName.includes(SHINBOKU)
  );

const cardEffects: CardEffect[] = [{
  id: '303000052_grave_protection',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  protectOwnGraveFromOpponentEffects: true,
  description: '你的墓地中的卡不会成为对手卡的效果对象，且不会由于对手卡的效果移动到其他区域。'
}, {
  id: '303000052_shinboku_power',
  type: 'CONTINUOUS',
  triggerLocation: ['ITEM'],
  description: '1~5：你战场上的<神木森>单位力量+500。',
  applyContinuous: (gameState, instance) => {
    const owner = Object.values(gameState.players).find(player =>
      player.itemZone.some(item => item?.gamecardId === instance.gamecardId)
    );
    if (!owner || totalErosionCount(owner) < 1 || totalErosionCount(owner) > 5) return;
    ownUnits(owner).filter(isShinbokuUnit).forEach(unit => addContinuousPower(unit, instance, 500));
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 303000052
 * Card2 Row: 554
 * Card Row: 374
 * Source CardNo: BT07-G10
 * Package: BT07(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：你墓地中的卡不会成为对手的卡的效果的对象，且不会由于对手的卡的效果移动到其他区域。
 * 【2~5】【永】：你的战场上的<神木森>单位〖力量+500〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '303000052',
  fullName: '寂静的圣域',
  specialName: '',
  type: 'ITEM',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
