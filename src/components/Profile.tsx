import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Image, Layout, Heart, Save, Loader2, X, Search, LogOut, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { RAY_CARDS, CARD_BACKS } from '../data/customization';
import { readJsonResponse } from '../lib/http';
import { useCardSkinSettings } from '../hooks/useCardSkinSettings';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useBattleAnimationPreference } from '../hooks/useBattleAnimations';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(user?.displayName || '玩家');
  const [favoriteCardId, setFavoriteCardId] = useState<string | null>(null);
  const [favoriteBackId, setFavoriteBackId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSelectingCard, setIsSelectingCard] = useState(false);
  const [isSelectingBack, setIsSelectingBack] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const {
    showOpponentCardSkins,
    setShowOpponentCardSkins,
    handEffectsEnabled,
    setHandEffectsEnabled
  } = useCardSkinSettings();

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      try {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
        const token = localStorage.getItem('token');
        const res = await fetch(`${BACKEND_URL}/api/user/profile`, { headers: { 'Authorization': `Bearer ${token}` }});
        const data = await readJsonResponse(res);
        setFavoriteCardId(data?.favoriteCardId || 'fav_card');
        setFavoriteBackId(data?.favoriteBackId || 'default');
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_URL}/api/user/profile`, { 
          method: 'PUT', 
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ favoriteCardId, favoriteBackId }) 
      });
      const data = await readJsonResponse(res);
      if (data?.token) {
        setAuthToken(data.token);
        socket.emit('authenticate', data.token);
      }
      if (data?.user) {
        setAuthUser(data.user);
      }
      alert('个人信息已保存');
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    socket.disconnect();
    window.location.href = '/';
  };

  const favoriteCard = RAY_CARDS.find(c => c.id === favoriteCardId);
  const favoriteBack = CARD_BACKS.find(b => b.id === favoriteBackId);

  if (loading) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background - Leiya Card */}
      <div 
        className="fixed inset-0 z-0 opacity-20 transition-all duration-1000"
        style={{
          backgroundImage: `url("${favoriteCard?.url || '/assets/fav_card/fav_card.jpg'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-[1]" />

      {/* Content */}
      <div className="relative z-10 pt-24 px-4 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header with back & logout */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-16 gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto">
              <div className="flex items-center justify-between w-full md:w-auto px-2">
                <button onClick={() => navigate('/')} className="p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="md:hidden flex items-center gap-2">
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="p-2 bg-red-600 rounded-lg"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-white" />}
                  </button>
                  <button onClick={handleLogout} className="p-2 bg-zinc-800 rounded-lg">
                    <LogOut className="w-4 h-4 text-zinc-300" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto px-2">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-red-600 flex items-center justify-center overflow-hidden border-4 border-zinc-800 shadow-[0_0_50px_rgba(220,38,38,0.2)] shrink-0">
                  {user?.photoURL ? <img src={user.photoURL} className="w-full h-full object-cover" /> : <img src="assets/icons/myself.JPG" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                  <input 
                    className="text-xl md:text-3xl font-black italic tracking-tighter mb-1 bg-transparent border-b-2 border-transparent focus:border-red-600 focus:outline-none transition-all w-full"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                  />
                  <p className="text-zinc-500 tracking-widest text-[10px] md:text-xs">编号：{user?.uid?.slice(0, 8) || user?.uid}</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-full font-bold text-sm tracking-tighter flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                保存修改
              </button>
              <button 
                onClick={handleLogout}
                className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-full font-bold text-sm tracking-tighter flex items-center gap-2 transition-all text-zinc-300 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                登出
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div onClick={() => setIsSelectingCard(true)}>
              <SettingCard 
                title="设置背景" 
                icon={<Heart className="w-6 h-6" />} 
                description={favoriteCard ? `当前: ${favoriteCard.name}` : "选择主界面背景图片"} 
              />
            </div>
            <div onClick={() => setIsSelectingBack(true)}>
              <SettingCard 
                title="设置卡背图案" 
                icon={<Layout className="w-6 h-6" />} 
                description={favoriteBack ? `当前: ${favoriteBack.name}` : "在对战中展示你的个性化卡背"} 
              />
            </div>
            <PreferenceSettingsCard>
              <PreferenceToggleRow
                title="手牌特效"
                description={handEffectsEnabled ? '己方手牌使用扇形排列、悬停放大，并可向上拖动打出卡牌' : '关闭后恢复原本手牌布局和点击行为'}
                checked={handEffectsEnabled}
                onChange={setHandEffectsEnabled}
              />
              <PreferenceToggleRow
                title="显示对手卡牌皮肤"
                description={showOpponentCardSkins ? '对局中显示对手使用的卡牌皮肤' : '对局中忽略对手卡牌皮肤，仅显示原卡图'}
                checked={showOpponentCardSkins}
                onChange={setShowOpponentCardSkins}
              />
            </PreferenceSettingsCard>
  const [battleAnimationsEnabled, setBattleAnimationsEnabled] = useBattleAnimationPreference();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-8 md:px-8 md:py-12">
        <div className="mb-10 flex items-center gap-4 pt-12 md:pt-16">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tight md:text-3xl">设置</h1>
            <p className="mt-1 text-sm text-zinc-500">调整本机对战显示偏好</p>
          </div>
        </div>

        <section className="rounded-lg border border-white/10 bg-zinc-950/80">
          <div className="flex items-center justify-between gap-4 p-5 md:p-6">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f27d26]/15 text-[#f27d26]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-white">战斗动画</h2>
                <p className="mt-1 text-sm text-zinc-500">显示卡牌移动、伤害和宣言等战斗动画</p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={battleAnimationsEnabled}
              onClick={() => setBattleAnimationsEnabled(!battleAnimationsEnabled)}
              className={[
                'relative h-8 w-14 shrink-0 rounded-full border transition-colors',
                battleAnimationsEnabled
                  ? 'border-[#f27d26]/50 bg-[#f27d26]'
                  : 'border-white/10 bg-zinc-800'
              ].join(' ')}
            >
              <span
                className={[
                  'absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform',
                  battleAnimationsEnabled ? 'translate-x-6' : 'translate-x-1'
                ].join(' ')}
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const SettingCard = ({ title, icon, description }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 hover:border-red-500/50 transition-all cursor-pointer group"
  >
    <div className="flex items-center gap-4 mb-3">
      <div className="p-3 rounded-xl bg-black/60 group-hover:bg-red-600 transition-colors">{icon}</div>
      <h2 className="text-lg font-bold italic tracking-tighter">{title}</h2>
    </div>
    <p className="text-zinc-500 text-sm">{description}</p>
  </motion.div>
);

const PreferenceSettingsCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 hover:border-red-500/50 transition-all group md:col-span-2"
  >
    <div className="flex items-center gap-4 mb-5">
      <div className="p-3 rounded-xl bg-black/60 group-hover:bg-red-600 transition-colors">
        <Settings className="w-6 h-6" />
      </div>
      <div>
        <h2 className="text-lg font-bold italic tracking-tighter">偏好设置</h2>
        <p className="text-zinc-500 text-sm">管理对局显示和手牌交互偏好</p>
      </div>
    </div>
    <div className="grid gap-3">
      {children}
    </div>
  </motion.div>
);

const PreferenceToggleRow = ({
  title,
  description,
  checked,
  onChange
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="rounded-xl border border-white/5 bg-black/30 px-4 py-3">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3 className="text-sm font-bold tracking-tight text-white">{title}</h3>
        <p className="text-zinc-500 text-sm">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-1 inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors',
          checked ? 'border-red-400/50 bg-red-600' : 'border-zinc-600 bg-zinc-900'
        )}
        title={checked ? `关闭${title}` : `开启${title}`}
      >
        <span
          className={cn(
            'absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-lg transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  </div>
);
