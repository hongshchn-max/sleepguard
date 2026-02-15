import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { PWARegister } from '@/components/pwa-register';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'SleepGuard - AI Sleep Coach',
  description: 'Your AI-powered sleep coach that helps you put down your phone and sleep better.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SleepGuard',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f0e17',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className="min-h-screen text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          <PWARegister />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
