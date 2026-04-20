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
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRulebookOpen, setIsRulebookOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [sendingCode, setSendingCode] = useState(false);
  const [registerSubmitting, setRegisterSubmitting] = useState(false);
  const [sendCodeCooldown, setSendCodeCooldown] = useState(0);

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

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(preloadRoutes, { timeout: 1500 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timer = window.setTimeout(preloadRoutes, 800);
    return () => window.clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    if (sendCodeCooldown <= 0) return;

    const timer = window.setInterval(() => {
      setSendCodeCooldown(current => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [sendCodeCooldown]);

  const handleAuthSuccess = (token: string, authUser: any) => {
    setAuthToken(token);
    setAuthUser(authUser);
    setUser(authUser);

    if (!socket.connected) {
      socket.once('connect', () => socket.emit('authenticate', token));
      socket.connect();
      return;
    }

    socket.emit('authenticate', token);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmitting(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        handleAuthSuccess(data.token, data.user);
      } else {
        setLoginError(data.error || '登录失败');
      }
    } catch (err) {
      setLoginError('网络错误');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleSendVerificationCode = async () => {
    setRegisterError('');
    setRegisterMessage('');
    setSendingCode(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/register/send-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword
        })
      });
      const data = await res.json();

      if (res.ok) {
        setRegisterMessage(data.message || '验证码已发送，请前往邮箱查收');
        setSendCodeCooldown(60);
      } else {
        setRegisterError(data.error || '验证码发送失败');
      }
    } catch (err) {
      setRegisterError('网络错误');
    } finally {
      setSendingCode(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterMessage('');
    setRegisterSubmitting(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
          verificationCode
        })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        handleAuthSuccess(data.token, data.user);
      } else {
        setRegisterError(data.error || '注册失败');
      }
    } catch (err) {
      setRegisterError('网络错误');
    } finally {
      setRegisterSubmitting(false);
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

          <div className="mb-6 grid grid-cols-2 rounded-2xl bg-black/60 p-1 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setLoginError('');
              }}
              className={`rounded-xl py-3 text-sm font-bold transition-all ${authMode === 'login' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              登录
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setRegisterError('');
                setRegisterMessage('');
              }}
              className={`rounded-xl py-3 text-sm font-bold transition-all ${authMode === 'register' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              注册
            </button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="用户名或邮箱"
                value={loginUsername}
                onChange={e => setLoginUsername(e.target.value)}
                className="p-3 bg-black border border-white/20 rounded-lg text-white"
              />
              <input
                type="password"
                placeholder="密码"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="p-3 bg-black border border-white/20 rounded-lg text-white"
              />
              {loginError && <div className="text-red-500 text-sm font-bold">{loginError}</div>}
              <button
                type="submit"
                disabled={loginSubmitting}
                className="w-full py-4 mt-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-60"
              >
                {loginSubmitting ? '登录中...' : '登录'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="用户名"
                value={registerUsername}
                onChange={e => setRegisterUsername(e.target.value)}
                className="p-3 bg-black border border-white/20 rounded-lg text-white"
              />
              <input
                type="email"
                placeholder="邮箱"
                value={registerEmail}
                onChange={e => setRegisterEmail(e.target.value)}
                className="p-3 bg-black border border-white/20 rounded-lg text-white"
              />
              <input
                type="password"
                placeholder="密码"
                value={registerPassword}
                onChange={e => setRegisterPassword(e.target.value)}
                className="p-3 bg-black border border-white/20 rounded-lg text-white"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="6位验证码"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  className="flex-1 p-3 bg-black border border-white/20 rounded-lg text-white"
                />
                <button
                  type="button"
                  onClick={handleSendVerificationCode}
                  disabled={sendingCode || sendCodeCooldown > 0}
                  className="px-4 py-3 rounded-lg bg-red-600 text-white font-bold text-sm hover:bg-red-500 transition-all disabled:opacity-60 disabled:hover:bg-red-600"
                >
                  {sendingCode ? '发送中...' : sendCodeCooldown > 0 ? `${sendCodeCooldown}s` : '发送验证码'}
                </button>
              </div>
              {registerMessage && <div className="text-emerald-400 text-sm font-bold">{registerMessage}</div>}
              {registerError && <div className="text-red-500 text-sm font-bold">{registerError}</div>}
              <button
                type="submit"
                disabled={registerSubmitting}
                className="w-full py-4 mt-2 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-60"
              >
                {registerSubmitting ? '注册中...' : '完成注册'}
              </button>
              <p className="text-zinc-500 text-xs leading-relaxed">
                注册成功后会自动发放 100000 金币、100000 卡晶，并为每张卡初始化 4 张。
              </p>
            </form>
          )}
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
              <Route path="/history" element={<div className="pt-24 px-12 text-zinc-500 uppercase tracking-widest text-center">鐎佃鍨崢鍡楀蕉閸楀啿鐨㈡稉濠勫殠</div>} />
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
