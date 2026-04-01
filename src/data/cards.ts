/// <reference types="vite/client" />
import { Card } from '../types/game';

// Dynamically load all card scripts from the scripts directory
const cardModules = import.meta.glob('../scripts/*.ts', { eager: true });

export const CARD_LIBRARY: Card[] = Object.values(cardModules).map((module: any) => module.default);
