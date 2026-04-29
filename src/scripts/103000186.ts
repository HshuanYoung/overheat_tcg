import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, createSelectCardQuery, moveCard, moveCardAsCost, ownUnits, revealDeckCards } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '103000186_mill_top10',
  type: 'ACTIVATE',
  triggerLocation: ['HAND'],
  description: '主要阶段，支付0费且我方绿色单位2个以上，舍弃手牌中的这张卡：检视卡组顶10张，选择1张送入墓地，然后洗切。',
  condition: (gameState, playerState) =>
    gameState.phase === 'MAIN' &&
    playerState.isTurn &&
    ownUnits(playerState).filter(unit => unit.color === 'GREEN').length >= 2 &&
    playerState.deck.length > 0,
  cost: async (gameState, playerState, instance) => {
    moveCardAsCost(gameState, playerState.uid, instance, 'GRAVE', instance);
    return true;
  },
  execute: async (instance, gameState, playerState) => {
    const cards = revealDeckCards(gameState, playerState.uid, Math.min(10, playerState.deck.length), instance);
    createSelectCardQuery(
      gameState,
      playerState.uid,
      cards,
      '选择送入墓地的卡',
      '从检视的卡中选择1张送入墓地。其余按原样放回后洗切。',
      1,
      1,
      { sourceCardId: instance.gamecardId, effectId: '103000186_mill_top10' },
      () => 'DECK'
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections) => {
    const target = selections[0] ? playerState.deck.find(card => card.gamecardId === selections[0]) : undefined;
    if (target) moveCard(gameState, playerState.uid, target, 'GRAVE', instance);
    await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'SHUFFLE_DECK' }, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103000186
 * Card2 Row: 199
 * Card Row: 199
 * Source CardNo: BT03-G08
 * Package: BT03(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】:[〖支付0费，我方单位区有2个或者以上的绿色单位〗，舍弃手牌中的这张卡]这个能力只能在你的主要阶段中从手牌发动。检视你的卡组顶的10张卡。你从中选择1张卡，将其送入墓地。将查看的其余的卡按原样放回，将你的卡组洗切。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103000186',
  fullName: '林中隐士',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 1,
  power: 500,
  basePower: 500,
  damage: 0,
  baseDamage: 0,
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
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
