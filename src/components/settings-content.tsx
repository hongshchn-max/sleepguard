'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { CoachPersonality } from '@/lib/types';
import { FREE_PERSONALITIES, PREMIUM_PERSONALITIES } from '@/lib/types';

export function SettingsContent() {
  const t = useTranslations('settings');
  const tOnboard = useTranslations('onboarding');
  const tAuth = useTranslations('auth');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const [bedtime, setBedtime] = useState('23:00');
  const [waketime, setWaketime] = useState('07:00');
  const [personality, setPersonality] = useState<CoachPersonality>('gentle');
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('user_profiles').select('*').eq('id', user.id).single();
      if (data) {
        setBedtime(data.target_bedtime);
        setWaketime(data.target_waketime);
        setPersonality(data.coach_personality as CoachPersonality);
        setIsPremium(data.is_premium);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('user_profiles').update({
      target_bedtime: bedtime, target_waketime: waketime, coach_personality: personality, updated_at: new Date().toISOString(),
    }).eq('id', user.id);
    setSaving(false);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  if (loading) return <div className="flex h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-spectral border-t-transparent" /></div>;

  const allPersonalities: CoachPersonality[] = [...FREE_PERSONALITIES, ...PREMIUM_PERSONALITIES];

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4 pt-8">
      <h1 className="font-display text-2xl font-light">{t('title')}</h1>

      <div className="dream-glass space-y-4 rounded-xl p-4">
        <h2 className="font-semibold text-white/60">{t('profile')}</h2>
        <div>
          <label className="mb-1 block text-sm text-white/45">{t('bedtime')}</label>
          <input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)}
            className="w-full rounded-lg border border-spectral/8 bg-void px-4 py-3 text-white focus:border-spectral-dim focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/45">{t('waketime')}</label>
          <input type="time" value={waketime} onChange={e => setWaketime(e.target.value)}
            className="w-full rounded-lg border border-spectral/8 bg-void px-4 py-3 text-white focus:border-spectral-dim focus:outline-none" />
        </div>
      </div>

      <div className="dream-glass space-y-4 rounded-xl p-4">
        <h2 className="font-semibold text-white/60">{t('coachPersonality')}</h2>
        <div className="grid grid-cols-2 gap-2">
          {allPersonalities.map(p => {
            const isPremiumP = PREMIUM_PERSONALITIES.includes(p);
            const disabled = isPremiumP && !isPremium;
            return (
              <button key={p} onClick={() => !disabled && setPersonality(p)} disabled={disabled}
                className={cn('rounded-lg border p-3 text-left text-sm transition-all',
                  personality === p ? 'border-spectral bg-spectral/10' : disabled ? 'border-spectral/5 opacity-50' : 'border-spectral/8 hover:border-spectral/20')}>
                <div className="font-medium">{tOnboard(`personality${p.charAt(0).toUpperCase() + p.slice(1)}` as any)}</div>
                {disabled && <span className="text-xs text-liminal-gold">{tOnboard('premiumOnly')}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="dream-glass space-y-3 rounded-xl p-4">
        <h2 className="font-semibold text-white/60">{t('account')}</h2>
        <div className="flex items-center justify-between">
          <span className="text-white/45">{t('premiumStatus')}</span>
          {isPremium
            ? <span className="rounded-full bg-verdant-mist/20 px-3 py-1 text-sm text-verdant-mist">{t('active')}</span>
            : <Link href="/premium" className="text-sm text-spectral hover:text-spectral-light">{t('inactive')} {'\u2192'}</Link>}
        </div>
      </div>

      <button onClick={handleSave} disabled={saving}
        className="w-full rounded-lg bg-spectral py-3 font-semibold text-void transition-colors hover:bg-spectral-light disabled:opacity-50">
        {saving ? '...' : tCommon('save')}
      </button>

      <button onClick={handleLogout} className="w-full rounded-lg border border-spectral/8 py-3 text-white/45 transition-colors hover:text-white">
        {tAuth('logout')}
      </button>
    </div>
  );
}
