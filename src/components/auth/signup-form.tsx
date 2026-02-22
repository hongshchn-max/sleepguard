'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/client';

export function SignupForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/onboarding');
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mb-4 font-display text-5xl font-light text-spectral">{'\u25CE'}</div>
        <h1 className="font-display text-3xl font-light text-white">Dormiveglia</h1>
        <p className="mt-2 text-white/45">{t('signup')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-somnia-rose/10 p-3 text-sm text-somnia-rose">{error}</div>
        )}

        <div>
          <label className="mb-1 block text-sm text-white/60">{t('email')}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-spectral/8 bg-void-light px-4 py-3 text-white placeholder-white/25 focus:border-spectral-dim focus:outline-none focus:ring-1 focus:ring-spectral-dim" required />
        </div>

        <div>
          <label className="mb-1 block text-sm text-white/60">{t('password')}</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-spectral/8 bg-void-light px-4 py-3 text-white placeholder-white/25 focus:border-spectral-dim focus:outline-none focus:ring-1 focus:ring-spectral-dim" minLength={6} required />
        </div>

        <div>
          <label className="mb-1 block text-sm text-white/60">{t('confirmPassword')}</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-spectral/8 bg-void-light px-4 py-3 text-white placeholder-white/25 focus:border-spectral-dim focus:outline-none focus:ring-1 focus:ring-spectral-dim" minLength={6} required />
        </div>

        <button type="submit" disabled={loading}
          className="w-full rounded-lg bg-spectral py-3 font-semibold text-void transition-colors hover:bg-spectral-light disabled:opacity-50">
          {loading ? '...' : t('signup')}
        </button>
      </form>

      <p className="text-center text-sm text-white/45">
        {t('hasAccount')}{' '}
        <Link href="/login" className="text-spectral hover:text-spectral-light">{t('login')}</Link>
      </p>
    </div>
  );
}
