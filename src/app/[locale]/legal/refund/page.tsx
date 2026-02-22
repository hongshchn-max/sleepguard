import { setRequestLocale } from 'next-intl/server';

export default async function RefundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Refund Policy</h1>
      <p className="mb-4 text-sm text-white/45">Last updated: February 16, 2026</p>

      <div className="space-y-6 text-white/60 leading-relaxed">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">30-Day Money-Back Guarantee</h2>
          <p>We offer a <strong>30-day money-back guarantee</strong> on all premium purchases. If you are not satisfied with Dormiveglia Premium for any reason, you can request a full refund within 30 days of purchase.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">How to Request a Refund</h2>
          <p>Send an email to <a href="mailto:koh923@icloud.com" className="text-spectral hover:underline">koh923@icloud.com</a> with:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Your account email address</li>
            <li>Date of purchase</li>
            <li>Reason for refund (optional)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">Processing Time</h2>
          <p>Refunds are processed within 5-10 business days. The refund will be credited to the original payment method used at purchase.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">After Refund</h2>
          <p>Once a refund is processed, your account will be downgraded to the free plan. You will retain access to free features including up to 3 AI conversations per night.</p>
        </section>
      </div>
    </div>
  );
}
