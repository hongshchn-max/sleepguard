import { setRequestLocale } from 'next-intl/server';

export default async function TokushohoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">特定商取引法に基づく表記</h1>
      <p className="mb-8 text-sm text-white/45">Notation based on the Specified Commercial Transactions Act</p>

      <div className="space-y-4">
        <table className="w-full border-collapse">
          <tbody className="divide-y divide-white/10">
            <tr>
              <td className="py-3 pr-4 text-sm font-medium text-white/45 align-top w-1/3">販売事業者</td>
              <td className="py-3 text-white/60">石川 洪</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm font-medium text-white/45 align-top">所在地</td>
              <td className="py-3 text-white/60">請求があった場合に遅滞なく開示いたします</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm font-medium text-white/45 align-top">電話番号</td>
              <td className="py-3 text-white/60">請求があった場合に遅滞なく開示いたします</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm font-medium text-white/45 align-top">メールアドレス</td>
              <td className="py-3 text-white/60"><a href="mailto:koh923@icloud.com" className="text-spectral hover:underline">koh923@icloud.com</a></td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm font-medium text-white/45 align-top">販売URL</td>
              <td className="py-3 text-white/60 break-all">https://sleepguard-kohs-projects-45c123ca.vercel.app</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm font-medium text-white/45 align-top">販売価格</td>
              <td className="py-3 text-white/60">プレミアムプラン: $6.99（税込）/ 買い切り</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm font-medium text-white/45 align-top">商品の引き渡し時期</td>
              <td className="py-3 text-white/60">決済完了後、即時にプレミアム機能が有効化されます</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm font-medium text-white/45 align-top">支払方法</td>
              <td className="py-3 text-white/60">クレジットカード（Stripe経由）</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm font-medium text-white/45 align-top">返品・返金</td>
              <td className="py-3 text-white/60">購入後30日以内であれば、理由を問わず全額返金いたします。返金をご希望の場合はメールにてご連絡ください。</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm font-medium text-white/45 align-top">動作環境</td>
              <td className="py-3 text-white/60">モダンブラウザ（Chrome, Safari, Firefox, Edge）。PWAとしてスマートフォンのホーム画面に追加可能。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
