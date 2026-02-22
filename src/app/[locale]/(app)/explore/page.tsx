import { setRequestLocale } from 'next-intl/server';
import { ExplorationUI } from '@/components/story/exploration-ui';

export default async function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ExplorationUI />;
}
