import { setRequestLocale } from 'next-intl/server';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-sm text-white/45">Last updated: February 16, 2026</p>

      <div className="space-y-6 text-white/60 leading-relaxed">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">1. Information We Collect</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li><strong>Account Information:</strong> Email address and password (stored securely via Supabase Auth).</li>
            <li><strong>Sleep Data:</strong> Target bedtime, actual bedtime, wake time, and sleep duration that you voluntarily log.</li>
            <li><strong>Chat Data:</strong> Conversations with Luna (AI sleep coach), stored per session date.</li>
            <li><strong>Device Information:</strong> Push notification subscription data (if you opt in).</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">2. How We Use Your Information</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>To provide personalized AI sleep coaching via Luna.</li>
            <li>To track your sleep habits and display statistics.</li>
            <li>To send bedtime reminders (only if you enable push notifications).</li>
            <li>To process premium purchases via Stripe.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">3. Third-Party Services</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li><strong>Supabase:</strong> Authentication and database hosting (PostgreSQL).</li>
            <li><strong>Anthropic (Claude AI):</strong> Powers Luna&apos;s responses. Your messages are sent to Anthropic&apos;s API for processing.</li>
            <li><strong>Stripe:</strong> Payment processing for premium purchases. We do not store your credit card information.</li>
            <li><strong>Vercel:</strong> Application hosting.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">4. Data Security</h2>
          <p>All data is transmitted over HTTPS. Database access is protected by Row Level Security (RLS) policies, ensuring users can only access their own data.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">5. Data Retention & Deletion</h2>
          <p>You may request deletion of your account and all associated data by contacting us at the email below. Upon deletion, all sleep logs, chat history, and profile data will be permanently removed.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">6. Contact</h2>
          <p>For privacy-related inquiries: <a href="mailto:koh923@icloud.com" className="text-spectral hover:underline">koh923@icloud.com</a></p>
        </section>
      </div>
    </div>
  );
}
