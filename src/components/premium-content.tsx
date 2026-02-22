'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const features = ['feature1', 'feature2', 'feature3', 'feature4', 'feature5'] as const;

export function PremiumContent() {
  const t = useTranslations('premium');
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (error) { console.error('Checkout error:', error); }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 p-4 pt-8">
      <div className="text-center">
        <div className="mb-4 font-display text-5xl font-light text-liminal-gold">{'\u2726'}</div>
        <h1 className="font-display text-3xl font-light">{t('title')}</h1>
        <p className="mt-2 text-white/45">{t('subtitle')}</p>
      </div>
      <div className="text-center">
        <span className="font-display text-5xl font-light text-spectral">{t('price')}</span>
        <span className="ml-2 text-white/45">{t('oneTime')}</span>
      </div>
      <div className="space-y-3">
        {features.map(f => (
          <div key={f} className="dream-glass flex items-center gap-3 rounded-xl p-4">
            <span className="text-verdant-mist">{'\u2713'}</span>
            <span>{t(f)}</span>
          </div>
        ))}
      </div>
      <button onClick={handlePurchase} disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-spectral to-ether-blue py-4 text-lg font-bold text-void transition-all hover:scale-[1.02] disabled:opacity-50">
        {loading ? '...' : t('buyNow')}
      </button>
      <p className="text-center text-sm text-white/35">{t('guarantee')}</p>
    </div>
  );
}
