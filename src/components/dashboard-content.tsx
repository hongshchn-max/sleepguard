'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/client';
import { getCountdown, getSessionDate, cn } from '@/lib/utils';

interface Profile {
  target_bedtime: string;
  target_waketime: string;
  timezone: string;
  current_streak: number;
  is_premium: boolean;
  display_name: string | null;
}

interface TodayLog {
  achieved: boolean | null;
  actual_bedtime: string | null;
}

export function DashboardContent() {
  const t = useTranslations('dashboard');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [todayLog, setTodayLog] = useState<TodayLog | null>(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0, isPast: false, totalSeconds: 0 });
  const [showLogModal, setShowLogModal] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: prof } = await supabase.from('user_profiles').select('*').eq('id', user.id).single();
      if (prof) {
        setProfile(prof);
        const sessionDate = getSessionDate(prof.timezone);
        const { data: log } = await supabase.from('sleep_logs').select('*').eq('user_id', user.id).eq('session_date', sessionDate).single();
        if (log) setTodayLog(log);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!profile) return;
    const update = () => setCountdown(getCountdown(profile.target_bedtime, profile.timezone));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [profile]);

  if (!profile) {
    return <div className="flex h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-luna-purple border-t-transparent" /></div>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4 pt-8">
      <h1 className="text-2xl font-bold">{t('greeting')}{profile.display_name ? `, ${profile.display_name}` : ''}</h1>

      {/* Countdown */}
      <div className={cn('rounded-2xl p-6 text-center', countdown.isPast ? 'bg-luna-pink/10 border border-luna-pink/20' : 'bg-luna-purple/10 border border-luna-purple/20')}>
        <p className="mb-2 text-sm text-gray-400">{countdown.isPast ? t('pastBedtime') : t('bedtimeIn')}</p>
        <div className="flex items-center justify-center gap-2 text-4xl font-bold tabular-nums">
          <span>{String(countdown.hours).padStart(2, '0')}</span>
          <span className="text-gray-500">{t('hours')}</span>
          <span>{String(countdown.minutes).padStart(2, '0')}</span>
          <span className="text-gray-500">{t('minutes')}</span>
          <span className="text-2xl">{String(countdown.seconds).padStart(2, '0')}</span>
          <span className="text-lg text-gray-500">{t('seconds')}</span>
        </div>
        {countdown.isPast && (
          <Link href="/chat" className="mt-4 inline-block rounded-lg bg-luna-purple px-6 py-3 font-semibold text-white transition-all hover:bg-luna-purple-light hover:scale-105">
            {t('talkToLuna')}
          </Link>
        )}
      </div>

      {/* Streak */}
      <div className="rounded-xl border border-white/10 bg-midnight-light p-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          <div>
            {profile.current_streak > 0
              ? <p className="text-lg font-bold">{profile.current_streak} {t('streak')}</p>
              : <p className="text-gray-400">{t('streakEmpty')}</p>}
          </div>
        </div>
      </div>

      {/* Today's Status */}
      <div className="rounded-xl border border-white/10 bg-midnight-light p-4">
        <h3 className="mb-3 text-sm font-medium text-gray-400">{t('todayStatus')}</h3>
        <div className="flex items-center justify-between">
          <span className={cn('rounded-full px-3 py-1 text-sm font-medium',
            todayLog === null ? 'bg-gray-500/20 text-gray-400' : todayLog.achieved ? 'bg-luna-green/20 text-luna-green' : 'bg-luna-pink/20 text-luna-pink')}>
            {todayLog === null ? t('statusPending') : todayLog.achieved ? t('statusAchieved') : t('statusMissed')}
          </span>
          <button onClick={() => setShowLogModal(true)} className="rounded-lg bg-luna-purple/20 px-4 py-2 text-sm text-luna-purple transition-colors hover:bg-luna-purple/30">
            {t('logSleep')}
          </button>
        </div>
      </div>

      {showLogModal && <SleepLogModal profile={profile} onClose={() => setShowLogModal(false)} onLogged={(log) => { setTodayLog(log); setShowLogModal(false); }} />}
    </div>
  );
}

function SleepLogModal({ profile, onClose, onLogged }: { profile: Profile; onClose: () => void; onLogged: (log: TodayLog) => void }) {
  const t = useTranslations('dashboard');
  const tc = useTranslations('common');
  const [bedtime, setBedtime] = useState('');
  const [waketime, setWaketime] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLog() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const sessionDate = getSessionDate(profile.timezone);
    const [targetH, targetM] = profile.target_bedtime.split(':').map(Number);
    const [actualH, actualM] = bedtime.split(':').map(Number);
    const achieved = (actualH * 60 + actualM) <= (targetH * 60 + targetM + 15);

    const dateStr = new Date().toISOString().split('T')[0];
    let durationMinutes = null;
    if (waketime && bedtime) {
      const bedMin = actualH * 60 + actualM;
      const [wakeH, wakeM] = waketime.split(':').map(Number);
      let wakeMin = wakeH * 60 + wakeM;
      if (wakeMin < bedMin) wakeMin += 24 * 60;
      durationMinutes = wakeMin - bedMin;
    }

    const { error } = await supabase.from('sleep_logs').upsert({
      user_id: user.id,
      session_date: sessionDate,
      target_bedtime: `${dateStr}T${profile.target_bedtime}:00`,
      actual_bedtime: `${dateStr}T${bedtime}:00`,
      actual_waketime: waketime ? `${dateStr}T${waketime}:00` : null,
      achieved,
      duration_minutes: durationMinutes,
    }, { onConflict: 'user_id,session_date' });

    if (!error) onLogged({ achieved, actual_bedtime: `${dateStr}T${bedtime}:00` });
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-sm space-y-4 rounded-2xl bg-midnight-light p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold">{t('logSleep')}</h3>
        <div>
          <label className="mb-1 block text-sm text-gray-400">{t('bedtimeLabel')}</label>
          <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-midnight px-4 py-3 text-white focus:border-luna-purple focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">{t('waketimeLabel')}</label>
          <input type="time" value={waketime} onChange={(e) => setWaketime(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-midnight px-4 py-3 text-white focus:border-luna-purple focus:outline-none" />
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-white/10 py-3 text-gray-300">{tc('cancel')}</button>
          <button onClick={handleLog} disabled={!bedtime || loading} className="flex-1 rounded-lg bg-luna-purple py-3 font-semibold text-white disabled:opacity-50">
            {loading ? '...' : tc('save')}
          </button>
        </div>
      </div>
    </div>
  );
}
