import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Coins, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { CARD_LIBRARY } from '../data/cards';
import { Card } from '../types/game';

const RARITY_COLORS: Record<string, string> = {
  C: 'border-zinc-500 shadow-zinc-500/20',
  U: 'border-emerald-500 shadow-emerald-500/30',
  R: 'border-blue-500 shadow-blue-500/30',
  SR: 'border-purple-500 shadow-purple-500/40',
  UR: 'border-amber-400 shadow-amber-400/50',
  SER: 'border-amber-400 shadow-amber-400/50',
  PR: 'border-rose-400 shadow-rose-400/40',
};
const RARITY_BG: Record<string, string> = {
  C: 'from-zinc-800', U: 'from-emerald-900/40', R: 'from-blue-900/40',
  SR: 'from-purple-900/50', UR: 'from-amber-900/50', SER: 'from-amber-900/50', PR: 'from-rose-900/40',
};
const RARITY_TEXT: Record<string, string> = {
  C: 'text-zinc-400', U: 'text-emerald-400', R: 'text-blue-400',
  SR: 'text-purple-400', UR: 'text-amber-400', SER: 'text-amber-300', PR: 'text-rose-400',
};

export const Store: React.FC = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(0);
  const [cardCrystals, setCardCrystals] = useState(0);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);
  const [drawnCards, setDrawnCards] = useState<{ id: string; rarity: string }[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [pityInfo, setPityInfo] = useState({ packsSinceSR: 0, packsSinceUR: 0, totalPacks: 0 });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/user/profile`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        setCoins(data.coins || 0);
        setCardCrystals(data.cardCrystals || 0);
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleBuyPack = async (packType: 'basic' | 'prize') => {
    const cost = packType === 'prize' ? 20 : 10;
    if (coins < cost) { alert('金币不足！'); return; }
    
    setBuying(packType);
    setDrawnCards([]);
    setRevealedCount(0);
    setShowResult(false);

    try {
      const res = await fetch(`${BACKEND_URL}/api/store/buy-pack`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ packType }),
      });
      const data = await res.json();
      if (data.error) { alert(data.error); setBuying(null); return; }

      setCoins(data.newCoins);
      setCardCrystals(data.newCardCrystals);
      setDrawnCards(data.cards);
      setPityInfo({ 
        packsSinceSR: data.packsSinceSR, 
        packsSinceUR: data.packsSinceUR, 
        totalPacks: data.totalPacks 
      });
      setShowResult(true);

      // Reveal cards one by one
      for (let i = 0; i < data.cards.length; i++) {
        await new Promise(r => setTimeout(r, 400));
        setRevealedCount(i + 1);
      }
    } catch (e) {
      console.error(e);
      alert('购买失败');
    } finally {
      setBuying(null);
    }
  };

  const getCardInfo = (id: string) => CARD_LIBRARY.find(c => c.id === id);

  if (loading) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="pt-20 px-8 min-h-screen bg-black text-white pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter uppercase">Card Store</h1>
              <p className="text-zinc-500 text-sm">购买卡包，扩充你的收藏</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-900/30 to-amber-800/10 border border-amber-500/30 rounded-full px-5 py-2">
              <Coins className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-bold text-lg">{coins.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-900/30 to-cyan-800/10 border border-cyan-500/30 rounded-full px-5 py-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 font-bold text-lg">{cardCrystals.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Pack Purchase Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 max-w-4xl mx-auto">
          {/* Basic Pack */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBuyPack('basic')}
              className={cn(
                "relative w-64 h-80 rounded-2xl border-2 cursor-pointer overflow-hidden transition-all group",
                buying ? "opacity-50 pointer-events-none" : "border-red-600/50 hover:border-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.3)]"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-900/40 via-black to-red-950/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                <ShoppingBag className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform" />
                <div className="text-center">
                  <p className="text-2xl font-black italic tracking-tighter">基础包</p>
                  <p className="text-zinc-400 text-xs mt-1 font-bold uppercase tracking-wider">Basic Pack</p>
                </div>
                <div className="flex items-center gap-1 bg-black/60 rounded-full px-4 py-1.5 border border-amber-500/30">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 font-bold">10</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-bold">5张卡牌 · 保底R以上</p>
              </div>
              {buying === 'basic' && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60">
                  <Loader2 className="w-10 h-10 animate-spin text-red-500" />
                </div>
              )}
            </motion.div>
            <div className="text-[10px] text-zinc-600 text-center space-y-1 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 w-full">
              <p>保底: 10包SR / 50包UR/SER</p>
              <p>SR保底还差: <span className="text-purple-400 font-bold">{10 - pityInfo.packsSinceSR}</span> · UR保底还差: <span className="text-amber-400 font-bold">{50 - pityInfo.packsSinceUR}</span></p>
            </div>
          </div>

          {/* Prize Pack */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05, rotateY: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBuyPack('prize')}
              className={cn(
                "relative w-64 h-80 rounded-2xl border-2 cursor-pointer overflow-hidden transition-all group",
                buying ? "opacity-50 pointer-events-none" : "border-rose-600/50 hover:border-rose-500 hover:shadow-[0_0_40px_rgba(244,63,94,0.3)]"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-rose-900/40 via-black to-rose-950/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                <Sparkles className="w-16 h-16 text-rose-500 group-hover:scale-110 transition-transform" />
                <div className="text-center">
                  <p className="text-2xl font-black italic tracking-tighter">奖品包</p>
                  <p className="text-zinc-400 text-xs mt-1 font-bold uppercase tracking-wider">Prize Pack</p>
                </div>
                <div className="flex items-center gap-1 bg-black/60 rounded-full px-4 py-1.5 border border-amber-500/30">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 font-bold">20</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-bold">1张卡牌 · 必得PR稀有度</p>
              </div>
              {buying === 'prize' && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60">
                  <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
                </div>
              )}
            </motion.div>
            <div className="text-[10px] text-zinc-600 text-center flex items-center justify-center bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 w-full h-[54px]">
              <p>专为收集者准备的顶级奖励卡包</p>
            </div>
          </div>
        </div>

        {/* Drawn Cards Display */}
        <AnimatePresence>
          {showResult && drawnCards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-12"
            >
              <h2 className="text-center text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">
                <Sparkles className="inline w-4 h-4 mr-2" />开包结果
              </h2>
              <div className={cn(
                "grid gap-4 mx-auto",
                drawnCards.length === 1 ? "grid-cols-1 max-w-[200px]" : "grid-cols-5 max-w-3xl"
              )}>
                {drawnCards.map((drawn, i) => {
                  const card = getCardInfo(drawn.id);
                  const isRevealed = i < revealedCount;
                  return (
                    <motion.div
                      key={i}
                      initial={{ rotateY: 180, opacity: 0 }}
                      animate={isRevealed ? { rotateY: 0, opacity: 1 } : { rotateY: 180, opacity: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={cn(
                        "aspect-[3/4] rounded-xl border-2 overflow-hidden relative",
                        isRevealed ? RARITY_COLORS[drawn.rarity] || '' : 'border-zinc-800',
                        isRevealed && `shadow-lg`
                      )}
                    >
                      {isRevealed && card ? (
                        <>
                          <img src={card.imageUrl} alt={card.fullName} className="w-full h-full object-cover" />
                          <div className={cn("absolute inset-0 bg-gradient-to-t to-transparent", RARITY_BG[drawn.rarity])} />
                          <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                            <p className="text-[10px] font-bold truncate">{card.fullName}</p>
                            <span className={cn("text-[9px] font-black", RARITY_TEXT[drawn.rarity])}>{drawn.rarity}</span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                          <span className="text-zinc-700 text-2xl font-black">?</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowResult(false)}
                  className="px-12 py-3 bg-red-600 hover:bg-red-500 rounded-full text-sm font-black italic tracking-tighter uppercase transition-all hover:scale-110 active:scale-95 shadow-lg shadow-red-900/20"
                >
                  继续 Confirm
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
