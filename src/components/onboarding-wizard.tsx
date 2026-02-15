'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import type { CoachPersonality } from '@/lib/types';

const personalities: { key: CoachPersonality; premium: boolean }[] = [
  { key: 'gentle', premium: false },
  { key: 'strict', premium: false },
  { key: 'humor', premium: true },
  { key: 'science', premium: true },
];

export function OnboardingWizard() {
  const t = useTranslations('onboarding');
  const tc = useTranslations('common');
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [bedtime, setBedtime] = useState('23:00');
  const [waketime, setWaketime] = useState('07:00');
  const [personality, setPersonality] = useState<CoachPersonality>('gentle');
  const [loading, setLoading] = useState(false);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  async function handleComplete() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    await supabase.from('user_profiles').upsert({
      id: user.id,
      email: user.email!,
      target_bedtime: bedtime,
      target_waketime: waketime,
      timezone,
      locale: document.documentElement.lang || 'en',
      coach_personality: personality,
    });

    router.push('/dashboard');
  }

  const steps = [
    <div key="welcome" className="space-y-6 text-center">
      <div className="text-6xl">🌙</div>
      <h1 className="text-3xl font-bold">{t('welcome')}</h1>
      <p className="text-gray-400">{t('subtitle')}</p>
      <button onClick={() => setStep(1)}
        className="w-full rounded-lg bg-luna-purple py-3 font-semibold text-white transition-colors hover:bg-luna-purple-light">
        {t('letsGo')}
      </button>
    </div>,

    <div key="times" className="space-y-6">
      <h2 className="text-xl font-semibold">{t('bedtime')}</h2>
      <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-midnight-light px-4 py-4 text-center text-2xl text-white focus:border-luna-purple focus:outline-none" />
      <h2 className="text-xl font-semibold">{t('waketime')}</h2>
      <input type="time" value={waketime} onChange={(e) => setWaketime(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-midnight-light px-4 py-4 text-center text-2xl text-white focus:border-luna-purple focus:outline-none" />
      <div className="flex gap-3">
        <button onClick={() => setStep(0)} className="flex-1 rounded-lg border border-white/10 py-3 text-gray-300">{tc('back')}</button>
        <button onClick={() => setStep(2)} className="flex-1 rounded-lg bg-luna-purple py-3 font-semibold text-white">{tc('next')}</button>
      </div>
    </div>,

    <div key="personality" className="space-y-6">
      <h2 className="text-xl font-semibold">{t('personality')}</h2>
      <div className="grid grid-cols-2 gap-3">
        {personalities.map((p) => (
          <button key={p.key} onClick={() => !p.premium && setPersonality(p.key)}
            className={cn(
              'relative rounded-lg border p-4 text-left transition-all',
              personality === p.key ? 'border-luna-purple bg-luna-purple/10'
                : p.premium ? 'border-white/5 bg-midnight-light/50 opacity-60'
                : 'border-white/10 bg-midnight-light hover:border-white/20'
            )}>
            {p.premium && (
              <span className="absolute right-2 top-2 rounded-full bg-luna-gold/20 px-2 py-0.5 text-xs text-luna-gold">
                {t('premiumOnly')}
              </span>
            )}
            <div className="font-semibold">
              {t(`personality${p.key.charAt(0).toUpperCase() + p.key.slice(1)}` as any)}
            </div>
            <div className="mt-1 text-sm text-gray-400">
              {t(`personality${p.key.charAt(0).toUpperCase() + p.key.slice(1)}Desc` as any)}
            </div>
          </button>
        ))}
      </div>
      <button onClick={handleComplete} disabled={loading}
        className="w-full rounded-lg bg-luna-purple py-3 font-semibold text-white transition-colors hover:bg-luna-purple-light disabled:opacity-50">
        {loading ? '...' : t('letsGo')}
      </button>
    </div>,
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={cn('h-2 w-2 rounded-full transition-colors', i === step ? 'bg-luna-purple' : 'bg-white/20')} />
        ))}
      </div>
      {steps[step]}
    </div>
  );
}
