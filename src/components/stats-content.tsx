'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ACHIEVEMENT_DEFINITIONS } from '@/lib/types';

export function StatsContent() {
  const t = useTranslations('stats');
  const tAch = useTranslations('achievements');
  const tNav = useTranslations('nav');
  const [tab, setTab] = useState<'week' | 'month' | 'trends'>('week');
  const [isPremium, setIsPremium] = useState(false);
  const [weeklyStats, setWeeklyStats] = useState<{ avgDuration: string; achievementRate: number; logs: { date: string; achieved: boolean }[] } | null>(null);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase.from('user_profiles').select('is_premium').eq('id', user.id).single();
      setIsPremium(profile?.is_premium || false);

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { data: logs } = await supabase.from('sleep_logs').select('*').eq('user_id', user.id)
        .gte('session_date', sevenDaysAgo.toISOString().split('T')[0]).order('session_date', { ascending: true });

      if (logs && logs.length > 0) {
        const achieved = logs.filter(l => l.achieved).length;
        const durations = logs.filter(l => l.duration_minutes).map(l => l.duration_minutes!);
        const avgDur = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;
        setWeeklyStats({
          avgDuration: `${Math.floor(avgDur / 60)}h ${avgDur % 60}m`,
          achievementRate: Math.round((achieved / logs.length) * 100),
          logs: logs.map(l => ({ date: l.session_date, achieved: l.achieved })),
        });
      }

      const { data: userAch } = await supabase.from('user_achievements').select('achievement_key').eq('user_id', user.id);
      if (userAch) setAchievements(userAch.map(a => a.achievement_key));
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4 pt-8">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <div className="flex gap-1 rounded-lg bg-midnight-light p-1">
        {(['week', 'month', 'trends'] as const).map(k => (
          <button key={k} onClick={() => setTab(k)}
            className={cn('flex-1 rounded-md py-2 text-sm font-medium transition-colors',
              tab === k ? 'bg-luna-purple text-white' : 'text-gray-400 hover:text-white')}>
            {t(k === 'week' ? 'thisWeek' : k === 'month' ? 'thisMonth' : 'trends')}
          </button>
        ))}
      </div>

      {tab === 'week' && (
        <div className="space-y-4">
          <div className="flex justify-between gap-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
              const log = weeklyStats?.logs[i];
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-500">{day}</span>
                  <div className={cn('h-8 w-8 rounded-full border-2',
                    log?.achieved ? 'border-luna-green bg-luna-green/20' : log ? 'border-luna-pink bg-luna-pink/20' : 'border-white/10')} />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-midnight-light p-4">
              <p className="text-xs text-gray-400">{t('avgDuration')}</p>
              <p className="mt-1 text-xl font-bold">{weeklyStats?.avgDuration || '--'}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-midnight-light p-4">
              <p className="text-xs text-gray-400">{t('achievementRate')}</p>
              <p className="mt-1 text-xl font-bold">{weeklyStats ? `${weeklyStats.achievementRate}%` : '--'}</p>
            </div>
          </div>
        </div>
      )}

      {(tab === 'month' || tab === 'trends') && !isPremium && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-midnight-light p-8 text-center">
          <span className="text-4xl">🔒</span>
          <p className="text-gray-400">{t(tab === 'month' ? 'monthlyPremium' : 'trendsPremium')}</p>
          <Link href="/premium" className="rounded-lg bg-luna-purple px-6 py-2 font-semibold text-white">{tNav('premium')}</Link>
        </div>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold">{t('achievements')}</h2>
        <div className="grid grid-cols-2 gap-3">
          {ACHIEVEMENT_DEFINITIONS.map(def => {
            const unlocked = achievements.includes(def.key);
            return (
              <div key={def.key} className={cn('rounded-xl border p-3',
                unlocked ? 'border-luna-gold/30 bg-luna-gold/10' : 'border-white/5 bg-midnight-light opacity-60')}>
                <div className="mb-1 text-2xl">{unlocked ? '🏆' : '🔒'}</div>
                <p className="text-sm font-medium">{tAch(def.key as any)}</p>
                <p className="text-xs text-gray-400">{tAch(`${def.key}Desc` as any)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
