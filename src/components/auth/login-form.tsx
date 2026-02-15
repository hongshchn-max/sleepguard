'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/client';

export function LoginForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mb-4 text-5xl">🌙</div>
        <h1 className="text-3xl font-bold text-white">SleepGuard</h1>
        <p className="mt-2 text-gray-400">{t('login')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">{error}</div>
        )}

        <div>
          <label className="mb-1 block text-sm text-gray-300">{t('email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-midnight-light px-4 py-3 text-white placeholder-gray-500 focus:border-luna-purple focus:outline-none focus:ring-1 focus:ring-luna-purple"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-300">{t('password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-midnight-light px-4 py-3 text-white placeholder-gray-500 focus:border-luna-purple focus:outline-none focus:ring-1 focus:ring-luna-purple"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-luna-purple py-3 font-semibold text-white transition-colors hover:bg-luna-purple-light disabled:opacity-50"
        >
          {loading ? '...' : t('login')}
        </button>
      </form>

      <p className="text-center text-sm text-gray-400">
        {t('noAccount')}{' '}
        <Link href="/signup" className="text-luna-purple hover:text-luna-purple-light">
          {t('signup')}
        </Link>
      </p>
    </div>
  );
}
