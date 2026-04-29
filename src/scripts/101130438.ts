import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, canPutUnitOntoBattlefield, createSelectCardQuery, putUnitOntoField } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '101130438_reset_recruit',
  type: 'TRIGGER',
  triggerEvent: 'CARD_ROTATED',
  triggerLocation: ['UNIT'],
  limitCount: 1,
  limitNameType: true,
  description: '同名1回合1次：这个单位因为卡的效果被重置时，可以从卡组将1张《殿堂勇士》放置到战场。',
  condition: (_gameState, playerState, instance, event) =>
    event?.targetCardId === instance.gamecardId &&
    event.data?.direction === 'VERTICAL' &&
    !!event.data?.effectSourceCardId &&
    playerState.deck.some(card => card.fullName === '殿堂勇士' && canPutUnitOntoBattlefield(playerState, card)),
  execute: async (instance, gameState, playerState) => {
    const candidates = playerState.deck.filter(card => card.fullName === '殿堂勇士' && canPutUnitOntoBattlefield(playerState, card));
    createSelectCardQuery(gameState, playerState.uid, candidates, '选择殿堂勇士', '选择卡组中的1张《殿堂勇士》放置到战场。', 0, 1, {
      sourceCardId: instance.gamecardId,
      effectId: '101130438_reset_recruit'
    }, () => 'DECK');
  },
  onQueryResolve: async (instance, gameState, playerState, selections) => {
    const selected = selections[0] ? AtomicEffectExecutor.findCardById(gameState, selections[0]) : undefined;
    if (selected?.cardlocation !== 'DECK') return;
    putUnitOntoField(gameState, playerState.uid, selected, instance);
    await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'SHUFFLE_DECK' }, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101130438
 * Card2 Row: 315
 * Card Row: 554
 * Source CardNo: BT04-W04
 * Package: BT04(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖同名1回合1次〗：这个单位因为卡的效果而被重置时，你可以选择你的卡组中的一张《殿堂勇士》，将其放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101130438',
  fullName: '殿堂勇士',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: {},
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
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
