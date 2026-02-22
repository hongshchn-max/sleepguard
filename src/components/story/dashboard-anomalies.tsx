'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useStory } from './story-provider';

/**
 * Phase 2: Visual anomalies on the dashboard.
 * Randomly shows one of: streak glitch, countdown glitch, or Luna name glitch.
 * Also shows a subtle hint text at the bottom.
 */
export function DashboardAnomalies({ children }: { children: React.ReactNode }) {
  const t = useTranslations('story');
  const { phase } = useStory();
  const [anomalyType, setAnomalyType] = useState<'streak' | 'countdown' | 'luna' | null>(null);
  const [showAnomaly, setShowAnomaly] = useState(false);

  useEffect(() => {
    if (phase !== 2) return;

    // Pick a random anomaly type
    const types: ('streak' | 'countdown' | 'luna')[] = ['streak', 'countdown', 'luna'];
    setAnomalyType(types[Math.floor(Math.random() * types.length)]);

    // Show anomaly after a random delay (5-15 seconds)
    const delay = 5000 + Math.random() * 10000;
    const showTimer = setTimeout(() => {
      setShowAnomaly(true);
      // Hide after brief flash
      setTimeout(() => setShowAnomaly(false), 300);
    }, delay);

    return () => clearTimeout(showTimer);
  }, [phase]);

  if (phase !== 2) return <>{children}</>;

  return (
    <div className="relative">
      {/* Anomaly overlay flash */}
      {showAnomaly && anomalyType === 'countdown' && (
        <div className="pointer-events-none absolute inset-0 z-40 flex items-start justify-center pt-32">
          <span className="animate-glitch font-display text-4xl font-bold text-somnia-rose/60">??:??:??</span>
        </div>
      )}
      {showAnomaly && anomalyType === 'luna' && (
        <div className="pointer-events-none absolute inset-0 z-40 flex items-start justify-center pt-8">
          <span className="animate-glitch font-display text-lg text-somnia-rose/60">L̶u̷n̸a̵</span>
        </div>
      )}

      {children}

      {/* Subtle hint at bottom */}
      <div className="px-4 pb-4 text-center">
        <p className="text-xs text-white/15 italic">{t('phase2Hint')}</p>
      </div>
    </div>
  );
}
