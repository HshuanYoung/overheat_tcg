/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import { socket, getAuthUser, setAuthUser, setAuthToken, getAuthToken } from './socket';
import { TopBar } from './components/TopBar';
import { Home } from './components/Home';

const Matchmaking = lazy(() => import('./components/Matchmaking').then(module => ({ default: module.Matchmaking })));
const BattleField = lazy(() => import('./components/BattleField').then(module => ({ default: module.BattleField })));
const DeckBuilder = lazy(() => import('./components/DeckBuilder').then(module => ({ default: module.DeckBuilder })));
const Rulebook = lazy(() => import('./components/Rulebook').then(module => ({ default: module.Rulebook })));
const Profile = lazy(() => import('./components/Profile').then(module => ({ default: module.Profile })));
const Store = lazy(() => import('./components/Store').then(module => ({ default: module.Store })));
const Collection = lazy(() => import('./components/Collection').then(module => ({ default: module.Collection })));
const PracticeSetup = lazy(() => import('./components/PracticeSetup').then(module => ({ default: module.PracticeSetup })));
const FriendMatch = lazy(() => import('./components/FriendMatch').then(module => ({ default: module.FriendMatch })));

const PageFallback = () => (
  <div className="h-full min-h-screen bg-black flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full"
    />
  </div>
);

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRulebookOpen, setIsRulebookOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const savedUser = getAuthUser();
    let cleanup = () => {};

    if (savedUser) {
      setUser(savedUser);

      const token = getAuthToken();
      if (token) {
        const authHandler = () => {
          socket.emit('authenticate', token);
        };

        socket.on('connect', authHandler);
        if (!socket.connected) {
          socket.connect();
        } else {
          authHandler();
        }

        cleanup = () => {
          socket.off('connect', authHandler);
        };
      }
    }

    setLoading(false);
    return cleanup;
  }, []);

  useEffect(() => {
    if (!user || typeof window === 'undefined') return;

    const preloadRoutes = () => {
      void import('./components/Matchmaking');
      void import('./components/FriendMatch');
      void import('./components/PracticeSetup');
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preloadRoutes, { timeout: 1500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(preloadRoutes, 800);
    return () => window.clearTimeout(timer);
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
      const res = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAuthToken(data.token);
        setAuthUser(data.user);
        setUser(data.user);
        socket.connect();
        socket.once('connect', () => socket.emit('authenticate', data.token));
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (err) {
      setLoginError('Network Error');
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-8 text-center text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-3xl mx-4"
        >
          <h1 className="text-4xl md:text-6xl font-black text-red-600 italic mb-4 tracking-tighter">绁炶殌鍒涚棔</h1>
          <p className="text-zinc-400 mb-8 uppercase tracking-[0.2em] text-[10px] md:text-sm">OVERHEAT TCG ONLINE</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username (e.g. test1)"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="p-3 bg-black border border-white/20 rounded-lg text-white"
            />
            <input
              type="password"
              placeholder="Password (password123)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="p-3 bg-black border border-white/20 rounded-lg text-white"
            />
            {loginError && <div className="text-red-500 text-sm font-bold">{loginError}</div>}
            <button
              type="submit"
              className="w-full py-4 mt-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              鐧诲綍
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500 selection:text-white">
        <TopBar onOpenRulebook={() => setIsRulebookOpen(true)} />

        <main className="h-screen overflow-auto">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deck-builder" element={<DeckBuilder />} />
              <Route path="/battle" element={<Matchmaking />} />
              <Route path="/battle/:gameId" element={<BattleField />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/store" element={<Store />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/practice" element={<PracticeSetup />} />
              <Route path="/friend-match" element={<FriendMatch />} />
              <Route path="/history" element={<div className="pt-24 px-12 text-zinc-500 uppercase tracking-widest text-center">瀵规垬鍘嗗彶鍗冲皢涓婄嚎</div>} />
            </Routes>
          </Suspense>
        </main>

        {isRulebookOpen && (
          <Suspense fallback={null}>
            <Rulebook isOpen={isRulebookOpen} onClose={() => setIsRulebookOpen(false)} />
          </Suspense>
        )}
      </div>
    </Router>
  );
}
