import { setRequestLocale } from 'next-intl/server';
import { StatsContent } from '@/components/stats-content';

export default async function StatsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StatsContent />;
}
