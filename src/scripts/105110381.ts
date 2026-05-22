import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import { createSelectCardQuery, enteredFromHand, exhaustCost, moveCard, nameContains } from './BaseUtil';

const blueprintItems = (playerState: any) =>
  playerState.deck.filter((card: Card) =>
    card.type === 'ITEM' &&
    nameContains(card, '蓝图')
  );

const cardEffects: CardEffect[] = [{
  id: '105110381_hand_enter_search_blueprint_item',
  type: 'TRIGGER',
  triggerLocation: ['UNIT'],
  triggerEvent: 'CARD_ENTERED_ZONE',
  limitCount: 1,
  limitNameType: true,
  cost: exhaustCost,
  description: '同名1回合1次：从手牌进入战场时，横置这张卡，从卡组将1张卡名含有《蓝图》的道具卡加入手牌。',
  condition: (_gameState, playerState, instance, event) =>
    instance.cardlocation === 'UNIT' &&
    event?.sourceCardId === instance.gamecardId &&
    event.data?.zone === 'UNIT' &&
    enteredFromHand(instance, event) &&
    !instance.isExhausted &&
    blueprintItems(playerState).length > 0,
  execute: async (instance, gameState, playerState) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      blueprintItems(playerState),
      '选择蓝图道具',
      '从你的卡组选择1张卡名含有《蓝图》的道具卡加入手牌。',
      1,
      1,
      { sourceCardId: instance.gamecardId, effectId: '105110381_hand_enter_search_blueprint_item' },
      () => 'DECK'
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections) => {
    const selected = selections[0] ? AtomicEffectExecutor.findCardById(gameState, selections[0]) : undefined;
    if (!selected || selected.cardlocation !== 'DECK' || selected.type !== 'ITEM' || !nameContains(selected, '蓝图')) return;
    moveCard(gameState, playerState.uid, selected, 'HAND', instance);
    await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'SHUFFLE_DECK' }, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110381
 * Card2 Row: 578
 * Card Row: 462
 * Source CardNo: BT07-Y01
 * Package: BT07(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖同名1回合1次〗{这个单位从手牌进入战场时}[〖横置〗]:你可以将你的卡组中的1张卡名含有《蓝图》的道具卡加入手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110381',
  fullName: '蓝图绘师',
  specialName: '',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: {},
  faction: '学院要塞',
  acValue: 2,
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
