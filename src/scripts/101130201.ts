import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, createSelectCardQuery, moveCard, ownUnits } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '101130201_recruit',
  type: 'TRIGGER',
  triggerEvent: 'CARD_DESTROYED_BATTLE',
  triggerLocation: ['GRAVE'],
  description: '被战斗破坏并送入墓地时，若你的<圣王国>单位有2个以上，可以从卡组横置放置1张《南征军的步兵》。',
  condition: (_gameState, playerState, instance, event) =>
    event?.targetCardId === instance.gamecardId &&
    instance.cardlocation === 'GRAVE' &&
    ownUnits(playerState).filter(unit => unit.faction === '圣王国').length >= 2 &&
    playerState.deck.some(card => card.id === '101130201'),
  execute: async (instance, gameState, playerState) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      playerState.deck.filter(card => card.id === '101130201'),
      '选择南征军的步兵',
      '选择你的卡组中的1张《南征军的步兵》，将其以横置状态放置到战场上。',
      0,
      1,
      { sourceCardId: instance.gamecardId, effectId: '101130201_recruit' },
      () => 'DECK'
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections) => {
    const target = selections[0] ? playerState.deck.find(card => card.gamecardId === selections[0]) : undefined;
    if (!target) return;
    moveCard(gameState, playerState.uid, target, 'UNIT', instance);
    const moved = AtomicEffectExecutor.findCardById(gameState, target.gamecardId);
    if (moved) moved.isExhausted = true;
    await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'SHUFFLE_DECK' }, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101130201
 * Card2 Row: 227
 * Card Row: 227
 * Source CardNo: BT03-W02
 * Package: BT03(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】:这个单位被战斗破坏并送入墓地时，若你的战场上的<圣王国>单位有2个以上，你可以选择你的卡组中的1张《南征军的步兵》，将其以横置的状态放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101130201',
  fullName: '南征军的步兵',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '圣王国',
  acValue: 2,
  power: 2000,
  basePower: 2000,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
