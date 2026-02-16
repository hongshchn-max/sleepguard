'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function LandingContent() {
  const t = useTranslations('landing');

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 pt-20 text-center">
        <div className="mb-6 text-7xl">🌙</div>
        <h1 className="text-4xl font-bold leading-tight sm:text-6xl">{t('hero')}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">{t('heroSub')}</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/signup" className="rounded-xl bg-luna-purple px-8 py-4 text-lg font-bold text-white transition-all hover:bg-luna-purple-light hover:scale-105">
            {t('cta')}
          </Link>
          <span className="text-sm text-gray-500">{t('ctaFree')}</span>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-4xl px-4">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { icon: '🤖', title: t('feature1Title'), desc: t('feature1Desc') },
            { icon: '🔔', title: t('feature2Title'), desc: t('feature2Desc') },
            { icon: '📊', title: t('feature3Title'), desc: t('feature3Desc') },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-midnight-light p-6 text-center">
              <div className="mb-4 text-4xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-2xl px-4 text-center">
        <h2 className="mb-12 text-3xl font-bold">{t('howItWorks')}</h2>
        <div className="space-y-8">
          {[
            { step: '1', title: t('step1'), desc: t('step1Desc') },
            { step: '2', title: t('step2'), desc: t('step2Desc') },
            { step: '3', title: t('step3'), desc: t('step3Desc') },
          ].map(s => (
            <div key={s.step} className="flex items-start gap-4 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-luna-purple text-lg font-bold">{s.step}</div>
              <div><h3 className="font-bold">{s.title}</h3><p className="text-sm text-gray-400">{s.desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-xl px-4 text-center">
        <blockquote className="rounded-2xl border border-white/10 bg-midnight-light p-8">
          <p className="text-lg italic text-gray-300">&ldquo;{t('testimonial')}&rdquo;</p>
          <p className="mt-4 text-sm text-gray-500">— {t('testimonialAuthor')}</p>
        </blockquote>
      </div>

      <div className="mx-auto mt-24 max-w-lg px-4 pb-12 text-center">
        <Link href="/signup" className="inline-block rounded-xl bg-luna-purple px-8 py-4 text-lg font-bold text-white transition-all hover:bg-luna-purple-light hover:scale-105">
          {t('cta')}
        </Link>
      </div>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm text-gray-500">
          <Link href="/legal/privacy" className="hover:text-gray-300">Privacy Policy</Link>
          <Link href="/legal/terms" className="hover:text-gray-300">Terms of Service</Link>
          <Link href="/legal/refund" className="hover:text-gray-300">Refund Policy</Link>
          <Link href="/legal/tokushoho" className="hover:text-gray-300">特定商取引法</Link>
          <span>&copy; 2026 SleepGuard</span>
        </div>
      </footer>
    </div>
  );
}
