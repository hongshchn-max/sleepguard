import { setRequestLocale } from 'next-intl/server';
import { BottomNav } from '@/components/bottom-nav';
import { StoryProvider } from '@/components/story/story-provider';
import { ScreenOffTracker } from '@/components/story/screen-off-tracker';

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <StoryProvider>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 pb-20">{children}</main>
        <BottomNav />
      </div>
      <ScreenOffTracker />
    </StoryProvider>
  );
}
