/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { socket } from '../socket';
import { GameState, Card, CardEffect, TriggerLocation } from '../types/game';

/**
 * GameService (Frontend Proxy)
 * 
 * This service acts as a proxy to the server. 
 * Rule logic is handled by ServerGameService on the backend.
 */
export const GameService = {
  // --- Socket Proxy Actions ---

  async advancePhase(gameId: string, action?: any) {
    console.log(gameId);
    socket.emit('gameAction', { gameId, action: 'END_PHASE', payload: action });
  },

  async performMulligan(gameId: string, cardIds: string[]) {
    socket.emit('gameAction', { gameId, action: 'MULLIGAN', payload: cardIds });
  },

  async playCard(gameId: string, playerId: string, cardId: string, paymentSelection: any) {
    socket.emit('gameAction', { gameId, action: 'PLAY_CARD', payload: { cardId, paymentSelection } });
  },

  async declareAttack(gameId: string, playerId: string, attackerIds: string[], isAlliance: boolean) {
    socket.emit('gameAction', { gameId, action: 'ATTACK', payload: { attackerIds, isAlliance } });
  },

  async declareDefense(gameId: string, playerId: string, defenderId?: string) {
    socket.emit('gameAction', { gameId, action: 'DEFEND', payload: { defenderId } });
  },

  async resolvePlay(gameId: string) {
    socket.emit('gameAction', { gameId, action: 'RESOLVE_PLAY' });
  },

  async resolveDamage(gameId: string) {
    socket.emit('gameAction', { gameId, action: 'RESOLVE_DAMAGE' });
  },


  async handleErosionChoice(gameId: string, playerId: string, choice: 'A' | 'B' | 'C', selectedCardId?: string) {
    socket.emit('gameAction', { gameId, action: 'EROSION_CHOICE', payload: { choice, selectedCardId } });
  },

  async discardCard(gameId: string, playerId: string, cardId: string) {
    socket.emit('gameAction', { gameId, action: 'DISCARD', payload: { cardId } });
  },

  // --- Local UI Utilities ---
  canPlayCard(player: any, card: Card) {
    if (!player || !card) return { canPlay: false };
    const cost = card.acValue || 0;
    const currentErosion = (player.erosionFront?.filter((c: any) => c !== null).length || 0);
    return { canPlay: currentErosion >= cost };
  },


  checkEffectLimitsAndReqs(game: GameState | null, playerUid: string, card: Card, effect: CardEffect, triggerLocation: TriggerLocation) {
    return true; // Simplified for UI
  },

  recordEffectUsage(game: GameState | null, playerUid: string, card: Card, effect: CardEffect) {
    // Persistent usage recorded on server
  }
};
