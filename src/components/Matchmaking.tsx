import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { GameService } from '../services/gameService';
import { useNavigate, Link } from 'react-router-dom';
import { Play, Plus, Users, Loader2 } from 'lucide-react';
import { CARD_LIBRARY } from '../data/cards';
import { cn } from '../lib/utils';
import { Deck } from '../types/game';

export const Matchmaking: React.FC = () => {
  const [waitingGames, setWaitingGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'games'), where('status', '==', 'WAITING'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const games = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWaitingGames(games);
    });
    return () => unsubscribe();
  }, []);

  const [myDecks, setMyDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);

  useEffect(() => {
    const loadDecks = async () => {
      if (!auth.currentUser) return;
      const q = query(collection(db, `users/${auth.currentUser.uid}/decks`));
      const snap = await getDocs(q);
      const decks = snap.docs.map(d => ({ id: d.id, ...d.data() } as Deck));
      setMyDecks(decks);
      if (decks.length > 0) setSelectedDeckId(decks[0].id);
    };
    loadDecks();
  }, []);

  const getSelectedDeckCards = () => {
    const deck = myDecks.find(d => d.id === selectedDeckId);
    if (!deck) return CARD_LIBRARY; // Fallback
    return deck.cards.map(id => CARD_LIBRARY.find(c => c.id === id)!).filter(Boolean);
  };

  const handleCreateGame = async () => {
    if (!selectedDeckId) {
      alert('请先选择一个卡组');
      return;
    }
    const cards = getSelectedDeckCards();
    const validation = GameService.validateDeck(cards);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setLoading(true);
    try {
      const gameId = await GameService.createGame(cards);
      navigate(`/battle/${gameId}`);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to create game');
    } finally {
      setLoading(false);
    }
  };

  const handlePracticeGame = async () => {
    if (!selectedDeckId) {
      alert('请先选择一个卡组');
      return;
    }
    const cards = getSelectedDeckCards();
    const validation = GameService.validateDeck(cards);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setLoading(true);
    try {
      const gameId = await GameService.createPracticeGame(cards);
      navigate(`/battle/${gameId}`);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to create practice game');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async (gameId: string) => {
    if (!selectedDeckId) {
      alert('请先选择一个卡组');
      return;
    }
    const cards = getSelectedDeckCards();
    const validation = GameService.validateDeck(cards);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setLoading(true);
    try {
      await GameService.joinGame(gameId, cards);
      navigate(`/battle/${gameId}`);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to join game');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">在线对战</h1>
          <p className="text-zinc-400">寻找对手或创建新的对局</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePracticeGame}
            disabled={loading}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Users className="w-5 h-5" />}
            练习模式
          </button>
          <button 
            onClick={handleCreateGame}
            disabled={loading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            创建对局
          </button>
        </div>
      </div>

      <div className="mb-8 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">选择你的卡组</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {myDecks.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDeckId(d.id)}
              className={cn(
                "flex-shrink-0 px-6 py-3 rounded-xl border-2 transition-all text-left min-w-[200px]",
                selectedDeckId === d.id ? "border-red-600 bg-red-900/20" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
              )}
            >
              <p className="font-bold truncate">{d.name}</p>
              <p className="text-[10px] text-zinc-500">{d.cards.length} 张卡牌</p>
            </button>
          ))}
          {myDecks.length === 0 && (
            <Link to="/deck-builder" className="flex items-center gap-2 text-red-500 text-sm hover:underline">
              <Plus className="w-4 h-4" /> 去创建一个卡组
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {waitingGames.length === 0 ? (
          <div className="p-12 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500">
            <Users className="w-12 h-12 mb-4 opacity-20" />
            <p>当前没有等待中的对局</p>
          </div>
        ) : (
          waitingGames.map(game => (
            <div key={game.id} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between hover:border-red-500 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-red-500">
                  {game.players[Object.keys(game.players)[0]].displayName[0]}
                </div>
                <div>
                  <h3 className="font-bold">{game.players[Object.keys(game.players)[0]].displayName} 的对局</h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Waiting for opponent...</p>
                </div>
              </div>
              <button 
                onClick={() => handleJoinGame(game.id)}
                disabled={loading}
                className="px-6 py-2 bg-zinc-800 group-hover:bg-red-600 rounded-lg font-bold transition-all"
              >
                加入战斗
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
