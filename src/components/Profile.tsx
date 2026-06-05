import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useCardSkinSettings } from '../hooks/useCardSkinSettings';
import { useBattleAnimationPreference } from '../hooks/useBattleAnimations';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const {
    showOpponentCardSkins,
    setShowOpponentCardSkins,
    handEffectsEnabled,
    setHandEffectsEnabled
  } = useCardSkinSettings();
  const [battleAnimationsEnabled, setBattleAnimationsEnabled] = useBattleAnimationPreference();

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white md:px-8 md:py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 pt-12 md:pt-16">
        <SettingsRowButton
          title="返回"
          description="回到上一页"
          icon={<ArrowLeft className="h-5 w-5" />}
          onClick={() => navigate(-1)}
        />

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
          <PreferenceToggleRow
            title="战斗动画"
            description={battleAnimationsEnabled ? '显示卡牌移动、伤害和宣言等战斗动画' : '关闭对局中的战斗动画展示'}
            checked={battleAnimationsEnabled}
            onChange={setBattleAnimationsEnabled}
          />
        </PreferenceSettingsCard>
      </div>
    </div>
  );
};

const PreferenceSettingsCard = ({ children }: { children: React.ReactNode }) => (
  <section className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950/80">
    <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 md:px-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/15 text-red-400">
        <Settings className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <h1 className="text-base font-bold text-white">偏好设置</h1>
        <p className="text-sm text-zinc-500">管理对局显示和手牌交互偏好</p>
      </div>
    </div>
    <div className="divide-y divide-white/10">
      {children}
    </div>
  </section>
);

const SettingsRowButton = ({
  title,
  description,
  icon,
  onClick
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center gap-4 rounded-lg border border-white/10 bg-zinc-950/80 px-5 py-4 text-left transition-colors hover:border-red-500/40 hover:bg-zinc-900 md:px-6"
  >
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-zinc-300">
      {icon}
    </span>
    <span className="min-w-0">
      <span className="block text-sm font-bold text-white">{title}</span>
      <span className="block text-sm text-zinc-500">{description}</span>
    </span>
  </button>
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
  <div className="flex min-h-20 items-center justify-between gap-4 px-5 py-4 md:px-6">
    <div className="min-w-0">
      <h2 className="text-sm font-bold text-white">{title}</h2>
      <p className="mt-1 text-sm text-zinc-500">{description}</p>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors',
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
);
