/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Play, History, Heart, Plus, Trash2, Home as HomeIcon, Settings, User } from 'lucide-react';
import { cn } from './lib/utils';

import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, signIn } from './firebase';
import { Matchmaking } from './components/Matchmaking';
import { BattleField } from './components/BattleField';
import { DeckBuilder } from './components/DeckBuilder';
import { Rulebook } from './components/Rulebook';
import { TopBar } from './components/TopBar';
import { Home } from './components/Home';
import { Profile } from './components/Profile';

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRulebookOpen, setIsRulebookOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md"
        >
          <h1 className="text-6xl font-black text-red-600 italic mb-4 tracking-tighter">神蚀创痕</h1>
          <p className="text-zinc-400 mb-8 uppercase tracking-[0.3em] text-sm">OVERHEAT TCG ONLINE</p>
          <button 
            onClick={signIn}
            className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <User className="w-5 h-5" />
            使用 Google 账号登录
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500 selection:text-white">
        <TopBar onOpenRulebook={() => setIsRulebookOpen(true)} />

        {/* Main Content */}
        <main className="h-screen overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deck-builder" element={<DeckBuilder />} />
            <Route path="/battle" element={<Matchmaking />} />
            <Route path="/battle/:gameId" element={<BattleField />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friend-match" element={<div className="pt-24 px-12">好友约战即将上线</div>} />
            <Route path="/history" element={<div className="pt-24 px-12">对战历史即将上线</div>} />
            <Route path="/favorites" element={<div className="pt-24 px-12">收藏夹即将上线</div>} />
          </Routes>
        </main>

        {/* Rulebook Overlay */}
        <Rulebook isOpen={isRulebookOpen} onClose={() => setIsRulebookOpen(false)} />
      </div>
    </Router>
  );
}
