import { Card, GameState } from '../types/game';

// use import.meta.glob to load all scripts from ../scripts
const modules = import.meta.glob('../scripts/*.ts', { eager: true });

export const CARD_LIBRARY: Record<string, Card> = {};

// Process modules to fill the library
Object.keys(modules).forEach((path) => {
  const mod = modules[path] as any;
  if (mod.default && mod.default.id) {
    CARD_LIBRARY[mod.default.id] = mod.default;
  }
});

export function hydrateCard(card: Card | null) {
  if (!card || !card.id) return;
  const masterCard = CARD_LIBRARY[card.id];
  if (masterCard && masterCard.effects) {
    // Re-assign effects to restore functions lost during JSON serialization
    card.effects = masterCard.effects.map((originalEffect, idx) => {
      const runtimeEffect = card.effects ? card.effects[idx] : null;
      return {
        ...(runtimeEffect || originalEffect),
        condition: originalEffect.condition,
        execute: originalEffect.execute,
        cost: originalEffect.cost,
        resolve: originalEffect.resolve
      };
    });
  }
}

export function hydrateGameState(gameState: GameState) {
  if (!gameState || !gameState.players) return;

  Object.values(gameState.players).forEach(player => {
    const zones = [
        player.hand, player.deck, player.grave, player.exile,
        player.unitZone, player.itemZone, player.erosionFront, player.erosionBack, player.playZone
    ];
    zones.forEach(zone => {
      zone.forEach(card => {
        if (card) hydrateCard(card);
      });
    });
  });

  // Also hydrate cards in the counter stack
  if (gameState.counterStack) {
    gameState.counterStack.forEach(item => {
      if (item.card) hydrateCard(item.card);
    });
  }

  // Also hydrate cards in pending query options
  if (gameState.pendingQuery && gameState.pendingQuery.options) {
    gameState.pendingQuery.options.forEach(opt => {
      if (opt.card) hydrateCard(opt.card);
    });
  }
}
