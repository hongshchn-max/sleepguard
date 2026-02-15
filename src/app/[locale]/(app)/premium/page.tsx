import { setRequestLocale } from 'next-intl/server';
import { PremiumContent } from '@/components/premium-content';

export default async function PremiumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PremiumContent />;
}
