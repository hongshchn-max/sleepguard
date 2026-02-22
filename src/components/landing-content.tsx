'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function LandingContent() {
  const t = useTranslations('landing');

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 pt-20 text-center">
        <div className="mb-6 font-display text-7xl font-light tracking-wide text-spectral">&#x25CE;</div>
        <h1 className="font-display text-4xl font-light leading-tight tracking-wide sm:text-6xl">{t('hero')}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/45">{t('heroSub')}</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/signup" className="rounded-xl bg-spectral px-8 py-4 text-lg font-bold text-void transition-all hover:bg-spectral-light hover:scale-105">
            {t('cta')}
          </Link>
          <span className="text-sm text-white/35">{t('ctaFree')}</span>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-4xl px-4">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { icon: '\u2727', title: t('feature1Title'), desc: t('feature1Desc') },
            { icon: '\u25C7', title: t('feature2Title'), desc: t('feature2Desc') },
            { icon: '\u2726', title: t('feature3Title'), desc: t('feature3Desc') },
          ].map((f, i) => (
            <div key={i} className="dream-glass dream-glow rounded-2xl p-6 text-center">
              <div className="mb-4 font-display text-4xl text-spectral">{f.icon}</div>
              <h3 className="mb-2 font-display text-lg font-medium">{f.title}</h3>
              <p className="text-sm text-white/45">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-2xl px-4 text-center">
        <h2 className="mb-12 font-display text-3xl font-light">{t('howItWorks')}</h2>
        <div className="space-y-8">
          {[
            { step: '1', title: t('step1'), desc: t('step1Desc') },
            { step: '2', title: t('step2'), desc: t('step2Desc') },
            { step: '3', title: t('step3'), desc: t('step3Desc') },
          ].map(s => (
            <div key={s.step} className="flex items-start gap-4 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-spectral text-lg font-bold text-void">{s.step}</div>
              <div><h3 className="font-display font-medium">{s.title}</h3><p className="text-sm text-white/45">{s.desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-xl px-4 text-center">
        <blockquote className="dream-glass rounded-2xl p-8">
          <p className="font-display text-lg italic text-white/70">&ldquo;{t('testimonial')}&rdquo;</p>
          <p className="mt-4 text-sm text-white/35">— {t('testimonialAuthor')}</p>
        </blockquote>
      </div>

      <div className="mx-auto mt-24 max-w-lg px-4 pb-12 text-center">
        <Link href="/signup" className="inline-block rounded-xl bg-spectral px-8 py-4 text-lg font-bold text-void transition-all hover:bg-spectral-light hover:scale-105">
          {t('cta')}
        </Link>
      </div>

      <footer className="border-t border-spectral/8 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm text-white/35">
          <Link href="/legal/privacy" className="hover:text-white/60">Privacy Policy</Link>
          <Link href="/legal/terms" className="hover:text-white/60">Terms of Service</Link>
          <Link href="/legal/refund" className="hover:text-white/60">Refund Policy</Link>
          <Link href="/legal/tokushoho" className="hover:text-white/60">{'\u7279\u5B9A\u5546\u53D6\u5F15\u6CD5'}</Link>
          <span>&copy; 2026 Dormiveglia</span>
        </div>
      </footer>
    </div>
  );
}
