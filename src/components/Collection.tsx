import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Loader2, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { CARD_LIBRARY } from '../data/cards';
import { Card } from '../types/game';
import { CardComponent } from './Card';

const RARITY_COLORS: Record<string, string> = {
  C: 'border-zinc-600', U: 'border-emerald-600', R: 'border-blue-600',
  SR: 'border-purple-600', UR: 'border-amber-500', SER: 'border-amber-400', PR: 'border-rose-500',
};
const RARITY_BADGE: Record<string, string> = {
  C: 'bg-zinc-700 text-zinc-300', U: 'bg-emerald-900 text-emerald-300', R: 'bg-blue-900 text-blue-300',
  SR: 'bg-purple-900 text-purple-300', UR: 'bg-amber-900 text-amber-300', SER: 'bg-amber-800 text-amber-200', PR: 'bg-rose-900 text-rose-300',
};

export const Collection: React.FC = () => {
  const navigate = useNavigate();
  const [collection, setCollection] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRarity, setFilterRarity] = useState<string | null>(null);
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    ac: '',
    damage: '',
    power: '',
    faction: '',
    ownership: 'ALL' // ALL, OWNED, NOT_OWNED
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/user/collection`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        setCollection(data.collection || {});
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    loadCollection();
  }, []);

  const filteredCards = CARD_LIBRARY.filter(card => {
    // Text search
    if (searchTerm && !card.fullName.includes(searchTerm) && !(card.specialName && card.specialName.includes(searchTerm))) return false;
    
    // Quick filters
    if (filterRarity && card.rarity !== filterRarity) return false;
    if (filterColor && card.color !== filterColor) return false;

    // Advanced filters
    if (filters.ac !== '' && card.acValue.toString() !== filters.ac) return false;
    if (filters.damage !== '' && card.damage?.toString() !== filters.damage) return false;
    if (filters.power !== '' && card.power?.toString() !== filters.power) return false;
    if (filters.faction !== '' && !card.faction?.toLocaleLowerCase().includes(filters.faction.toLocaleLowerCase())) return false;

    // Ownership
    const isOwned = (collection[card.uniqueId] || collection[card.id] || 0) > 0;
    if (filters.ownership === 'OWNED' && !isOwned) return false;
    if (filters.ownership === 'NOT_OWNED' && isOwned) return false;

    return true;
  });

  const totalOwned = Object.values(collection).reduce((sum: number, qty: number) => sum + qty, 0);
  const uniqueOwned = Object.keys(collection).filter(k => collection[k] > 0).length;

  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case 'C':
      case 'U': return 'rarity-border-cu';
      case 'R': return 'rarity-border-r';
      case 'SR': return 'rarity-border-sr';
      case 'UR': return 'rarity-border-ur';
      case 'SER': return 'rarity-border-ser';
      case 'PR': return 'rarity-border-pr';
      default: return 'border-zinc-700';
    }
  };

  if (loading) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="pt-20 px-8 min-h-screen bg-black text-white pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter">我的收藏</h1>
              <p className="text-zinc-500 text-sm">拥有 {uniqueOwned} 种 / 共 {totalOwned} 张卡牌</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/deck-builder')}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-sm transition-colors"
          >
            前往组卡
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-600 transition-all"
              placeholder="搜索卡牌..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-1.5">
            {['C', 'U', 'R', 'SR', 'UR', 'SER', 'PR'].map(r => (
              <button
                key={r}
                onClick={() => setFilterRarity(filterRarity === r ? null : r)}
                className={cn(
                  "px-3 py-2 rounded-lg text-xs font-bold transition-all",
                  filterRarity === r ? RARITY_BADGE[r] : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800"
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {['RED', 'BLUE', 'GREEN', 'YELLOW', 'WHITE'].map(c => (
              <button
                key={c}
                onClick={() => setFilterColor(filterColor === c ? null : c)}
                className={cn(
                  "w-8 h-8 rounded-lg border-2 transition-all",
                  filterColor === c ? 'border-white scale-110' : 'border-zinc-800 hover:border-zinc-600',
                  c === 'RED' && 'bg-red-700', c === 'BLUE' && 'bg-blue-700',
                  c === 'GREEN' && 'bg-green-700', c === 'YELLOW' && 'bg-yellow-600',
                  c === 'WHITE' && 'bg-zinc-300',
                )}
              />
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="flex gap-4 mb-8 p-4 bg-zinc-900/30 rounded-2xl border border-zinc-800/50">
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-zinc-500 font-bold uppercase">AC</label>
              <input 
                className="bg-black border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="All"
                value={filters.ac}
                onChange={e => setFilters({...filters, ac: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-zinc-500 font-bold uppercase">Damage</label>
              <input 
                className="bg-black border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="All"
                value={filters.damage}
                onChange={e => setFilters({...filters, damage: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-zinc-500 font-bold uppercase">Power</label>
              <input 
                className="bg-black border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="All"
                value={filters.power}
                onChange={e => setFilters({...filters, power: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-zinc-500 font-bold uppercase">Faction</label>
              <input 
                className="bg-black border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="All"
                value={filters.faction}
                onChange={e => setFilters({...filters, faction: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-zinc-500 font-bold uppercase">Ownership</label>
              <select 
                className="bg-black border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                value={filters.ownership}
                onChange={e => setFilters({...filters, ownership: e.target.value})}
              >
                <option value="ALL">All Cards</option>
                <option value="OWNED">Owned</option>
                <option value="NOT_OWNED">Not Owned</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filteredCards.map(card => {
            const isOwned = (collection[card.uniqueId] || collection[card.id] || 0) > 0;
            return (
              <div 
                key={card.uniqueId} 
                className={cn(
                  "relative transition-all",
                  !isOwned && "opacity-40 grayscale-[0.8]"
                )}
              >
                <CardComponent 
                  card={card} 
                  displayMode="deck"
                  onClick={() => { /* Detail view if needed */ }}
                />
                <div className="absolute top-0 right-0 p-1.5 z-10">
                   <span className={cn(
                     "bg-black/80 text-[10px] text-white px-2 py-0.5 rounded-md border border-white/10 font-black",
                     !isOwned && "text-zinc-500"
                   )}>
                     x{collection[card.uniqueId] || collection[card.id] || 0}
                   </span>
                </div>
              </div>
            );
          })}
        </div>

        {ownedCards.length === 0 && (
          <div className="text-center py-20 text-zinc-600">
            <p className="text-lg">没有符合条件的卡牌</p>
            <button onClick={() => navigate('/store')} className="mt-4 text-red-500 text-sm hover:underline">
              去商店购买卡包
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
