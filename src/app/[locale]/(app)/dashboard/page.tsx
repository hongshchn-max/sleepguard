import { setRequestLocale } from 'next-intl/server';
import { DashboardContent } from '@/components/dashboard-content';

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DashboardContent />;
}
