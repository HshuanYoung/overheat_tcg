import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import {
  canPutUnitOntoBattlefield,
  createSelectCardQuery,
  discardHandCost,
  isSoulDevourUnit,
  moveCardAsCost,
  ownUnits,
  putUnitOntoField,
  recordUnitSentFromFieldToGrave
} from './BaseUtil';

const redUnitCount = (playerState: any) =>
  ownUnits(playerState).filter(unit => unit.color === 'RED').length;

const deckSoulDevourUnits = (playerState: any) =>
  playerState.deck.filter((card: Card) =>
    isSoulDevourUnit(card) &&
    canPutUnitOntoBattlefield(playerState, card)
  );

const cardEffects: CardEffect[] = [{
  id: '102070371_put_self_from_hand_grave',
  type: 'ACTIVATE',
  triggerLocation: ['HAND', 'GRAVE'],
  limitCount: 1,
  limitNameType: true,
  cost: discardHandCost(1),
  description: '同名1回合1次：你的主要阶段中，若战场上有2个以上红色单位，舍弃1张手牌，将手牌或墓地中的这张卡放置到战场上。',
  condition: (gameState, playerState, instance) =>
    playerState.isTurn &&
    gameState.phase === 'MAIN' &&
    (instance.cardlocation === 'HAND' || instance.cardlocation === 'GRAVE') &&
    redUnitCount(playerState) >= 2 &&
    canPutUnitOntoBattlefield(playerState, instance),
  execute: async (instance, gameState, playerState) => {
    if (
      (instance.cardlocation === 'HAND' || instance.cardlocation === 'GRAVE') &&
      canPutUnitOntoBattlefield(playerState, instance)
    ) {
      putUnitOntoField(gameState, playerState.uid, instance, instance);
    }
  }
}, {
  id: '102070371_self_cost_put_soul_devour',
  type: 'ACTIVATE',
  triggerLocation: ['UNIT'],
  description: '将战场上的这个单位送入墓地：将卡组中1张具有噬魂的单位卡放置到战场上。',
  condition: (_gameState, playerState, instance) =>
    instance.cardlocation === 'UNIT' &&
    playerState.deck.some((card: Card) => isSoulDevourUnit(card)),
  execute: async (instance, gameState, playerState) => {
    moveCardAsCost(gameState, playerState.uid, instance, 'GRAVE', instance);
    recordUnitSentFromFieldToGrave(gameState, playerState.uid, instance);
    const candidates = deckSoulDevourUnits(playerState);
    if (candidates.length === 0) return;
    createSelectCardQuery(
      gameState,
      playerState.uid,
      candidates,
      '选择噬魂单位',
      '选择卡组中的1张具有噬魂的单位卡放置到战场上。',
      1,
      1,
      { sourceCardId: instance.gamecardId, effectId: '102070371_self_cost_put_soul_devour' },
      () => 'DECK'
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections) => {
    const target = playerState.deck.find((card: Card) => card.gamecardId === selections[0] && isSoulDevourUnit(card));
    if (!target || !canPutUnitOntoBattlefield(playerState, target)) return;
    putUnitOntoField(gameState, playerState.uid, target, instance);
    await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'SHUFFLE_DECK' }, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102070371
 * Card2 Row: 561
 * Card Row: 445
 * Source CardNo: BT07-R06
 * Package: BT07(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖同名1回合1次〗{你的主要阶段中，若你的战场上有2个以上红色的单位}[舍弃一张手牌]：将手牌或墓地中的这张单位卡放置到战场上。
 * 【启】[将战场上的这个单位送入墓地]：将你卡组中的1张具有噬魂的单位卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102070371',
  fullName: '「贝缇丝之刃」',
  specialName: '贝缇丝之刃',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '忒碧拉之门',
  acValue: 4,
  power: 3000,
  basePower: 3000,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
