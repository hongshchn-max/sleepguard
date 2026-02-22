# Dormiveglia - AI睡眠コーチPWAアプリ（Dreamcore美学）

## プロジェクト概要
「覚醒と夢のあわい」をテーマにしたAI睡眠コーチPWAアプリ。夢の案内人「Luna」が深夜スマホ使用を止めてくれる。TikTokのdreamcore美学を全面に押し出したデザイン。4言語対応（EN/JA/ZH/KO）、買い切りプレミアム($6.99)。Chapter 1ストーリーシステム「Luna's Secret」搭載。

## 技術スタック
- **フレームワーク**: Next.js 16 App Router + TypeScript
- **スタイル**: Tailwind CSS v4
- **認証/DB**: Supabase (PostgreSQL + RLS + Auth)
- **AI**: Claude Haiku 3.5 (ストリーミング応答)
- **決済**: Stripe (一回買い切り $6.99)
- **多言語**: next-intl (EN/JA/ZH/KO)
- **PWA**: Service Worker + Web Push (VAPID)

## インフラ / デプロイ情報
- **本番URL**: https://sleepguard-kohs-projects-45c123ca.vercel.app
- **GitHub**: https://github.com/hongshchn-max/sleepguard
- **Vercel Project ID**: prj_7AEckGFx4JS8bFXVyFZGbI3V3Pl4
- **Vercel Team ID**: team_WOTc1jQYhWcVZV1ShZih8hJe
- **Supabase Project Ref**: amjxlgjlmkkcderwqgmb (ap-northeast-1)
- **Supabase Org ID**: vwvgvkqdzmolpzbckzjh
- **Stripe Webhook ID**: we_1T10teETarJvodvWxkb5J8pl
- **デプロイ方式**: Vercel REST API (v13/deployments) 経由。CLIの--scopeバグのため直接API使用。
- **デプロイスクリプト**: `/tmp/generate-deploy-v2.py` (テキストファイルはraw、バイナリはbase64)

## 環境変数 (Vercel に設定済み: 12個)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- ANTHROPIC_API_KEY
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_APP_URL
- VAPID_PUBLIC_KEY
- VAPID_PRIVATE_KEY
- VAPID_EMAIL
- CRON_SECRET

## ディレクトリ構成
```
sleepguard/
├── messages/              # i18n翻訳ファイル (en/ja/zh/ko.json)
├── public/
│   ├── icons/             # PWAアイコン (192/512 png+svg)
│   ├── manifest.json      # PWAマニフェスト
│   └── sw.js              # Service Worker
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (app)/     # 認証後ページ (dashboard/chat/stats/settings/premium)
│   │   │   ├── (auth)/    # 認証ページ (login/signup/onboarding)
│   │   │   ├── layout.tsx # ルートレイアウト(next-intl Provider)
│   │   │   └── page.tsx   # ランディングページ
│   │   ├── api/
│   │   │   ├── chat/      # AIチャット (ストリーミング)
│   │   │   ├── cron/      # Supabase keep-alive
│   │   │   ├── push/      # プッシュ通知 (subscribe/send)
│   │   │   ├── sleep-log/ # 睡眠ログ CRUD
│   │   │   └── stripe/    # Stripe (checkout/webhook)
│   │   └── globals.css
│   ├── components/        # UIコンポーネント
│   ├── i18n/              # next-intl設定 (routing/request/navigation)
│   ├── lib/
│   │   ├── ai/prompts.ts  # Lunaのシステムプロンプト (4パーソナリティ)
│   │   ├── supabase/      # Supabaseクライアント (client/server/middleware)
│   │   ├── types/         # TypeScript型定義
│   │   └── utils.ts       # ユーティリティ
│   ├── middleware.ts       # next-intl + Supabase認証ミドルウェア
│   └── types/             # 型宣言 (web-push.d.ts)
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## DB スキーマ (Supabase)
- **user_profiles**: ユーザー設定(就寝時間, TZ, 言語, プレミアム, ストリーク)
- **sleep_logs**: 睡眠記録(目標/実際の就寝時刻, 達成フラグ)
- **chat_messages**: AI会話履歴(セッション日付別)
- **user_achievements**: バッジ解除記録
- **push_subscriptions**: プッシュ通知サブスクリプション
- 全テーブルにRLS適用。ストリーク計算はPostgreSQLトリガーで自動化。
- スキーマSQL: `src/lib/supabase/schema.sql`

## 無料 vs プレミアム
| 機能 | 無料 | プレミアム($6.99) |
|------|------|-------------------|
| AI会話/夜 | 3回 | 無制限 |
| コーチ性格 | 優しい・厳しい | +ユーモア・科学的 |
| 統計 | 週間のみ | 週間+月間+トレンド |

## 進捗状況

### 完了
- [x] プロジェクト初期化 (Next.js 16 + 依存関係)
- [x] 全ソースコード実装 (62ファイル)
- [x] Supabase プロジェクト作成 + スキーマ適用 + RLS
- [x] Supabase 認証リダイレクトURL設定
- [x] Anthropic APIキー設定
- [x] Stripe テストキー設定 + Webhook作成
- [x] VAPID鍵生成
- [x] Vercelデプロイ (全12環境変数設定済み)
- [x] 全ページ HTTP 200 返却確認
- [x] ミドルウェアの環境変数未設定時のエラーハンドリング修正

### 未完了
- [ ] E2Eテスト: 認証フロー (サインアップ→オンボーディング→ダッシュボード)
- [ ] E2Eテスト: AIチャット (ストリーミング応答)
- [ ] E2Eテスト: Stripe決済 (テストモード)
- [ ] E2Eテスト: 多言語切替
- [ ] Stripe 本番キーへの切り替え
- [ ] Vercel Pro プランへのアップグレード (商用利用に必要、$20/月)
- [ ] カスタムドメイン設定 (任意)

## 既知の問題 / 注意点
- Vercel CLI の `--scope` フラグにバグがあるため、デプロイはREST API経由で行う
- Vercel Hobby Plan は商用利用不可。Stripe課金開始前にProへアップグレード必須
- Supabase無料枠は7日間非アクティブで一時停止 → `/api/cron/keep-alive` で対策
- iOS PWAのプッシュ通知はホーム画面追加が必須 (iOS 16.4+)

## コマンド
```bash
# ローカル開発
npm run dev

# ビルド
npm run build

# デプロイ (Vercel API経由)
python3 /tmp/generate-deploy-v2.py > /tmp/deploy-payload.json
curl -X POST "https://api.vercel.com/v13/deployments?teamId=team_WOTc1jQYhWcVZV1ShZih8hJe" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d @/tmp/deploy-payload.json
```
