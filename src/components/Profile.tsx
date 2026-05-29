import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useBattleAnimationPreference } from '../hooks/useBattleAnimations';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
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
