import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import { cardsInZones, moveCard, resonanceEffect, selectFromEntries } from './BaseUtil';

const SERNOBU = '瑟诺布';

const sernobuNonGodDeckEntries = (playerState: any) =>
  cardsInZones(playerState, ['DECK'])
    .filter(({ card }) =>
      !card.godMark &&
      (
        String(card.faction || '').includes(SERNOBU) ||
        card.fullName.includes(SERNOBU) ||
        card.specialName?.includes(SERNOBU)
      )
    );

const cardEffects: CardEffect[] = [
  resonanceEffect('103090311_resonance'),
  {
    id: '103090311_mill_sernobu_after_grave_exile',
    type: 'TRIGGER',
    triggerLocation: ['UNIT'],
    triggerEvent: 'CARD_EXILED',
    limitCount: 1,
    description: '1回合1次：你墓地中的卡被放逐时，可以将卡组中1张<瑟诺布>非神蚀卡送入墓地。',
    condition: (_gameState, playerState, _instance, event) =>
      event?.playerUid === playerState.uid &&
      event.data?.sourceZone === 'GRAVE' &&
      event.data?.targetZone === 'EXILE' &&
      sernobuNonGodDeckEntries(playerState).length > 0,
    execute: async (instance, gameState, playerState) => {
      selectFromEntries(
        gameState,
        playerState.uid,
        sernobuNonGodDeckEntries(playerState),
        '选择瑟诺布卡',
        '选择卡组中1张<瑟诺布>非神蚀卡送入墓地。',
        1,
        1,
        { sourceCardId: instance.gamecardId, effectId: '103090311_mill_sernobu_after_grave_exile' }
      );
    },
    onQueryResolve: async (instance, gameState, playerState, selections) => {
      const target = playerState.deck.find((card: Card) => card.gamecardId === selections[0]);
      if (!target || target.godMark) return;
      moveCard(gameState, playerState.uid, target, 'GRAVE', instance);
      await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'SHUFFLE_DECK' }, instance);
    }
  }
];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103090311
 * Card2 Row: 545
 * Card Row: 365
 * Source CardNo: BT07-G01
 * Package: BT07(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】共鸣〖1回合1次〗{你的主要阶段，选择你的墓地中的1张卡}:将被选择的卡放逐。
 * 【诱】〖1回合1次〗{你墓地中的卡被放逐时}:你可以将你卡组中的1张<瑟诺布>的非神蚀卡送入墓地。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103090311',
  fullName: '「瑟诺布长老」',
  specialName: '瑟诺布长老',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '瑟诺布',
  acValue: 3,
  power: 2500,
  basePower: 2500,
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
