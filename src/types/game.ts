/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CardType = 'UNIT' | 'STORY' | 'ITEM';
export type CardColor = 'RED' | 'WHITE' | 'YELLOW' | 'BLUE' | 'GREEN' | 'NONE';
export type EffectType = '永' | '诱' | '启';
export type EffectLimit = 'ONCE_PER_TURN' | 'MULTI_PER_TURN' | 'ONCE_PER_GAME' | 'MULTI_PER_GAME' | 'UNLIMITED';
export type TriggerLocation = 'HAND' | 'UNIT' | 'ITEM' | 'GRAVE' | 'EXILE' | 'EROSION_FRONT' | 'EROSION_BACK';

export interface CardEffect {
  type: EffectType;
  limit?: EffectLimit;
  erosionFrontLimit?: number; // 0-10
  erosionBackLimit?: number;  // 0-9
  erosionTotalLimit?: number; // 0-10
  playCost?: number;
  playColorReq?: CardColor[];
  triggerLocation?: TriggerLocation[];
  factionReq?: string;
  godUnitReq?: boolean;
  content?: string; // Description of the effect: Move, Draw, Add Power, etc.
  description: string; // Human readable text
}

export interface Card {
  id: string;
  fullName: string;
  specialName?: string;
  type: CardType;
  color: CardColor;
  colorReq: CardColor[];
  acValue: number;
  power?: number;
  damage?: number;
  godMark: boolean;
  isExhausted: boolean;
  canAttack: boolean;
  feijingMark: boolean;
  canReset: boolean;
  effects: CardEffect[];
  imageUrl: string;
  fullImageUrl: string;
  rarity: 'C' | 'U' | 'R' | 'SR' | 'UR' | 'PR';
  faction: string;
}

export interface PlayerState {
  uid: string;
  deck: Card[];
  hand: Card[];
  grave: Card[];
  exile: Card[];
  itemZone: Card[];
  erosionFront: Card[];
  erosionBack: Card[];
  unitZone: (Card | null)[];
  playZone: Card[];
  isTurn: boolean;
  isFirst: boolean;
  displayName: string;
  mulliganDone: boolean;
  hasExhaustedThisTurn: string[];
}

export interface StackItem {
  card: Card;
  ownerUid: string;
  type: 'PLAY' | 'EFFECT';
  effectIndex?: number;
  timestamp: number;
}

export type GamePhase = 'START' | 'DRAW' | 'EROSION' | 'MAIN' | 'BATTLE' | 'END' | 'MULLIGAN' | 'INIT';

export interface GameState {
  gameId: string;
  phase: GamePhase;
  currentTurnPlayer: 0 | 1; // 0 for first, 1 for second
  turnCount: number; // Starts at 1
  isCountering: 0 | 1; // 1 if countering
  counterStack: StackItem[]; // LIFO
  playerIds: [string, string]; // [FirstPlayerID, SecondPlayerID]
  gameStatus: 1 | 2; // 1: Normal, 2: Interrupted
  winReason?: string;
  winnerId?: string;
  logs: string[];
  players: {
    [uid: string]: PlayerState;
  };
}

export interface Deck {
  id: string;
  name: string;
  cards: string[];
  isFavorite: boolean;
  createdAt: number;
}
