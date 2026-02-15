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
        <div className="mb-4 text-5xl">✨</div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="mt-2 text-gray-400">{t('subtitle')}</p>
      </div>
      <div className="text-center">
        <span className="text-5xl font-bold text-luna-purple">{t('price')}</span>
        <span className="ml-2 text-gray-400">{t('oneTime')}</span>
      </div>
      <div className="space-y-3">
        {features.map(f => (
          <div key={f} className="flex items-center gap-3 rounded-xl border border-white/10 bg-midnight-light p-4">
            <span className="text-luna-green">✓</span>
            <span>{t(f)}</span>
          </div>
        ))}
      </div>
      <button onClick={handlePurchase} disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-luna-purple to-luna-blue py-4 text-lg font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50">
        {loading ? '...' : t('buyNow')}
      </button>
      <p className="text-center text-sm text-gray-500">{t('guarantee')}</p>
    </div>
  );
}
