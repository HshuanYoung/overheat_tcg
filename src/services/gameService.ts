import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { GameState, PlayerState, Card, Deck } from '../types/game';
import { CARD_LIBRARY } from '../data/cards';

const GAMES_COLLECTION = 'games';

export const GameService = {
  // Validate deck: 50 cards, max 10 God Mark, max 4 per card
  validateDeck(cards: Card[]): { valid: boolean; error?: string } {
    if (cards.length !== 50) {
      return { valid: false, error: `卡组必须正好为 50 张卡牌 (当前: ${cards.length})` };
    }
    const godMarkCount = cards.filter(c => c.godMark).length;
    if (godMarkCount > 10) {
      return { valid: false, error: `卡组中带有神蚀标记的卡牌不能超过 10 张 (当前: ${godMarkCount})` };
    }

    // Check for max 4 of each card
    const counts: { [id: string]: number } = {};
    for (const card of cards) {
      counts[card.id] = (counts[card.id] || 0) + 1;
      if (counts[card.id] > 4) {
        return { valid: false, error: `同名卡牌 [${card.fullName}] 在卡组中不能超过 4 张` };
      }
    }

    return { valid: true };
  },

  // Create a new game and wait for opponent
  async createGame(deck: Card[]) {
    if (!auth.currentUser) throw new Error('Not authenticated');
    
    const validation = this.validateDeck(deck);
    if (!validation.valid) throw new Error(validation.error);

    const gameId = Math.random().toString(36).substring(7);
    const initialPlayerState: PlayerState = {
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName || 'Player 1',
      deck: this.shuffle([...deck]),
      hand: [],
      grave: [],
      exile: [],
      itemZone: [],
      erosionFront: [],
      erosionBack: [],
      unitZone: Array(6).fill(null),
      playZone: [],
      isTurn: false,
      isFirst: true,
      mulliganDone: false,
      hasExhaustedThisTurn: [],
    };

    // Initial Draw 4
    for (let i = 0; i < 4; i++) {
      const card = initialPlayerState.deck.pop();
      if (card) initialPlayerState.hand.push(card);
    }

    const gameState: GameState = {
      gameId,
      phase: 'INIT',
      currentTurnPlayer: 0,
      turnCount: 0,
      isCountering: 0,
      counterStack: [],
      playerIds: [auth.currentUser.uid, ''],
      gameStatus: 1,
      logs: ['游戏已创建。等待对手加入...'],
      players: {
        [auth.currentUser.uid]: initialPlayerState
      }
    };

    await setDoc(doc(db, GAMES_COLLECTION, gameId), {
      ...gameState,
      status: 'WAITING',
      createdAt: Date.now()
    });
    return gameId;
  },

  // Create a practice game with a bot
  async createPracticeGame(deck: Card[]) {
    if (!auth.currentUser) throw new Error('Not authenticated');
    
    const validation = this.validateDeck(deck);
    if (!validation.valid) throw new Error(validation.error);

    const gameId = 'practice_' + Math.random().toString(36).substring(7);
    const myState: PlayerState = {
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName || 'Player 1',
      deck: this.shuffle([...deck]),
      hand: [],
      grave: [],
      exile: [],
      itemZone: [],
      erosionFront: [],
      erosionBack: [],
      unitZone: Array(6).fill(null),
      playZone: [],
      isTurn: false,
      isFirst: false,
      mulliganDone: false,
      hasExhaustedThisTurn: [],
    };

    const botState: PlayerState = {
      uid: 'BOT_PLAYER',
      displayName: '神蚀 AI',
      deck: this.shuffle([...CARD_LIBRARY.slice(0, 50)]), // Bot uses first 50 cards
      hand: [],
      grave: [],
      exile: [],
      itemZone: [],
      erosionFront: [],
      erosionBack: [],
      unitZone: Array(6).fill(null),
      playZone: [],
      isTurn: false,
      isFirst: false,
      mulliganDone: true, // Bot skips mulligan
      hasExhaustedThisTurn: [],
    };

    // Initial Draw 4 for both
    for (let i = 0; i < 4; i++) {
      const card1 = myState.deck.pop();
      if (card1) myState.hand.push(card1);
      const card2 = botState.deck.pop();
      if (card2) botState.hand.push(card2);
    }

    // Random first player
    const uids = [auth.currentUser.uid, 'BOT_PLAYER'];
    const firstIdx = Math.floor(Math.random() * uids.length) as 0 | 1;
    const firstPlayerUid = uids[firstIdx];
    
    myState.isFirst = firstPlayerUid === myState.uid;
    botState.isFirst = firstPlayerUid === botState.uid;

    const gameState: GameState = {
      gameId,
      phase: 'MULLIGAN',
      currentTurnPlayer: firstIdx,
      turnCount: 0,
      isCountering: 0,
      counterStack: [],
      playerIds: [uids[0], uids[1]],
      gameStatus: 1,
      logs: ['练习赛开始。请进行调度 (Mulligan)。'],
      players: {
        [auth.currentUser.uid]: myState,
        'BOT_PLAYER': botState
      }
    };

    await setDoc(doc(db, GAMES_COLLECTION, gameId), {
      ...gameState,
      status: 'ACTIVE',
      createdAt: Date.now()
    });
    return gameId;
  },

  // Mulligan action
  async performMulligan(gameId: string, cardIdsToReturn: string[]) {
    const gameRef = doc(db, GAMES_COLLECTION, gameId);
    const gameSnap = await getDoc(gameRef);
    if (!gameSnap.exists()) return;
    
    const game = gameSnap.data() as GameState;
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    
    const player = game.players[uid];
    if (player.mulliganDone) return;

    if (cardIdsToReturn.length > 0) {
      // Return cards to bottom of deck
      const cardsToReturn: Card[] = [];
      for (const id of cardIdsToReturn) {
        const index = player.hand.findIndex(c => c.id === id);
        if (index !== -1) {
          cardsToReturn.push(player.hand.splice(index, 1)[0]);
        }
      }
      player.deck = [...cardsToReturn, ...player.deck]; // Put at bottom
      
      // Draw same number
      for (let i = 0; i < cardIdsToReturn.length; i++) {
        const card = player.deck.pop();
        if (card) player.hand.push(card);
      }
      
      // Shuffle
      player.deck = this.shuffle(player.deck);
      game.logs.push(`${player.displayName} 进行了调度，更换了 ${cardIdsToReturn.length} 张卡牌。`);
    } else {
      game.logs.push(`${player.displayName} 接受了初始手牌。`);
    }

    player.mulliganDone = true;

    // Check if both players are done
    const allDone = Object.values(game.players).every(p => p.mulliganDone);
    if (allDone) {
      game.phase = 'START';
      game.turnCount = 1;
      // Find the first player
      const firstPlayerIdx = game.players[game.playerIds[0]].isFirst ? 0 : 1;
      game.currentTurnPlayer = firstPlayerIdx as 0 | 1;
      
      const firstPlayerUid = game.playerIds[game.currentTurnPlayer];
      game.players[firstPlayerUid].isTurn = true;
      game.logs.push(`调度结束。第 1 回合开始，由 ${game.players[firstPlayerUid].displayName} 先行。`);
    }

    await updateDoc(gameRef, {
      players: game.players,
      phase: game.phase,
      turnCount: game.turnCount,
      currentTurnPlayer: game.currentTurnPlayer,
      logs: game.logs
    });
  },

  // Bot logic
  async botMove(gameId: string) {
    const gameRef = doc(db, GAMES_COLLECTION, gameId);
    const gameSnap = await getDoc(gameRef);
    if (!gameSnap.exists()) return;
    
    const game = gameSnap.data() as GameState;
    const bot = game.players['BOT_PLAYER'];
    if (!bot || !bot.isTurn) return;

    // 1. Try to play a unit if possible
    const unitInHand = bot.hand.find(c => c.type === 'UNIT' && this.canPlayCard(game, 'BOT_PLAYER', c).can);
    if (unitInHand) {
      try {
        await this.playCardToStack(gameId, unitInHand.id);
        // Bot always resolves immediately for now
        await this.resolveStack(gameId);
      } catch (e) {
        console.error('Bot failed to play unit', e);
      }
    }

    // 2. End Turn
    await this.endTurn(gameId);
  },

  // Join an existing game
  async joinGame(gameId: string, deck: Card[]) {
    if (!auth.currentUser) throw new Error('Not authenticated');
    
    const validation = this.validateDeck(deck);
    if (!validation.valid) throw new Error(validation.error);

    const gameRef = doc(db, GAMES_COLLECTION, gameId);
    const gameSnap = await getDoc(gameRef);
    
    if (!gameSnap.exists()) throw new Error('Game not found');
    const gameData = gameSnap.data() as GameState;
    
    if ((gameData as any).status !== 'WAITING') throw new Error('Game already full');

    const opponentState: PlayerState = {
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName || 'Player 2',
      deck: this.shuffle([...deck]),
      hand: [],
      grave: [],
      exile: [],
      itemZone: [],
      erosionFront: [],
      erosionBack: [],
      unitZone: Array(6).fill(null),
      playZone: [],
      isTurn: false,
      isFirst: false,
      mulliganDone: false,
      hasExhaustedThisTurn: [],
    };

    // Initial Draw 4
    for (let i = 0; i < 4; i++) {
      const card = opponentState.deck.pop();
      if (card) opponentState.hand.push(card);
    }

    // Random first player
    const uids = [Object.keys(gameData.players)[0], auth.currentUser.uid];
    const firstIdx = Math.floor(Math.random() * uids.length) as 0 | 1;
    const firstPlayerUid = uids[firstIdx];
    
    const players = {
      ...gameData.players,
      [auth.currentUser.uid]: opponentState
    };

    players[uids[0]].isFirst = firstPlayerUid === uids[0];
    players[uids[1]].isFirst = firstPlayerUid === uids[1];

    await updateDoc(gameRef, {
      players,
      playerIds: uids,
      phase: 'MULLIGAN',
      currentTurnPlayer: firstIdx,
      status: 'ACTIVE',
      logs: [...gameData.logs, `${opponentState.displayName} 加入了游戏。请进行调度 (Mulligan)。`]
    });
  },

  // Helper: Shuffle deck
  shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  // Pre-check if card can be played
  canPlayCard(game: GameState, playerUid: string, card: Card): { can: boolean; error?: string } {
    const player = game.players[playerUid];
    if (!player) return { can: false, error: 'Player not found' };
    if (!player.isTurn) return { can: false, error: '不是你的回合' };
    if (game.phase !== 'MAIN') return { can: false, error: '当前阶段无法出牌' };

    // Check cost (Ac Value)
    const totalErosion = player.erosionFront.length + player.erosionBack.length;
    if (totalErosion < card.acValue) {
      return { can: false, error: `侵蚀值不足 (需要: ${card.acValue}, 当前: ${totalErosion})` };
    }

    // Check Unit Zone if it's a unit
    if (card.type === 'UNIT') {
      const emptySlot = player.unitZone.findIndex(slot => slot === null);
      if (emptySlot === -1) return { can: false, error: '单位区已满' };
    }

    return { can: true };
  },

  // Play card to stack
  async playCardToStack(gameId: string, cardId: string) {
    const gameRef = doc(db, GAMES_COLLECTION, gameId);
    const gameSnap = await getDoc(gameRef);
    if (!gameSnap.exists()) return;
    
    const game = gameSnap.data() as GameState;
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    
    const player = game.players[uid];
    const cardIndex = player.hand.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return;
    const card = player.hand[cardIndex];

    const check = this.canPlayCard(game, uid, card);
    if (!check.can) throw new Error(check.error);

    // Move to play zone
    player.hand.splice(cardIndex, 1);
    player.playZone.push(card);

    // Add to counter stack
    game.counterStack.push({
      card,
      ownerUid: uid,
      type: 'PLAY',
      timestamp: Date.now()
    });
    game.isCountering = 1;

    game.logs.push(`${player.displayName} 打出了 [${card.fullName}]。`);

    await updateDoc(gameRef, {
      players: game.players,
      counterStack: game.counterStack,
      isCountering: game.isCountering,
      logs: game.logs
    });
  },

  // Resolve stack (Counter Stack)
  async resolveStack(gameId: string, paymentSelection?: { useFeijing: string[], exhaustIds: string[] }) {
    const gameRef = doc(db, GAMES_COLLECTION, gameId);
    const gameSnap = await getDoc(gameRef);
    if (!gameSnap.exists()) return;
    
    const game = gameSnap.data() as GameState;
    if (game.counterStack.length === 0) return;

    // Resolve from top to bottom (LIFO)
    while (game.counterStack.length > 0) {
      const item = game.counterStack.pop()!;
      const player = game.players[item.ownerUid];
      const card = item.card;

      // 1. Pay cost (Ac Value)
      // For now, assume cost is paid by moving from deck to erosion back
      for (let i = 0; i < card.acValue; i++) {
        const erosionCard = player.deck.pop();
        if (erosionCard) player.erosionBack.push(erosionCard);
      }

      // 2. Resolve effect
      if (card.type === 'UNIT') {
        const emptySlot = player.unitZone.findIndex(slot => slot === null);
        if (emptySlot !== -1) {
          player.unitZone[emptySlot] = card;
          // Trigger ENTER effects
          const enterEffect = card.effects.find(e => e.type === '诱');
          if (enterEffect) {
            game.logs.push(`触发 [${card.fullName}] 的诱发效果: ${enterEffect.description}`);
          }
        }
      } else if (card.type === 'ITEM') {
        player.itemZone.push(card);
      } else {
        // Story or other types go to grave after resolution
        player.grave.push(card);
      }

      // Remove from play zone
      const pzIdx = player.playZone.findIndex(c => c.id === card.id);
      if (pzIdx !== -1) player.playZone.splice(pzIdx, 1);

      game.logs.push(`[${card.fullName}] 结算完成。`);
    }

    game.isCountering = 0;

    await updateDoc(gameRef, {
      players: game.players,
      counterStack: game.counterStack,
      isCountering: game.isCountering,
      logs: game.logs
    });
  },

  // End Turn
  async endTurn(gameId: string) {
    const gameRef = doc(db, GAMES_COLLECTION, gameId);
    const gameSnap = await getDoc(gameRef);
    if (!gameSnap.exists()) return;
    
    const game = gameSnap.data() as GameState;
    const currentUid = game.playerIds[game.currentTurnPlayer];
    const player = game.players[currentUid];
    
    if (!player.isTurn) return;

    // Phase transition: END -> START (next player)
    player.isTurn = false;
    
    // Switch player
    game.currentTurnPlayer = (game.currentTurnPlayer === 0 ? 1 : 0) as 0 | 1;
    const nextUid = game.playerIds[game.currentTurnPlayer];
    const nextPlayer = game.players[nextUid];
    
    nextPlayer.isTurn = true;
    game.phase = 'START';
    
    if (game.currentTurnPlayer === 0) {
      game.turnCount++;
    }

    game.logs.push(`${player.displayName} 结束了回合。第 ${game.turnCount} 回合，${nextPlayer.displayName} 的回合开始。`);

    // Start Phase Logic: Reset exhausted cards
    nextPlayer.unitZone.forEach(u => { if (u) u.isExhausted = false; });
    nextPlayer.itemZone.forEach(i => { i.isExhausted = false; });

    // Draw Phase: Draw 1
    const drawCard = nextPlayer.deck.pop();
    if (drawCard) nextPlayer.hand.push(drawCard);

    // Erosion Phase: Move 1 from deck to erosion back
    const erosionCard = nextPlayer.deck.pop();
    if (erosionCard) nextPlayer.erosionBack.push(erosionCard);

    game.phase = 'MAIN';

    await updateDoc(gameRef, {
      players: game.players,
      currentTurnPlayer: game.currentTurnPlayer,
      turnCount: game.turnCount,
      phase: game.phase,
      logs: game.logs
    });

    // If next player is bot, trigger bot move
    if (nextUid === 'BOT_PLAYER') {
      setTimeout(() => this.botMove(gameId), 1000);
    }
  }
};
