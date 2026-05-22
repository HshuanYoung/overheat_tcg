import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import { canPutUnitOntoBattlefield, createSelectCardQuery, putUnitOntoField } from './BaseUtil';

const goblinDeckCandidates = (playerState: any) =>
  playerState.deck.filter((card: Card) =>
    card.id === '102060320' &&
    canPutUnitOntoBattlefield(playerState, card)
  );

const cardEffects: CardEffect[] = [{
  id: '102060320_cost_grave_put_copy',
  type: 'TRIGGER',
  triggerLocation: ['UNIT', 'GRAVE'],
  triggerEvent: 'CARD_LEFT_ZONE',
  description: '这个单位由于卡的能力费用从战场送入墓地时，将卡组中1张《炎雷小妖》以横置状态放置到战场上。',
  condition: (gameState, playerState, instance, event) =>
    event?.sourceCardId === instance.gamecardId &&
    event.playerUid === playerState.uid &&
    event.data?.zone === 'UNIT' &&
    event.data?.targetZone === 'GRAVE' &&
    (instance as any).data?.lastMovedAsCostTurn === gameState.turnCount &&
    goblinDeckCandidates(playerState).length > 0,
  execute: async (instance, gameState, playerState) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      goblinDeckCandidates(playerState),
      '选择炎雷小妖',
      '选择卡组中的1张《炎雷小妖》以横置状态放置到战场上。',
      1,
      1,
      { sourceCardId: instance.gamecardId, effectId: '102060320_cost_grave_put_copy' },
      () => 'DECK'
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections) => {
    const target = playerState.deck.find((card: Card) => card.gamecardId === selections[0] && card.id === '102060320');
    if (!target || !canPutUnitOntoBattlefield(playerState, target)) return;
    putUnitOntoField(gameState, playerState.uid, target, instance, { exhausted: true });
    const moved = AtomicEffectExecutor.findCardById(gameState, target.gamecardId);
    if (moved) moved.isExhausted = true;
    await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'SHUFFLE_DECK' }, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102060320
 * Card2 Row: 557
 * Card Row: 377
 * Source CardNo: BT07-R02
 * Package: BT07(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{这个单位由于卡的能力的费用从战场上送入墓地时}：将你的卡组中的1张《炎雷小妖》以横置状态放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102060320',
  fullName: '炎雷小妖',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: {},
  faction: '雷霆',
  acValue: 1,
  power: 1000,
  basePower: 1000,
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
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
