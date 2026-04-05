import express from 'express';
console.log('[Server] index.ts is starting up...');
import { createServer } from 'http';

import { Server } from 'socket.io';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { pool, dbInit } from './db';
import { generateToken, verifyToken } from './auth';
import { initServerCardLibrary, SERVER_CARD_LIBRARY } from './card_loader';
import { ServerGameService } from './ServerGameService';
import { PlayerState, Card } from '../src/types/game';

// Initialize Game Library
// Initialize Game Library will be awaited below.


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

// Initialize MariaDB Connection
// Initialize MariaDB Connection and then start server
dbInit();


// Login Endpoint
app.post('/api/login', async (req, res): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: 'Username and password required' });
        return;
    }

    try {
        const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user.id, user.username, user.display_name, user.role);
        res.json({ token, user: { uid: user.id, displayName: user.display_name, email: user.username } });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create Practice Game
app.post('/api/games/practice', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const gameId = 'practice_' + Math.random().toString(36).substring(2, 9);
        const userIdStr = user.userId.toString();
        const initialState = {
            playerIds: [userIdStr, 'BOT_PLAYER'],
            players: {},
            status: 'READY',
            phase: 'INIT',
            turnCount: 0,
            currentTurnPlayer: 0,
            logs: [],
            mode: 'practice',
            counterStack: [],
            isCountering: 0,
            effectUsage: {}
        };

        await pool.query('INSERT INTO games (id, state, status) VALUES (?, ?, 0)', [gameId, JSON.stringify(initialState)]);
        res.json({ gameId });
    } catch (err) {
        console.error('Create practice game error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create Friend Match (generates 8-digit room code)
app.post('/api/games/friend', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const roomCode = Math.random().toString(10).substring(2, 10).padEnd(8, '0');
        const gameId = 'friend_' + roomCode;
        const userIdStr = user.userId.toString();
        const initialState = {
            playerIds: [userIdStr],
            players: {},
            status: 'WAITING',
            phase: 'INIT',
            turnCount: 0,
            currentTurnPlayer: 0,
            logs: [],
            mode: 'friend',
            roomCode: roomCode,
            counterStack: [],
            isCountering: 0,
            effectUsage: {}
        };

        await pool.query('INSERT INTO games (id, state, status) VALUES (?, ?, 0)', [gameId, JSON.stringify(initialState)]);
        res.json({ gameId, roomCode });
    } catch (err) {
        console.error('Create friend game error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Join Friend Match by room code
app.post('/api/games/friend/join', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    const { roomCode } = req.body;
    if (!roomCode) { res.status(400).json({ error: '请输入房间码' }); return; }

    try {
        const gameId = 'friend_' + roomCode;
        const rows = await pool.query('SELECT state FROM games WHERE id = ?', [gameId]);
        if (rows.length === 0) {
            res.status(404).json({ error: '未找到该房间' });
            return;
        }
        const gameState = typeof rows[0].state === 'string' ? JSON.parse(rows[0].state) : rows[0].state;
        if (gameState.playerIds.length >= 2) {
            res.status(400).json({ error: '房间已满' });
            return;
        }
        const userIdStr = user.userId.toString();
        if (gameState.playerIds.includes(userIdStr)) {

            res.status(400).json({ error: '你已在该房间中' });
            return;
        }
        gameState.playerIds.push(user.userId);
        gameState.status = 'READY';
        await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
        res.json({ gameId });
    } catch (err) {
        console.error('Join friend game error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Matchmaking Queue
const matchmakingQueue: { userId: string; socketId?: string; timestamp: number }[] = [];

app.post('/api/games/matchmaking', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        // Remove self if already in queue
        const existingIdx = matchmakingQueue.findIndex(q => q.userId === user.userId);
        if (existingIdx !== -1) matchmakingQueue.splice(existingIdx, 1);

        // Check if someone else is waiting
        const opponent = matchmakingQueue.shift();
        if (opponent && opponent.userId !== user.userId) {
            // Create a match
            const gameId = 'match_' + Math.random().toString(36).substring(2, 9);
            const initialState = {
                playerIds: [opponent.userId, user.userId],
                players: {},
                status: 'READY',
                phase: 'INIT',
                turnCount: 0,
                currentTurnPlayer: 0,
                logs: [],
                mode: 'match',
                counterStack: [],
                isCountering: 0,
                effectUsage: {}
            };
            await pool.query('INSERT INTO games (id, state, status) VALUES (?, ?, 0)', [gameId, JSON.stringify(initialState)]);

            // Notify the opponent via socket
            if (opponent.socketId) {
                io.to(opponent.socketId).emit('matchFound', { gameId });
            }

            res.json({ gameId, matched: true });
        } else {
            // Add to queue
            matchmakingQueue.push({ userId: user.userId, timestamp: Date.now() });
            res.json({ matched: false, position: matchmakingQueue.length });
        }
    } catch (err) {
        console.error('Matchmaking error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Cancel matchmaking
app.post('/api/games/matchmaking/cancel', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    const idx = matchmakingQueue.findIndex(q => q.userId === user.userId);
    if (idx !== -1) matchmakingQueue.splice(idx, 1);
    res.json({ success: true });
});

// Legacy create game (kept for compatibility)
app.post('/api/games', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const mode = req.body?.practice ? 'practice' : 'match';
        const prefix = mode === 'practice' ? 'practice_' : 'match_';
        const gameId = prefix + Math.random().toString(36).substring(2, 9);
        const initialState = {
            playerIds: mode === 'practice' ? [user.userId, 'BOT_PLAYER'] : [user.userId],
            players: {},
            status: mode === 'practice' ? 'READY' : 'WAITING',
            phase: 'INIT',
            turnCount: 0,
            currentTurnPlayer: 0,
            logs: [],
            mode,
            counterStack: [],
            isCountering: 0,
            effectUsage: {}
        };
        await pool.query('INSERT INTO games (id, state, status) VALUES (?, ?, 0)', [gameId, JSON.stringify(initialState)]);
        res.json({ gameId });
    } catch (err) {
        console.error('Create game error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Profile Endpoint
app.get('/api/user/profile', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const rows = await pool.query('SELECT favorite_card_id, coins FROM users WHERE id = ?', [user.userId]);
        res.json({ favoriteCardId: rows.length > 0 ? rows[0].favorite_card_id : null, coins: rows.length > 0 ? Number(rows[0].coins) : 0 });
    } catch (err) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.put('/api/user/profile', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const { favoriteCardId } = req.body;
        await pool.query('UPDATE users SET favorite_card_id = ? WHERE id = ?', [favoriteCardId, user.userId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'DB Error' });
    }
});

// Decks Endpoints
app.get('/api/user/decks', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const rows = await pool.query('SELECT * FROM decks WHERE user_id = ?', [user.userId]);
        const decks = rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            cards: typeof r.cards === 'string' ? JSON.parse(r.cards) : r.cards,
            createdAt: Number(r.created_at),
            updatedAt: Number(r.updated_at)
        }));
        res.json({ decks });
    } catch (err) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.post('/api/user/decks', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const deckData = req.body;
        const deckId = Math.random().toString(36).substring(2, 10);
        await pool.query(
            'INSERT INTO decks (id, user_id, name, cards, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
            [deckId, user.userId, deckData.name, JSON.stringify(deckData.cards || []), Date.now(), Date.now()]
        );
        res.json({ id: deckId });
    } catch (err) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.put('/api/user/decks/:id', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const deckId = req.params.id;
        const deckData = req.body;
        if (deckData.cards) {
            await pool.query('UPDATE decks SET name = ?, cards = ?, updated_at = ? WHERE id = ? AND user_id = ?',
                [deckData.name, JSON.stringify(deckData.cards), Date.now(), deckId, user.userId]);
        } else {
            await pool.query('UPDATE decks SET name = ?, updated_at = ? WHERE id = ? AND user_id = ?',
                [deckData.name, Date.now(), deckId, user.userId]);
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.delete('/api/user/decks/:id', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const deckId = req.params.id;
        await pool.query('DELETE FROM decks WHERE id = ? AND user_id = ?', [deckId, user.userId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.post('/api/user/decks/:id/copy', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const deckId = req.params.id;
        const rows = await pool.query('SELECT * FROM decks WHERE id = ? AND user_id = ?', [deckId, user.userId]);
        if (rows.length === 0) { res.status(404).json({ error: 'Not found' }); return; }

        const original = rows[0];
        const newDeckId = Math.random().toString(36).substring(2, 10);
        await pool.query(
            'INSERT INTO decks (id, user_id, name, cards, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
            [newDeckId, user.userId, original.name + ' (副本)', typeof original.cards === 'string' ? original.cards : JSON.stringify(original.cards), Date.now(), Date.now()]
        );
        res.json({ id: newDeckId });
    } catch (err) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.get('/api/games', async (req, res): Promise<void> => {
    try {
        const rows = await pool.query('SELECT * FROM games WHERE status = 0');
        const games = rows.map((r: any) => ({
            id: r.id,
            ...(typeof r.state === 'string' ? JSON.parse(r.state) : r.state)
        }));
        res.json({ games });
    } catch (e) {
        res.status(500).json({ error: 'DB Error' });
    }
});

// Collection Endpoint
app.get('/api/user/collection', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    try {
        const rows = await pool.query('SELECT card_id, quantity FROM user_cards WHERE user_id = ?', [user.userId]);
        const collection: Record<string, number> = {};
        for (const r of rows) {
            collection[r.card_id] = Number(r.quantity);
        }
        res.json({ collection });
    } catch (err) {
        res.status(500).json({ error: 'DB Error' });
    }
});

// Store - Buy Pack Endpoint
const CARD_POOL = [
    '10400002', '10400003', '10401001', '10401004', '10401005', '10401008',
    '10402006', '10402007', '20400001', '20400002', '20400003', '20400004',
    '20400005', '20400007', '20403006', '30400002', '30401001', '99999999'
];

// Rarity mapping for each card (must match the card scripts)
const CARD_RARITIES: Record<string, string> = {
    '10400002': 'U', '10400003': 'U', '10401001': 'SR', '10401004': 'SR',
    '10401005': 'C', '10401008': 'SR', '10402006': 'R', '10402007': 'PR',
    '20400001': 'R', '20400002': 'U', '20400003': 'R', '20400004': 'U',
    '20400005': 'U', '20400007': 'U', '20403006': 'U', '30400002': 'U',
    '30401001': 'R', '99999999': 'UR',
};

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

app.post('/api/store/buy-pack', async (req, res): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const user = verifyToken(authHeader.split(' ')[1]);
    if (!user) { res.status(401).json({ error: 'Invalid token' }); return; }

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();

        // Check coins
        const userRows = await conn.query('SELECT coins FROM users WHERE id = ?', [user.userId]);
        const coins = Number(userRows[0].coins);
        if (coins < 10) {
            await conn.rollback();
            res.status(400).json({ error: '金币不足' });
            return;
        }

        // Get pity counters
        let pityRows = await conn.query('SELECT * FROM pack_history WHERE user_id = ?', [user.userId]);
        if (pityRows.length === 0) {
            await conn.query('INSERT INTO pack_history (user_id, total_packs, packs_since_sr, packs_since_ur) VALUES (?, 0, 0, 0)', [user.userId]);
            pityRows = [{ total_packs: 0, packs_since_sr: 0, packs_since_ur: 0 }];
        }
        let packsSinceSR = Number(pityRows[0].packs_since_sr) + 1;
        let packsSinceUR = Number(pityRows[0].packs_since_ur) + 1;
        const totalPacks = Number(pityRows[0].total_packs) + 1;

        // Build rarity pools
        const cuPool = CARD_POOL.filter(id => CARD_RARITIES[id] === 'C' || CARD_RARITIES[id] === 'U');
        const rPool = CARD_POOL.filter(id => CARD_RARITIES[id] === 'R');
        const srPool = CARD_POOL.filter(id => CARD_RARITIES[id] === 'SR');
        const urPool = CARD_POOL.filter(id => CARD_RARITIES[id] === 'UR' || CARD_RARITIES[id] === 'SER');

        // Pick 4 C/U cards
        const drawnCards: string[] = [];
        for (let i = 0; i < 4; i++) {
            drawnCards.push(pickRandom(cuPool));
        }

        // Pick 1 R+ card with pity
        let guaranteedCard: string;
        if (packsSinceUR >= 50 && urPool.length > 0) {
            // UR/SER pity
            guaranteedCard = pickRandom(urPool);
            packsSinceUR = 0;
            packsSinceSR = 0;
        } else if (packsSinceSR >= 10 && srPool.length > 0) {
            // SR pity
            guaranteedCard = pickRandom(srPool);
            packsSinceSR = 0;
        } else {
            // Normal R+ roll with weighted odds
            const roll = Math.random();
            if (roll < 0.02 && urPool.length > 0) {
                guaranteedCard = pickRandom(urPool);
                packsSinceUR = 0;
                packsSinceSR = 0;
            } else if (roll < 0.12 && srPool.length > 0) {
                guaranteedCard = pickRandom(srPool);
                packsSinceSR = 0;
            } else if (rPool.length > 0) {
                guaranteedCard = pickRandom(rPool);
            } else {
                guaranteedCard = pickRandom(cuPool);
            }
        }
        drawnCards.push(guaranteedCard);

        // Deduct coins
        await conn.query('UPDATE users SET coins = coins - 10 WHERE id = ?', [user.userId]);

        // Add cards to collection
        for (const cardId of drawnCards) {
            await conn.query(
                `INSERT INTO user_cards (user_id, card_id, quantity) VALUES (?, ?, 1)
                 ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
                [user.userId, cardId]
            );
        }

        // Update pity counters
        await conn.query(
            'UPDATE pack_history SET total_packs = ?, packs_since_sr = ?, packs_since_ur = ? WHERE user_id = ?',
            [totalPacks, packsSinceSR, packsSinceUR, user.userId]
        );

        await conn.commit();

        const newCoinsRow = await pool.query('SELECT coins FROM users WHERE id = ?', [user.userId]);

        res.json({
            cards: drawnCards.map(id => ({ id, rarity: CARD_RARITIES[id] || 'C' })),
            newCoins: Number(newCoinsRow[0].coins),
            totalPacks,
            packsSinceSR,
            packsSinceUR,
        });
    } catch (err) {
        if (conn) await conn.rollback();
        console.error('Buy pack error:', err);
        res.status(500).json({ error: 'Internal error' });
    } finally {
        if (conn) conn.release();
    }
});

// Socket.IO logic
// Helper to create initial player state
function createInitialPlayer(deckCards: Card[], displayName: string, isFirst: boolean): PlayerState {
    const fullDeck: Card[] = deckCards.map(c => ({
        ...c,
        gamecardId: Math.random().toString(36).substring(2, 10),
        isExhausted: false,
        displayState: 'FRONT_UPRIGHT',
        cardlocation: 'DECK'
    }));

    // Perform Durstenfeld shuffle (Fisher-Yates) 
    for (let i = fullDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fullDeck[i], fullDeck[j]] = [fullDeck[j], fullDeck[i]];
    }

    // Draw initial 4 cards
    const hand = fullDeck.splice(0, 4).map(c => ({ ...c, cardlocation: 'HAND' as any }));

    return {
        uid: '', // Will be set by caller
        displayName: displayName,
        hand: hand,
        deck: fullDeck,
        grave: [],
        exile: [],
        playZone: [],
        unitZone: new Array(5).fill(null),
        itemZone: new Array(2).fill(null),
        erosionFront: new Array(10).fill(null),
        erosionBack: new Array(10).fill(null),
        isFirst: isFirst,
        mulliganDone: false,
        hasExhaustedThisTurn: [],
        isGoddessMode: false,
        isTurn: isFirst
    };

}

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('authenticate', (token) => {
        const user = verifyToken(token);
        if (user) {
            (socket as any).user = user;
            const queueEntry = matchmakingQueue.find(q => q.userId === user.userId);
            if (queueEntry) queueEntry.socketId = socket.id;
            socket.emit('authenticated');
        } else {
            socket.emit('unauthorized');
        }
    });

    socket.on('joinGame', async (data: { gameId: string, deckId?: string }) => {
        const user = (socket as any).user;
        if (!user) {
            console.log('[Socket] joinGame failed: Socket not authenticated');
            socket.emit('error', '未授权，请重试');
            return;
        }

        const userIdStr = user.userId.toString();
        const gameId = typeof data === 'string' ? data : data.gameId;
        const deckId = typeof data === 'object' ? data.deckId : undefined;

        console.log(gameId);
        if (!gameId) {
            console.log('[Socket] joinGame failed: Missing gameId');
            socket.emit('error', '无效的房间ID');
            return;
        }

        socket.join(gameId);
        console.log(`[Socket] User ${userIdStr} attempting to join game ${gameId}`);

        try {
            const rows = await pool.query('SELECT state FROM games WHERE id = ?', [gameId]);
            if (rows.length === 0) {
                console.log(`[Socket] joinGame failed: Game ${gameId} not found in DB`);
                socket.emit('error', '未找到游戏战场');
                return;
            }

            const gameState = typeof rows[0].state === 'string' ? JSON.parse(rows[0].state) : rows[0].state;
            if (!gameState.players) gameState.players = {};

            // Initialize human player if they haven't been initialized yet
            if (!gameState.players[userIdStr] && deckId) {
                console.log(`[Socket] Initializing player ${userIdStr} in game ${gameId}`);
                const deckRows = await pool.query('SELECT * FROM decks WHERE id = ?', [deckId]);
                if (deckRows.length > 0) {
                    const deckCardsRaw = typeof deckRows[0].cards === 'string' ? JSON.parse(deckRows[0].cards) : deckRows[0].cards;

                    if (Object.keys(SERVER_CARD_LIBRARY).length === 0) {
                        console.log('[Socket] WARNING: Card library was empty, initializing now...');
                        await initServerCardLibrary();
                    }

                    const deckCards: Card[] = deckCardsRaw.map((id: string) => SERVER_CARD_LIBRARY[id]).filter(Boolean);
                    const isFirst = gameState.playerIds.indexOf(userIdStr) === 0;

                    const player = createInitialPlayer(deckCards, user.displayName || user.username || '玩家', isFirst);
                    player.uid = userIdStr;
                    gameState.players[userIdStr] = player;

                    if (gameState.mode === 'practice' && !gameState.players['BOT_PLAYER']) {
                        const botPlayer = createInitialPlayer(deckCards, '机器人', !isFirst);
                        botPlayer.uid = 'BOT_PLAYER';
                        botPlayer.mulliganDone = true;
                        gameState.players['BOT_PLAYER'] = botPlayer;
                    }

                    const initializedPlayerCount = Object.keys(gameState.players).length;
                    if (gameState.phase === 'INIT' && initializedPlayerCount >= 2) {
                        gameState.phase = 'MULLIGAN';
                        gameState.status = 'ACTIVE';
                        gameState.logs.push('所有玩家已准备就绪。开始调度阶段。');
                    }

                    await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
                } else {
                    console.error(`[Socket] joinGame error: Deck ${deckId} not found`);
                }
            }

            console.log(`[Socket] joinGame success: Emitting state for ${userIdStr} in ${gameId}`);
            console.log('yangming98');
            console.log(gameState);
            socket.emit('gameStateUpdate', gameState);
            console.log('yangming99');
            console.log(gameState);
            io.to(gameId).emit('gameStateUpdate', gameState);

        } catch (err) {
            console.error('[Socket] joinGame exception:', err);
            socket.emit('error', '战场同步过程中发生错误');
        }
    });


    async function advancePhase(gameState: any, gameId: string, action?: any) {
        try {
            console.log(`[Socket] advancePhase for game ${gameId}, action: ${action}`);
            console.log(`[Socket] Calling ServerGameService.advancePhase with action: ${action}`);
            await ServerGameService.advancePhase(gameState, action);


            await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
            io.to(gameId).emit('gameStateUpdate', gameState);

            // Trigger Bot behavior if it's the bot's turn
            const currentPlayerId = gameState.playerIds[gameState.currentTurnPlayer];
            if (currentPlayerId === 'BOT_PLAYER') {
                handleBotMove(gameState, gameId);
            }
        } catch (err: any) {
            console.error('[Socket] advancePhase error:', err);
            socket.emit('error', err.message || '阶段切换失败');
        }
    }


    async function handleBotMove(gameState: any, gameId: string) {
        const bot = gameState.players['BOT_PLAYER'];
        if (!bot || !bot.isTurn) return;

        setTimeout(async () => {
            if (gameState.phase === 'MAIN') {
                gameState.logs.push(`机器人正在思考...`);
                await advancePhase(gameState, gameId, 'DECLARE_END');
            } else if (gameState.phase === 'BATTLE_DECLARATION') {
                const canAttack = bot.unitZone.some((c: any) => c && !c.isExhausted);
                if (canAttack) {
                    gameState.logs.push(`机器人正在思考攻击...`);
                    await advancePhase(gameState, gameId, 'DECLARE_END');
                } else {
                    await advancePhase(gameState, gameId, 'DECLARE_END');
                }
            } else if (gameState.phase === 'EROSION') {
                gameState.logs.push(`机器人选择了侵蚀选项 A。`);
                await ServerGameService.handleErosionChoice(gameState, 'BOT_PLAYER', 'A');
                await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
                io.to(gameId).emit('gameStateUpdate', gameState);
                
                // If it moved to MAIN, trigger bot again
                if (gameState.phase === 'MAIN') {
                    handleBotMove(gameState, gameId);
                }
            } else if (gameState.phase === 'END' || gameState.phase === 'DISCARD') {
                await advancePhase(gameState, gameId);
            }
        }, 1000);
    }



    socket.on('gameAction', async (data: { gameId: string, action: string, payload?: any }) => {

        const user = (socket as any).user;
        if (!user) return;

        const { gameId, action, payload } = data;
        try {
            const rows = await pool.query('SELECT state FROM games WHERE id = ?', [gameId]);
            if (rows.length === 0) return;

            let gameState = typeof rows[0].state === 'string' ? JSON.parse(rows[0].state) : rows[0].state;
            const myUid = user.userId.toString();
            const player = gameState.players[myUid];
            if (!player) {
                console.log(`[Socket] Action ${action} rejected: Player ${myUid} not found in game ${gameId}`);
                return;
            }


            if (action === 'MULLIGAN') {
                const selectedIds: string[] = payload || [];
                if (player.mulliganDone) return;

                if (selectedIds.length > 0) {
                    const cardsToSwap = player.hand.filter((c: any) => selectedIds.includes(c.gamecardId));
                    player.hand = player.hand.filter((c: any) => !selectedIds.includes(c.gamecardId));

                    cardsToSwap.forEach((c: any) => {
                        c.cardlocation = 'DECK';
                        player.deck.push(c);
                    });

                    for (let i = 0; i < selectedIds.length; i++) {
                        const newCard = player.deck.shift();
                        if (newCard) {
                            newCard.cardlocation = 'HAND';
                            player.hand.push(newCard);
                        }
                    }

                    for (let i = player.deck.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [player.deck[i], player.deck[j]] = [player.deck[j], player.deck[i]];
                    }

                    gameState.logs.push(`${player.displayName} 更换了 ${selectedIds.length} 张卡牌。`);
                } else {
                    gameState.logs.push(`${player.displayName} 接受了初始手牌。`);
                }

                player.mulliganDone = true;

                const allDone = Object.values(gameState.players).every((p: any) => p.mulliganDone);
                if (allDone) {
                    gameState.phase = 'START';
                    gameState.turnCount = 1;
                    const firstUid = gameState.playerIds[0];
                    gameState.currentTurnPlayer = 0;
                    // Reset first turn states
                    gameState.playerIds.forEach((uid: string) => {
                        gameState.players[uid].isTurn = (uid === firstUid);
                    });

                    gameState.logs.push(`调度结束。第 1 回合开始，由 ${gameState.players[firstUid].displayName} 先行。`);
                    await advancePhase(gameState, gameId);
                    return;
                }

                await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
                io.to(gameId).emit('gameStateUpdate', gameState);
            } else if (action === 'PLAY_CARD') {
                const { cardId, paymentSelection } = payload;
                await ServerGameService.playCard(gameState, myUid, cardId, paymentSelection);
                await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
                io.to(gameId).emit('gameStateUpdate', gameState);
            } else if (action === 'ATTACK') {
                const { attackerIds, alliance } = payload;
                await ServerGameService.declareAttack(gameState, myUid, attackerIds, alliance);
                await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
                io.to(gameId).emit('gameStateUpdate', gameState);
            } else if (action === 'DEFEND') {
                const { defenderId } = payload;
                await ServerGameService.declareDefense(gameState, myUid, defenderId);
                await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
                io.to(gameId).emit('gameStateUpdate', gameState);
            } else if (action === 'RESOLVE_DAMAGE') {
                await ServerGameService.resolveDamage(gameState);
                await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
                io.to(gameId).emit('gameStateUpdate', gameState);
            } else if (action === 'EROSION_CHOICE') {
                const { choice, selectedCardId } = payload;
                await ServerGameService.handleErosionChoice(gameState, myUid, choice, selectedCardId);
                await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
                io.to(gameId).emit('gameStateUpdate', gameState);
            } else if (action === 'DISCARD') {
                const { cardId } = payload;
                await ServerGameService.discardCard(gameState, myUid, cardId);
                await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
                io.to(gameId).emit('gameStateUpdate', gameState);
            } else if (action === 'RESOLVE_PLAY') {
                if (gameState.phase === 'COUNTERING') {
                    await ServerGameService.resolvePlay(gameState);
                    await pool.query('UPDATE games SET state = ? WHERE id = ?', [JSON.stringify(gameState), gameId]);
                    io.to(gameId).emit('gameStateUpdate', gameState);
                }
            } else if (action === 'END_PHASE') {
                if (player.isTurn) {
                    await advancePhase(gameState, gameId, payload);
                }
            }

        } catch (err) {
            console.error('Game action error:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Main bootstrap function
const start = async () => {
    try {
        console.log('[Server] Initializing card library...');
        await initServerCardLibrary();
        console.log('[Server] Connecting to database...');
        await dbInit();

        const PORT = process.env.PORT || 3001;
        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('[Server] Fatal initialization error:', err);
        process.exit(1);
    }
};

start();

