import fs from 'fs';
import path from 'path';
import { Card } from '../src/types/game';

const SCRIPTS_DIR = path.join(process.cwd(), 'src', 'scripts');

export async function loadServerCards(): Promise<Card[]> {
  const cards: Card[] = [];
  const files = fs.readdirSync(SCRIPTS_DIR);
  
  for (const file of files) {
    if (file.endsWith('.ts')) {
      // Use tsx or dynamic import to load the ts card script
      const cardModule = await import(`../src/scripts/${file}`);
      if (cardModule.default) {
        cards.push(cardModule.default);
      }
    }
  }
  return cards;
}

// Map by card ID for fast lookup
export let SERVER_CARD_LIBRARY: Record<string, Card> = {};

export async function initServerCardLibrary() {
  const cards = await loadServerCards();
  for (const c of cards) {
    SERVER_CARD_LIBRARY[c.id] = c;
  }
  console.log(`[Server] Loaded ${cards.length} cards into library.`);
}
