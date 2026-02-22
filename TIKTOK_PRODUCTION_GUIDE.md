# Dormiveglia TikTok制作ガイド v4 — AI遊園地アトラクション特化

> Dreamcore × 遊園地。不可能なウォータースライド、悪夢のコースター、
> 誰もいないウォーターパーク。45秒のPOV動画で視聴者を「向こう側」に連れていく。

**このニッチの実績**: 単体動画で40万〜77万いいね。シリーズ18パート以上の継続成長。

---

## 目次

1. [必要ツール](#1-必要ツール)
2. [コンテンツの5つの柱](#2-コンテンツの5つの柱)
3. [制作ワークフロー](#3-制作ワークフロー)
4. [Sora 2 プロンプト集](#4-sora-2-プロンプト集)
5. [Kling 3.0 プロンプト集](#5-kling-30-プロンプト集)
6. [音声戦略](#6-音声戦略)
7. [CapCutでの編集](#7-capcutでの編集)
8. [テキスト・キャプション](#8-テキストキャプション)
9. [最初の30本スクリプト集](#9-最初の30本スクリプト集)
10. [投稿・成長戦略](#10-投稿成長戦略)
11. [品質チェックリスト](#11-品質チェックリスト)

---

## 1. 必要ツール

### AI動画生成

| ツール | 用途 | 料金 | 動画長 |
|--------|------|------|--------|
| **Sora 2** | POVスライド/コースター、物理演算が最強。水・速度感・落下に最適 | ChatGPT Plus $20/月、Pro $200/月(1080p) | 最大20秒 |
| **Kling 3.0** | 大気的な探索シーン、量産、15秒クリップ。霧・天候エフェクト内蔵 | 無料66クレジット/日、Standard $10/月 | 最大15秒 |
| **Runway Gen-4.5** | Midjourney画像→動画化。構図を厳密にコントロールしたい時 | $12/月〜 | 最大10秒 |

### 画像生成（キーフレーム用）

| ツール | 用途 | 料金 |
|--------|------|------|
| **Midjourney v7** | 遊園地のキーフレーム画像。Image-to-Videoの起点 | $10/月〜 |
| **DALL-E 3** | Sora 2と同じサブスクで使える | ChatGPT Plus内 |

### 編集・音声

| ツール | 用途 | 料金 |
|--------|------|------|
| **CapCut** (デスクトップ) | 複数クリップ結合、テキスト、音声、エフェクト | 無料 |
| **Topaz Video AI** | 4Kアップスケール（オプション） | $199(買い切り) |
| **Clippie AI** | ボイスオーバー + 自動キャプション | 無料枠あり |

### 推奨セット

| プラン | 構成 | 月額 |
|--------|------|------|
| **スタート** | Kling無料枠 + CapCut | $0 |
| **ベストバリュー** | ChatGPT Plus(Sora 2 + DALL-E 3) + Kling無料枠 + CapCut | $20/月 |
| **最高品質** | ChatGPT Pro(Sora 2 1080p) + Kling Standard + Midjourney | $240/月 |

---

## 2. コンテンツの5つの柱

### 柱A: POVウォータースライド — 最もバイラル

一人称視点で不可能なスライドを滑り降りる。高さ、速度、落下の恐怖。

- **視点**: 一人称POV（自分の手/影が微かに見える）
- **特徴**: 物理的にあり得ない高さ・長さ・ループ
- **感情**: 恐怖 → スリル → 着水の開放感
- **バズ実績**: @kamorah.twitch — 76.6万いいね/1動画

### 柱B: 悪夢のコースター — 恐怖×快感

一人称視点の不可能なジェットコースター。ループ、落下、虚空への突入。

- **視点**: 一人称POV（コースターのレール/バーが見える）
- **特徴**: 物理法則を無視した動き、空間の歪み
- **感情**: 期待 → 恐怖 → 信じられない展開

### 柱C: 廃墟遊園地探索 — 不穏×ノスタルジア

誰もいない遊園地をゆっくり歩き回る。錆びた観覧車、動かないメリーゴーラウンド。

- **視点**: ゆっくりしたドリー/トラッキング（三人称的）
- **特徴**: 黄昏時、ネオンが微かに点いている、霧
- **感情**: ノスタルジア + 不穏さ
- **Dormiveglia向け**: 最もブランド世界観に近い

### 柱D: ドリームコアウォーターパーク — 美学特化

パステルタイル、ターコイズの水、ソフトネオン。誰もいない、でも最近まで人がいた気配。

- **視点**: ゆっくりした探索（固定 or スローパン）
- **特徴**: プールルーム美学 + 遊園地要素
- **感情**: 安らぎ + 不気味な静けさ

### 柱E: Dormiveglia × 遊園地 — オリジナル融合

Lunaの世界観と遊園地を融合。「眠りの向こう側にある遊園地」。

- **視点**: Lunaの光る球体に導かれて遊園地を探索
- **特徴**: 現実の遊園地 → dreamcore化 → Lunaの登場
- **感情**: 好奇心 → 驚き → 「ここは夢？」

---

## 3. 制作ワークフロー

### 45秒動画の構造

```
[0-3秒]  フック — 衝撃的なビジュアルまたはテキスト
[3-15秒] クリップ1 — メインシーンの導入
[15-30秒] クリップ2 — 展開・クライマックス
[30-40秒] クリップ3 — 結末・意外な展開
[40-45秒] エンド — テキストCTA or ループ開始点
```

### ワークフローA: Sora 2 メイン（POVスライド/コースター向け）

```
Sora 2で3本のクリップを生成（各10-20秒）
        ↓
CapCutで結合（トランジション: カット or 短いフェード）
        ↓
テキストオーバーレイ追加
        ↓
音声: AI生成音 or トレンド音声 or ボイスオーバー
        ↓
投稿（45-55秒）
```

### ワークフローB: Kling 3.0 メイン（探索/雰囲気向け）

```
Kling 3.0で3-4本のクリップを生成（各10-15秒）
        ↓
CapCutで結合（クロスディゾルブ 500ms）
        ↓
カラーグレーディング（dreamcore化）
        ↓
音声3層 + テキスト
        ↓
投稿（45-55秒）
```

### ワークフローC: ハイブリッド（最高品質）

```
Midjourneyでキーフレーム画像を生成
        ↓
Kling/Runway でImage-to-Video化
        ↓
Sora 2でPOVアクションクリップを別途生成
        ↓
CapCutで全て結合 + エフェクト
        ↓
Topaz Video AIで4Kアップスケール（オプション）
        ↓
投稿
```

---

## 4. Sora 2 プロンプト集

### 4A. プロンプト構文

```
[カメラ視点: POV/tracking/dolly]. [場面の描写].
[動きの描写: sliding/falling/spinning/exploring].
[環境: water park/roller coaster/abandoned park].
[光: golden hour/neon/fluorescent/moonlight].
[雰囲気: dreamcore/surreal/nostalgic/nightmare].
[技術指定: vertical 9:16, realistic handheld, motion blur].
[感情: chaotic/peaceful/terrifying/beautiful].
No text. No UI elements.
```

### 4B. POVウォータースライド

**巨大ウォータースライド — 基本**
```
POV shot, first-person perspective. The viewer is at the top of
an impossibly tall water slide at a massive water park. Looking
down, the drop is terrifying — hundreds of meters of twisting
translucent tube descending through clouds. The slide begins.
Water rushes beneath. Speed increases rapidly. The tube twists
and loops. Through the transparent walls, a dreamlike pastel
sky is visible. The viewer's shadow stretches on the slide walls.
Wind and water sound intensify. After a massive drop, the POV
launches into open air for a brief moment of weightlessness
before splashing into a crystal-clear pool. Water splashes
everywhere. Bright golden hour lighting. Dreamcore water park
aesthetic. Vertical 9:16. Realistic handheld POV with natural
motion blur and camera shake.
```

**地下ウォータースライド — 暗闇→光**
```
POV first-person. Sliding down a water slide that enters a dark
underground tunnel. Complete darkness except for strips of soft
neon light (cyan, magenta, lavender) along the tube walls. Water
rushing fast. Speed increasing. The neon lights blur into streaks.
Suddenly the tunnel opens into a vast underground cavern with
a glowing turquoise lake. Bioluminescent particles float in the
air. The slide drops steeply toward the water. Splash landing
in the glowing lake. Dreamcore underground water park. Vertical
9:16. Realistic POV, heavy motion blur during speed sections.
```

**無限ループスライド — 物理法則無視**
```
POV first-person. Riding a water slide that defies gravity.
The slide goes upward, loops upside down, corkscrews through
the air between two massive towers. Water somehow flows upward.
The viewer can see the entire surreal water park below — pastel
colored slides intertwining like a dreamcore spaghetti junction.
Other slides cross overhead. Soft golden sunlight. Everything
feels slightly wrong, like a fever dream of the best water park
ever. The slide ends with a gentle splash into a pool surrounded
by palm trees. Dreamcore physics. Vertical 9:16. Handheld POV.
```

**深海ウォータースライド — Dormiveglia向け**
```
POV first-person. A water slide that descends from a normal
water park into the ocean. The tube becomes transparent as it
enters underwater. Fish and coral visible outside. The deeper
it goes, the darker it gets. Bioluminescent jellyfish float
past. A faint lavender glow appears ahead. The slide enters
a vast underwater chamber where a glowing orb floats in the
center. The slide spirals around the orb, then launches upward
through the water surface into bright morning light. The
transition from sleep to waking. Dreamcore aquatic. Vertical
9:16. Realistic POV.
```

### 4C. 悪夢のコースター

**虚空に落ちるコースター**
```
POV first-person seated in a roller coaster car. Hands visible
gripping the safety bar. The coaster climbs slowly — click click
click — up an impossibly tall lift hill. At the top, instead of
a track going down, the track simply ends. The coaster tips
forward over the edge into a void. Freefall. Below is not
ground but clouds, then an entirely different landscape — a
dreamcore amusement park seen from above, soft pastel colors,
tiny Ferris wheels. The coaster somehow finds track again and
enters a massive loop. G-forces visible in the camera shake.
Dreamcore roller coaster nightmare. Vertical 9:16.
```

**空間が歪むコースター**
```
POV first-person on a roller coaster inside a building. The
coaster enters a dark tunnel. When it exits, the world outside
has changed — the amusement park is now floating in the sky,
rides suspended on clouds. The coaster dives between floating
structures. A Ferris wheel rotates sideways. Slides connect
buildings in impossible ways. The coaster loops around a giant
floating swimming pool. Everything bathed in golden hour light.
Dreamcore impossible architecture. Surreal theme park. Vertical
9:16. Realistic coaster POV with natural shake and motion blur.
```

### 4D. 探索シーン

**閉園後の遊園地**
```
Slow tracking shot through an empty amusement park at dusk.
Golden hour light. A Ferris wheel turns slowly by itself, lit
with soft pastel bulbs. A carousel plays distorted music faintly.
Fog rolls across the ground. Cotton candy machines glow but no
one is buying. Prize booths with stuffed animals stare outward.
The camera floats through at walking pace with slight handheld
sway. Everything is beautiful and deeply wrong. The park was
crowded moments ago. Where did everyone go? Dreamcore abandoned
theme park. Nostalgic dread. Vertical 9:16.
```

---

## 5. Kling 3.0 プロンプト集

### 5A. 大気的探索

**パステルウォーターパーク**
```
Slow dolly forward through an empty waterpark at golden hour.
Pastel pink and mint colored slides twist and intertwine overhead.
Turquoise water in pools reflects soft neon lights that are just
turning on. Nobody is here. Fog clings to the water surface.
Distant carnival music, muffled and slowed. The camera floats
through the empty space. Towels left on chairs. A single float
drifts in a pool. Dreamcore water park. Liminal, beautiful,
eerily quiet. Nostalgic summer that never existed.
```

**錆びた観覧車**
```
A rusted Ferris wheel turns slowly against a lavender twilight
sky. Soft pastel bulbs flicker along its frame — some working,
some dead. The camera slowly tilts upward from the base to the
top. Fog below, stars appearing above. An empty gondola sways
in a breeze. The wheel creaks softly. This park closed years
ago but the wheel still turns. Dreamcore carnival. Melancholic
beauty. Nostalgic and unsettling.
```

**ネオンに照らされたプール**
```
Static shot of an empty wave pool at night. Neon lights (cyan,
magenta, gold) reflect and ripple on the still water surface.
Fog hovers just above the water. Empty inflatable rafts float
in a cluster. The wave machine activates — gentle waves distort
the neon reflections into liquid color. Nobody is swimming. The
camera slowly zooms in. A single waterslide entrance glows at
the far end. Dreamcore night waterpark. Hypnotic, lonely beauty.
```

**Dormiveglia遊園地の入口**
```
A grand entrance gate to an amusement park, but dreamcore. The
sign reads something illegible — dream text. Through the gate,
impossible rides are visible — a Ferris wheel that goes underground,
slides that loop into the sky, a carousel of glowing orbs instead
of horses. Lavender fog pours out from the gate. A single glowing
orb (Luna) hovers at the entrance, pulsing like a heartbeat. The
camera slowly approaches. The threshold to the other side of sleep
is an amusement park. Dreamcore, inviting, mysterious.
```

### 5B. アクション系

**スライドのスタート地点**
```
Standing at the top of the tallest water slide in a dreamcore
waterpark. Looking down. The slide is transparent and spirals
around a massive tower. Far below, turquoise pools glitter.
The height is dizzying. Pastel slides crisscross in every
direction. Soft golden light. A lifeguard chair at the top is
empty. Nobody else is here. The camera slowly looks from the
view down to the slide entrance. The water flows, waiting.
Dreamcore vertigo. Beautiful terror.
```

**無限プールの通路**
```
Walking through a corridor of connected indoor pools. White
ceramic tiles. Each pool room is identical but subtly different —
one has cyan water, one has warm gold, one has soft pink. The
camera walks slowly through archways. Water sounds echo. Each
room has a different slide entrance in the back wall, leading
somewhere unknown. Fog above the water. No people. Poolrooms
meets waterpark. Dreamcore aquatic labyrinth.
```

---

## 6. 音声戦略

### 6A. 3つのアプローチ

**アプローチ1: AI生成音声をそのまま使う（Sora 2）**
- Sora 2はネイティブ音声生成あり（水音、風、環境音）
- POVスライド/コースターでは特に効果的
- 追加加工なしでリアルな体験音

**アプローチ2: TikTokトレンド音声（最もバズりやすい）**
- トレンド音声 → アルゴリズムブースト
- dreamcore/遊園地系のトレンドを検索して使用
- カルーセルや短い動画に最適

**アプローチ3: 自作3層音声（雰囲気動画向け）**
```
Layer 3: メイン — slowed carnival music / ambient   [70-80%]
Layer 2: 環境 — 水音、遠い歓声、風              [15-25%]
Layer 1: ノイズ — ビニールクラックル、テープヒス  [5-10%]
```

### 6B. 遊園地特有の音素材（Freesound.org）

| 音 | 検索キーワード | 用途 |
|---|---|---|
| カーニバル音楽(遠い) | `distant carnival music muffled` | 廃墟遊園地の不穏さ |
| 水流 | `water slide rushing water` | スライドのリアリティ |
| コースターの金属音 | `roller coaster chain click` | コースター上昇の緊張感 |
| 着水スプラッシュ | `big splash pool` | スライドの結末 |
| 風(高所) | `high altitude wind` | スライド/コースターの速度感 |
| 遊具のきしみ | `rusty metal creaking` | 廃墟遊園地の不穏さ |
| 歓声(遠い) | `distant crowd amusement park` | 「さっきまで人がいた」感 |
| ネオンのハム | `neon sign buzzing` | ナイトウォーターパーク |

### 6C. Slowed Carnival Music の作り方

遊園地のBGMをdreamcore化する:

1. **Pixabay**で `carnival music` `merry go round` `fairground` を検索
2. **SoundTools.io** にアップロード
3. 設定:
   - Speed: **65-75%** (通常のdreamcoreより更にスロー)
   - Reverb: **70-80% wet** (広い空間の反響)
   - Pitch: **-3 to -4 semitones** (重く、不穏に)
4. → 歪んだ、夢の中のカーニバル音楽の完成

---

## 7. CapCutでの編集

### 7A. 基本設定

1. 新規プロジェクト → **9:16** (1080x1920)
2. フレームレート: **30fps**
3. Sora/Klingクリップをインポート

### 7B. 45秒動画の組み立て

**POVスライド/コースターの場合:**
```
[0-3秒]   テキストフック（例: "THE TALLEST SLIDE EVER BUILT"）
[3-5秒]   スタート地点の緊張感（高所から見下ろす）
[5-25秒]  メインの滑走/走行（スピード、ループ、落下）
[25-35秒] クライマックス（最大の落下 or 意外な展開）
[35-43秒] 着水/到着 + 余韻
[43-45秒] エンドテキスト or Part番号
```

**探索/雰囲気の場合:**
```
[0-3秒]   フックテキスト（例: "I found an abandoned waterpark"）
[3-18秒]  空間への導入（ゆっくり探索）
[18-33秒] 発見/展開（奥に何かある、異変に気づく）
[33-43秒] 結末（Lunaの出現、空間の変容、不穏なエンド）
[43-45秒] エンドテキスト + CTA
```

### 7C. トランジション

| シーン種類 | トランジション | 長さ |
|-----------|--------------|------|
| POVスライド（クリップ間） | **ハードカット**（速度感を維持） | 0ms |
| POVスライド（シーン転換） | **フラッシュ to ホワイト** | 200ms |
| 探索（クリップ間） | **クロスディゾルブ** | 500-800ms |
| 夢→現実 / 現実→夢 | **フェード to ブラック** | 400-600ms |
| 衝撃的展開 | **グリッチカット**（一瞬のグリッチ→次のシーン） | 100ms |

### 7D. カラーグレーディング

**POVスライド/コースター:**
```
明るさ:    +10 〜 +20  （明るく、開放的に）
コントラスト: +5 〜 +15  （やや強め、スピード感）
彩度:      +5 〜 +10   （鮮やかに。水とネオンを映えさせる）
色温度:    +5 〜 +10   （暖かい黄金時間の光）
ハイライト: +15 〜 +25  （水面の反射、太陽光のフレア）
```

**探索/雰囲気（dreamcore化）:**
```
明るさ:    +5 〜 +15   （やや明るく）
コントラスト: -10 〜 -20  （フラットに）
彩度:      -10 〜 -20  （パステルに）
色温度:    +5 〜 +10   （暖かみ）or -5〜-10（不穏）
シャドウ:   +5 〜 +15   （影を持ち上げる）
ティント:   +5 マゼンタ  （ラベンダー色かぶり）
```

### 7E. エフェクト

**全動画共通:**
- フィルムグレイン: 20-30%（POVは控えめ、探索は強め）
- 微かなレンズフレア（太陽光シーン）

**探索/雰囲気のみ:**
- グロウ/ブルーム: 20-30%
- 周辺ブラー: 15-20%
- VHS効果: 15-25%（廃墟シーンに）

---

## 8. テキスト・キャプション

### 8A. フックテキスト（最初の3秒）

視聴者を止める一言。太字、画面中央上部。

**POVスライド:**
- `"THIS SLIDE GOES UNDERGROUND"`
- `"THE DROP IS 300 METERS"`
- `"NOBODY WAS SUPPOSED TO RIDE THIS"`
- `"I FOUND A WATERSLIDE IN MY DREAM"`
- `"THIS WAS WAY TOO HIGH" 💀`
- `"WATERSLIDE NIGHTMARE Part [N]"`

**コースター:**
- `"THE TRACK JUST... ENDS"`
- `"THIS COASTER BREAKS PHYSICS"`
- `"I DIDN'T SIGN UP FOR THIS"`

**探索:**
- `"I found an abandoned waterpark at 3am"`
- `"This park closed in 1997. The rides still work."`
- `"Luna brought me here while I was sleeping"`
- `"The other side of sleep is a theme park"`

### 8B. シリーズタイトル形式

シリーズ化が成長の鍵。各シリーズは統一フォーマット:

```
[シリーズ名] Part [N]
```

**シリーズ案:**
- `Waterslide Nightmare Dreamcore Part 1, 2, 3...`
- `Abandoned Waterpark Exploration Part 1, 2, 3...`
- `Luna's Theme Park Part 1, 2, 3...`
- `Impossible Rides Part 1, 2, 3...`
- `The Dreamcore Waterpark Part 1, 2, 3...`

### 8C. キャプション（投稿文）

**テンプレート1: 恐怖×ユーモア**
```
this waterslide was NOT supposed to exist 💀

#dreamcore #waterslide #ai #nightmare #fyp #waterpark
```

**テンプレート2: シリーズ**
```
Waterslide Nightmare Dreamcore Part 7

which slide was the worst? comment ⬇️

#dreamcore #waterslide #nightmare #sora #ai #fyp
```

**テンプレート3: Dormiveglia連携**
```
Luna took me to this waterpark while I slept.
the slides go places you can't imagine.
the question is: do you want to wake up?

#dormiveglia #dreamcore #waterpark #luna #ai #fyp
```

**テンプレート4: 日本語**
```
眠りの向こう側にある遊園地。
Lunaがここに連れてきた。
帰り方は…まだ聞いてない。

#dormiveglia #dreamcore #遊園地 #ウォータースライド #ai
```

**テンプレート5: 問いかけ**
```
would you ride this? yes or no. comment.

#dreamcore #waterslide #wouldyouride #ai #fyp
```

### 8D. ハッシュタグセット

**セットA (メイン)**: `#dreamcore #waterslide #ai #nightmare #fyp`
**セットB (遊園地)**: `#waterpark #amusementpark #rollercoaster #rides #fyp`
**セットC (美学)**: `#liminalspace #weirdcore #feverdream #nostalgiacore`
**セットD (ブランド)**: `#dormiveglia #luna #sleepcore #dreamcoreaesthetic`
**セットE (AI)**: `#sora #sora2 #kling #aiart #aivideo #aigenvideo`

---

## 9. 最初の30本スクリプト集

### シリーズ構成

30本を4つのシリーズ + 単発で構成:

| シリーズ | 本数 | 内容 |
|---------|------|------|
| **Waterslide Nightmare Dreamcore** | 10本 | POVスライド。毎回異なる不可能なスライド |
| **The Dreamcore Waterpark** | 8本 | 探索。誰もいないウォーターパークを歩き回る |
| **Luna's Theme Park** | 7本 | Dormiveglia融合。Lunaの世界の遊園地 |
| **単発バイラル狙い** | 5本 | コースター、チャレンジ、コラボ |

---

### Waterslide Nightmare Dreamcore シリーズ (10本)

---

**#1 「Waterslide Nightmare Dreamcore Part 1」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Sora 2) | `POV first-person. Standing at the top of the tallest water slide ever built. Looking down at a 200-meter drop. The slide is a transparent tube spiraling around a massive tower. Far below, pastel-colored pools glitter in golden hour light. The height is terrifying. Wind blows. The viewer's shadow is visible. Dreamcore water park. Vertical 9:16. Realistic POV.` |
| クリップ2 (Sora 2) | `POV first-person sliding down a transparent water slide at extreme speed. Water rushing beneath. The tube spirals and loops. Through the walls, the dreamcore waterpark is visible from every angle — other slides, pools, palm trees, all bathed in golden light. Speed keeps increasing. The slide narrows. A massive loop ahead. The viewer enters the loop — momentary weightlessness. Vertical 9:16. Realistic POV, heavy motion blur.` |
| クリップ3 (Sora 2) | `POV first-person. The slide launches into open air — the viewer is airborne for 3 seconds. Below, a deep turquoise pool. The fall feels eternal. Slow-motion moment — arms slightly visible at frame edges. Then splash. Massive splash. Water everywhere. Underwater for a moment — bubbles, blue light. Then surfacing into golden sunlight. Relief. Dreamcore splash landing. Vertical 9:16.` |
| フックテキスト | `"THE TALLEST SLIDE EVER BUILT" 💀` (0-3秒) |
| エンドテキスト | `"Part 2 tomorrow"` (最後2秒) |
| 音声 | Sora 2のAI生成音（水音、風、着水） |
| キャプション | `waterslide nightmare dreamcore part 1. this drop was NOT okay. would you ride it? #dreamcore #waterslide #nightmare #ai #fyp` |

---

**#2 「Waterslide Nightmare Dreamcore Part 2 — Underground」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 |
| クリップ1 (Sora 2) | `POV first-person at the top of a water slide. This one goes INTO the ground. The entrance is a dark hole in the earth surrounded by mossy rocks. Other riders' screams echo from below. The viewer sits at the edge. Water flows into the darkness. Vertical 9:16.` |
| クリップ2 (Sora 2) | `POV first-person sliding into darkness. Total blackness. Only the sound of rushing water and the body sliding. Then — strips of neon light appear along the tunnel walls. Cyan, magenta, gold. The lights blur into streaks at speed. The tunnel twists and drops. Bioluminescent particles in the water. An underground river. The slide follows the river deeper. Vertical 9:16.` |
| クリップ3 (Sora 2) | `POV first-person. The dark tunnel suddenly opens into a vast underground cavern. A glowing turquoise lake fills the cavern. Stalactites drip. Mushrooms emit soft light on the walls. The slide does one final loop around the cavern before dropping the viewer into the warm glowing water. Surfacing. Looking up at the cavern ceiling far above. Unreal beauty. Dreamcore underground waterpark. Vertical 9:16.` |
| フックテキスト | `"THIS SLIDE GOES UNDERGROUND" 💀` |
| 音声 | Sora 2 AI音声 + エコーする水音 |
| キャプション | `waterslide nightmare dreamcore part 2. it went underground. the lake at the bottom was beautiful but im NOT going back. #dreamcore #waterslide #underground #ai #nightmare` |

---

**#3 「Part 3 — Upside Down」**

| 要素 | 内容 |
|------|------|
| クリップ1 | `POV. The slide begins normally. Clear blue sky, golden light. But something is wrong — the water is flowing upward on parts of the slide. Gravity seems confused.` |
| クリップ2 | `POV. The slide inverts completely — the viewer is upside down, sliding on the ceiling of a transparent tube. Below (now above): the waterpark, seen inverted. Palm trees hanging downward. Pools on the sky. The horizon is upside down. Disorienting, surreal, dreamcore.` |
| クリップ3 | `POV. The slide rights itself. A massive drop. The viewer falls into a pool — but the splash goes upward instead of down. Water droplets float in the air before slowly falling. Zero-gravity splash. Dreamcore physics break.` |
| フックテキスト | `"THE SLIDE GOES UPSIDE DOWN" 💀` |
| キャプション | `part 3. the water went UP. physics left the chat. #dreamcore #waterslide #nightmare #upsidedown #ai` |

---

**#4 「Part 4 — Infinite Loop」**

| 要素 | 内容 |
|------|------|
| クリップ1 | `POV. A water slide that enters a loop. After the loop, the slide enters another loop. And another. The viewer realizes the loops never end — an infinite Möbius strip of waterslide. Each loop shows the same waterpark from a different angle.` |
| クリップ2 | `POV continuing through loops. The surroundings change subtly — golden hour becomes sunset, sunset becomes night with neon lights, night becomes dawn. Time passing during the infinite slide. Dreamcore time loop.` |
| クリップ3 | `POV. The viewer breaks out of the loop somehow. The slide launches skyward, above the clouds. For a moment: silence, stars, peace. Then the plunge back down into the waterpark. Splash.` |
| フックテキスト | `"THE LOOP NEVER ENDS"` |
| キャプション | `part 4. i was stuck in the loop for what felt like hours. time works differently here. #dreamcore #waterslide #infiniteloop #nightmare #ai` |

---

**#5 「Part 5 — The Ocean Slide」**

| 要素 | 内容 |
|------|------|
| クリップ1 | `POV. A waterslide that extends from the park over the ocean. The transparent tube is supported by nothing — just hovering over open sea. Below, deep blue water. Waves. The height above the ocean is terrifying. Dreamcore oceanside.` |
| クリップ2 | `POV. The slide dives INTO the ocean. The tube goes underwater. Fish swim past. A whale passes below. Coral reefs glow. The slide spirals deeper. Bioluminescent creatures. The deep sea is beautiful and terrifying. Dreamcore underwater.` |
| クリップ3 | `POV. At the deepest point, a glowing lavender light ahead. The slide passes through it — suddenly back in the waterpark, surfacing in a pool. Was the ocean real? Dreamcore transition. The boundary between dream and reality.` |
| フックテキスト | `"THE SLIDE GOES INTO THE OCEAN" 💀💀` |
| キャプション | `part 5. this one went into the ocean. i saw things down there. #dormiveglia #dreamcore #waterslide #ocean #deepsea #ai` |

---

**#6 「Waterslide Nightmare Dreamcore Part 6 — Night Slide」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Sora 2) | `POV first-person standing at the top of a neon-lit water slide at 3AM. The waterpark is deserted. Every slide is outlined in strips of cyan and magenta neon. The sky is pitch black. The pool far below glows electric blue. Steam rises from the heated water into the cold night air. A single flickering flood light casts long shadows. Dreamcore night waterpark. Vertical 9:16. Realistic POV.` |
| クリップ2 (Sora 2) | `POV first-person sliding down a transparent tube at night. Inside the tube, LED strips create a tunnel of shifting colors — blue, purple, pink, gold. Outside the tube: total darkness except for the neon outlines of other slides crisscrossing through the black sky. The speed is exhilarating. The tube spirals around a tower covered in neon graffiti. Below, pools glow in different colors like a map of constellations. Vertical 9:16. Heavy motion blur.` |
| クリップ3 (Sora 2) | `POV first-person. The slide launches off a ramp into open air. Night sky full of stars. For a moment, weightlessness — surrounded by nothing but darkness and distant neon below. Then the fall. Plunging into a pool that glows reactive neon purple on impact — the water itself lights up where the body hits. Surfacing. The entire waterpark pulsing with neon. Silence except for the hum of electricity. Dreamcore 3AM waterpark. Vertical 9:16.` |
| フックテキスト | `"WATERSLIDE AT 3AM" 💀` (0-3秒) |
| エンドテキスト | `"Part 7 tomorrow"` |
| 音声 | Sora 2 AI音声（水音）+ low bass drone + distant neon hum |
| キャプション | `waterslide nightmare dreamcore part 6. 3am at an empty waterpark. the neon was the only light. the pool GLOWED when i hit it. #dreamcore #waterslide #3am #neon #nightmare #ai #fyp` |

---

**#7 「Waterslide Nightmare Dreamcore Part 7 — Cloud Slide」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Sora 2) | `POV first-person at the top of the tallest slide in the park. But this one goes UP. The slide curves upward at an impossible angle, rising into low-hanging clouds. The base of the clouds is golden-pink from sunset light. Other riders' shadows are visible in the clouds above. The viewer sits at the start. Water flows upward on the slide surface, defying gravity. Dreamcore anti-gravity waterslide. Vertical 9:16.` |
| クリップ2 (Sora 2) | `POV first-person sliding upward into clouds. Passing through the cloud layer — white mist everywhere, water droplets on the tube walls. Then breaking through into brilliant golden sunlight above the clouds. A waterpark floating on clouds — slides made of crystallized light, pools of liquid gold, rainbow waterfalls pouring off cloud edges into the void below. The slide weaves between cloud formations. Heavenly dreamcore waterpark. Vertical 9:16. Bright, ethereal lighting.` |
| クリップ3 (Sora 2) | `POV first-person. The slide reaches its peak above the clouds, then tips over the edge of a cloud. The drop is infinite — falling through clouds, through layers of golden and pink light. Below, a rainbow-colored pool materializes. The fall stretches in slow motion. Passing through a waterfall of light. Then splash — landing in prismatic water that refracts light in every direction. Surfacing into the regular waterpark below. Looking up — the clouds are just clouds again. Dreamcore return. Vertical 9:16.` |
| フックテキスト | `"THE SLIDE GOES THROUGH THE CLOUDS" ☁️` (0-3秒) |
| エンドテキスト | `"there was a waterpark up there"` |
| 音声 | Sora 2 AI音声 + ethereal choir pad + wind |
| キャプション | `waterslide nightmare dreamcore part 7. the slide went UP. through the clouds. there's a waterpark above the clouds and nobody told me. #dreamcore #waterslide #clouds #heaven #nightmare #ai` |

---

**#8 「Waterslide Nightmare Dreamcore Part 8 — Frozen Slide」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Sora 2) | `POV first-person standing at the top of a water slide made entirely of translucent blue ice. The landscape is arctic — snow-covered mountains, frozen lakes, pale blue sky. The slide is carved into a glacier, spiraling down its face. The ice surface is smooth and glassy. Steam rises from warm water flowing on the ice surface. Northern lights shimmer faintly in the sky. Dreamcore frozen waterslide. Vertical 9:16.` |
| クリップ2 (Sora 2) | `POV first-person sliding down the ice slide at extreme speed. The ice is perfectly smooth — faster than any normal slide. The tube passes through the interior of the glacier — walls of ancient blue ice on all sides, air bubbles frozen in time visible inside the ice. Shafts of light penetrate through the glacier, creating beams of blue and white. The slide corkscrews through ice caves. Outside a crack in the glacier: the aurora borealis fills the entire sky in green and purple curtains of light. Vertical 9:16. Speed blur.` |
| クリップ3 (Sora 2) | `POV first-person. The ice slide exits the glacier and launches over a frozen lake. Below the transparent ice of the lake, dark water moves slowly. The slide skims across the frozen surface, then dips through a hole into warm water beneath the ice. Underwater: the view looking up through the ice ceiling shows the aurora borealis distorted through the ice, creating abstract light patterns. Surfacing in a natural hot spring surrounded by snow. Steam everywhere. Warmth. The frozen slide glistens in the distance. Dreamcore arctic pool. Vertical 9:16.` |
| フックテキスト | `"A WATERSLIDE MADE OF ICE" ❄️` (0-3秒) |
| エンドテキスト | `"the hot spring at the end was worth it"` |
| 音声 | Sora 2 AI音声 + crystalline ambient + howling wind |
| キャプション | `waterslide nightmare dreamcore part 8. a waterslide MADE OF ICE on a glacier. the aurora borealis was insane. landed in a hot spring. #dreamcore #waterslide #frozen #aurora #glacier #ai #nightmare` |

---

**#9 「Waterslide Nightmare Dreamcore Part 9 — Volcano Slide」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Sora 2) | `POV first-person at the rim of an active volcano. The waterslide begins at the crater edge. Below, molten lava glows orange and red. Heat waves distort the air. The slide is made of obsidian-black material, spiraling down the inner wall of the volcano. Steam vents blast from cracks in the rock. The water on the slide surface sizzles slightly from the heat. The drop into the volcano is vertigo-inducing. Dreamcore volcanic waterslide. Vertical 9:16.` |
| クリップ2 (Sora 2) | `POV first-person sliding into the volcano. The obsidian tube descends along the inner crater wall. Through the transparent sections, rivers of lava flow parallel to the slide — close enough to feel the heat, separated by glass. The lava casts everything in deep orange and amber light. The slide passes through a magma chamber — an enormous cavern where lava pools and churns below. Crystal formations on the ceiling glow red-hot. The slide spirals around a column of rising magma. Terrifying beauty. Vertical 9:16. Orange-red color grading.` |
| クリップ3 (Sora 2) | `POV first-person. The slide exits the volcano through a tunnel in the rock. Sudden transition from extreme heat to cool air. The tube emerges on the green tropical exterior of the volcano. Lush jungle below. The slide cascades down the volcano's outer slope through waterfalls and tropical pools. Monkeys watch from trees. The final drop is into a crystal-clear cenote at the volcano's base — cool, turquoise water. Surfacing. Steam from the volcano rises behind. Paradise after inferno. Dreamcore volcanic landing. Vertical 9:16.` |
| フックテキスト | `"THE SLIDE GOES THROUGH A VOLCANO" 🌋` (0-3秒) |
| エンドテキスト | `"i could feel the heat through the screen"` |
| 音声 | Sora 2 AI音声 + deep rumbling bass + lava bubbling + tropical birds at end |
| キャプション | `waterslide nightmare dreamcore part 9. INTO A VOLCANO. the lava was RIGHT THERE. but the pool at the bottom was paradise. #dreamcore #waterslide #volcano #lava #nightmare #ai #fyp` |

---

**#10 「Waterslide Nightmare Dreamcore Part 10 — The Final Slide」**

| 要素 | 内容 |
|------|------|
| 長さ | 55秒 (4クリップ: 15+15+15+10) — シリーズフィナーレ特別編 |
| クリップ1 (Sora 2) | `POV first-person at the top of an impossibly tall slide that rises above the atmosphere. The Earth's curvature is visible. Stars in the black sky. The waterpark is a tiny cluster of lights far below on the planet's surface. The slide begins its descent — a golden transparent tube spiraling from space toward Earth. Water floats in zero gravity around the viewer before the descent begins. The first push — gravity takes over. Falling toward Earth. Dreamcore space waterslide. Vertical 9:16.` |
| クリップ2 (Sora 2) | `POV first-person descending at terminal velocity. The slide passes through layers: space → aurora layer (green and purple light) → cloud layer (white mist, then golden sunlight above clouds from Part 7) → open sky. The tube becomes the ice slide from Part 8 for a moment — glacier visible. Then it transforms into the obsidian volcanic tube from Part 9 — lava visible through walls. Then underground tunnels from Part 2 — bioluminescent caverns. Each past slide's world flashes by. A greatest hits descent. Vertical 9:16. Extreme speed.` |
| クリップ3 (Sora 2) | `POV first-person. The slide goes underwater — the ocean from Part 5. Whales and coral flash past. Then back up — launching into the inverted world from Part 3. Gravity flips. Then the infinite loop from Part 4 — but the viewer breaks through immediately this time. The neon night from Part 6 — electric blue pools below. Every world visited in seconds. The slide converges into one final straight drop — the longest drop of all — toward the original waterpark from Part 1. The golden-hour pastel park. Vertical 9:16.` |
| クリップ4 (Sora 2) | `POV first-person. The final splash. The biggest splash of the entire series. Water erupts 20 meters high. Slow motion. Underwater — all the colors from every world shimmer in the water. Surfacing. Looking around — the waterpark from Part 1. The same golden light. The same turquoise pools. Looking up — the impossibly tall slide from the beginning is visible, spiraling into space. At the base of the first slide, a sign reads: "PART 1." The loop is complete. Fade to black. Dreamcore full circle. Vertical 9:16.` |
| フックテキスト | `"THE FINAL SLIDE (for now...)" 💀` (0-3秒) |
| エンドテキスト | `"every slide. every world. one ride."` → `"Season 2?"` (最後3秒) |
| 音声 | Epic orchestral build + callbacks to each part's audio → peaceful resolution + Sora 2 splash |
| キャプション | `waterslide nightmare dreamcore part 10. THE FINALE. every slide. every world. one ride from space to the bottom. this was insane. should there be a season 2? comment. #dreamcore #waterslide #nightmare #finale #ai #fyp #season2` |

---

### The Dreamcore Waterpark シリーズ (8本)

---

**#11 「The Dreamcore Waterpark Part 1 — The Entrance」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `Slow tracking shot approaching an enormous waterpark entrance. The gate is art deco style, pastel pink and mint green, with a sign that reads something illegible — dream text. Nobody at the ticket booth. Through the gate, impossible slides are visible twisting into the sky. Golden hour light. Fog rolls out from the entrance. Dreamcore waterpark. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `Slow dolly forward through the entrance into the waterpark interior. Empty. Towels draped on chairs. A wave pool ripples gently. Pastel slides in every direction — some go underground, some spiral upward into clouds. Soft neon lights are turning on as dusk approaches. A speaker plays distant, muffled carnival music. Beautiful, lonely, impossible. Dreamcore. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `Slow pan across the empty waterpark. A lazy river flows in impossible directions — uphill, through walls, into the sky. Inflatable rafts float by themselves. The camera stops on a single lifeguard chair. Empty. A whistle hangs from it, swaying. On the chair's back, scratched into the paint: "LUNA WAS HERE." The camera slowly zooms in on the text. Dreamcore mystery. Vertical 9:16.` |
| フックテキスト | `"I found a waterpark that shouldn't exist"` (0-3秒) |
| エンドテキスト | `"Part 2: going deeper"` |
| 音声 | Slowed carnival music (65% speed, heavy reverb) + distant water sounds |
| キャプション | `the dreamcore waterpark part 1. i found the entrance. nobody was there but the rides were running. who is Luna? #dreamcore #waterpark #liminalspace #ai #dormiveglia` |

---

**#12 「The Dreamcore Waterpark Part 2 — The Wave Pool」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `Slow tracking shot approaching a massive wave pool in an empty waterpark. Perfect turquoise water stretches to the horizon. No one is here. Pool loungers arranged in perfect rows, towels folded. The wave machine hums — a deep, rhythmic pulse. The first wave begins to form. As it crests, the water shifts color from turquoise to soft pink. The wave crashes. The next wave forms — turquoise to lavender. Each wave a different color. Dreamcore wave pool. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `Camera slowly moves to the edge of the wave pool, looking into the water. The waves continue their color-shifting cycle. Between waves, something glows beneath the surface — a faint orb of lavender light deep underwater. It pulses in rhythm with the wave machine. The camera lowers closer to the water. The reflection shows a sky that doesn't match reality — the real sky is sunset, but the water reflects a night sky full of stars. Dreamcore impossible reflection. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `Underwater shot looking up from the bottom of the wave pool. Waves roll overhead, each one tinting the water a different color. The lavender orb is visible now — hovering just above the pool floor, casting soft light. Around it, objects are scattered on the tile: a single flip-flop, a pair of swim goggles, a faded wristband that reads "LUNA." The camera slowly pans up from the wristband to the orb. The orb brightens. Cut to black. Dreamcore underwater mystery. Vertical 9:16.` |
| フックテキスト | `"the waves change color here"` (0-3秒) |
| エンドテキスト | `"who is Luna? Part 3 tomorrow"` |
| 音声 | Slowed wave machine rhythm + deep underwater reverb + distant carnival music (65% speed) |
| キャプション | `the dreamcore waterpark part 2. the wave pool. every wave was a different color. and something was glowing at the bottom. who left that wristband? #dreamcore #waterpark #wavepool #liminalspace #ai #luna` |

---

**#13 「The Dreamcore Waterpark Part 3 — The Lazy River」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `POV from a raft floating on a lazy river. The water moves gently. Palm trees and pastel-colored slide structures line both sides. Everything is empty. The raft drifts around a corner — the river begins to tilt. The water flows uphill. The raft ascends a gentle slope, defying gravity. The surroundings stay calm, as if this is normal. Looking back — the water behind is flowing upward too. Dreamcore lazy river. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `POV from the raft. The lazy river now flows through a wall — the raft passes through a solid concrete barrier like it's liquid. On the other side: a different section of the park. Night has fallen here, though it was sunset on the other side. The river flows between slides lit by neon. Inflatable rafts pass by in the opposite direction — all empty, but some have towels and personal items as if riders vanished mid-float. The river turns and goes airborne — floating through open air between two buildings. Dreamcore impossible river. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `POV from the raft. The lazy river descends gently from the air and re-enters the water on the ground level. It flows through a tunnel — inside, bioluminescent algae coat the walls, casting soft blue-green light on the water. The raft exits the tunnel into the original section of the park. Sunset again. As if no time has passed. But looking down at the raft — a small lavender flower that wasn't there before rests on the edge. The camera focuses on it as the raft continues its endless loop. Dreamcore loop. Vertical 9:16.` |
| フックテキスト | `"this lazy river breaks physics"` (0-3秒) |
| エンドテキスト | `"the river goes through walls. Part 4 soon"` |
| 音声 | Gentle water flowing + slowed music box melody + distant park ambience |
| キャプション | `the dreamcore waterpark part 3. the lazy river goes uphill. through walls. through the air. and it loops forever. where did this flower come from? #dreamcore #waterpark #lazyriver #liminalspace #ai` |

---

**#14 「The Dreamcore Waterpark Part 4 — The Slides at Night」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `Wide establishing shot of the waterpark slide zone at night. Dozens of transparent tube slides crisscross the sky like a web of glass veins. Each tube is lit from within by a different color of neon — cyan, magenta, gold, lavender. The structures are impossibly tall and intertwined. Fog rolls along the ground between the slide towers. No lights except the neon inside the tubes. The camera slowly tilts upward, following the slides into the dark sky where they disappear into clouds. Dreamcore neon slides. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `Camera slowly dollies through the base of the slide towers at night. Looking up through the transparent tubes, water flows through them — illuminated by the neon, the water looks like flowing light. Then — movement. A dark silhouette slides through one of the upper tubes. Fast. Gone in a second. The camera pans to follow but the figure has disappeared. Silence. Then another shadow in a different tube — sliding in the opposite direction. Someone is here. But the park is supposed to be empty. Dreamcore uncanny presence. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `Camera approaches the base of the central slide — the tallest one. A pool at the bottom glows electric blue. Ripples on the surface, as if someone just landed. But no one is visible. A wet footprint trail leads away from the pool and fades after a few steps. The camera follows the footprints to where they end — nothing. Looking up one last time: every tube in the sky has a shadow sliding through it simultaneously. Dozens of silent riders. The camera holds. Dreamcore haunted waterpark. Vertical 9:16.` |
| フックテキスト | `"the slides at night. someone is using them."` (0-3秒) |
| エンドテキスト | `"i'm not alone here"` |
| 音声 | Neon electrical hum + water splashes (distant, echo) + slowed carnival music faintly |
| キャプション | `the dreamcore waterpark part 4. the slides at night. i saw shadows. dozens of them. sliding in every tube. but the park was empty. who are they? #dreamcore #waterpark #night #haunted #liminalspace #ai` |

---

**#15 「The Dreamcore Waterpark Part 5 — The Underground Pool」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `Camera descends a staircase leading underground. The stairs are tiled in pale blue — 1990s pool aesthetic. Fluorescent lights flicker overhead, some buzzing. At the bottom, a door. Slightly ajar. Through the crack: turquoise light. The camera pushes through the door into an enormous underground pool hall. Rows of fluorescent tube lights on the ceiling. An Olympic-sized pool filled with perfectly still, unnaturally turquoise water. The room extends farther than it should. Poolrooms liminal space. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `Slow dolly shot across the underground pool. The water is impossibly still — like glass. The fluorescent lights reflect perfectly on the surface, creating a mirror world. The ceiling and its reflection make the room feel infinite. No sound except the faint buzz of lights and occasional drip of water echoing. The camera passes pillars — each one has a depth marker, but the numbers go impossibly high: 50m, 100m, 500m. How deep is this pool? On the far wall, barely visible: a symbol etched into the tile — Luna's crescent orb. Dreamcore poolrooms. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `Camera reaches the edge of the pool and slowly tilts down to look into the water. The turquoise surface is perfectly still. Through the water, far below: a faint lavender glow. It pulses slowly. The depth markers weren't lying — the pool goes down impossibly far. The glow intensifies for a moment, then fades. Small ripples appear on the surface from nowhere, breaking the perfect stillness. The camera pulls back. On the tile edge of the pool, written in condensation as if by a finger: "COME DEEPER." The letters slowly evaporate. Dreamcore underground mystery. Vertical 9:16.` |
| フックテキスト | `"there's a pool UNDER the waterpark"` (0-3秒) |
| エンドテキスト | `"how deep does it go? Part 6"` |
| 音声 | Fluorescent light buzz + water drips (heavy reverb) + distant low frequency drone |
| キャプション | `the dreamcore waterpark part 5. there's an underground pool. the depth markers said 500 meters. something was glowing at the bottom. the message on the tile said "come deeper." #dreamcore #waterpark #poolrooms #underground #liminalspace #ai` |

---

**#16 「The Dreamcore Waterpark Part 6 — The Impossible Slide Tower」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `Extreme low angle looking straight up at the central slide tower. The tower rises 200+ meters. Slides of every color spiral around it like a double helix of DNA. The top disappears into low clouds. Golden hour light catches the slides, making them glow. The scale is overwhelming — the tower dwarfs everything in the park. Tiny water droplets fall from the slides high above, catching light like diamonds. The camera slowly tilts from the base to the clouds. Dreamcore impossible architecture. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `Camera orbits the slide tower at mid-height. The slides intertwine and merge — two slides become one, then split into three. Impossible geometry. Some slides loop through themselves in Möbius strips. Others terminate in mid-air, water pouring off the edge into nothing. Riders would fall hundreds of meters. The tower's structure is a mix of pastel-colored concrete and glass — art deco meets brutalist meets dream logic. Through the glass sections, internal slides are visible: water flowing upward inside the tower. Dreamcore impossible tower. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `Camera ascends to the top of the tower, entering the cloud layer. Inside the clouds: the slides continue, but the tower itself has changed. Above the clouds, the structure is made of light — translucent, glowing pastel beams replacing concrete. The slides become rivers of liquid light flowing upward into the sky. At the very top: a platform. On the platform, a single chair facing outward. From this height, the entire waterpark is visible below the clouds — a tiny dreamcore paradise. On the back of the chair: "LUNA" carved into the metal. The camera slowly zooms in. Dreamcore summit. Vertical 9:16.` |
| フックテキスト | `"THE SLIDE TOWER GOES ABOVE THE CLOUDS"` (0-3秒) |
| エンドテキスト | `"Luna was here too. Part 7"` |
| 音声 | Wind increasing with altitude + ethereal synth pad + structural creaking |
| キャプション | `the dreamcore waterpark part 6. the slide tower. 200 meters. above the clouds. the slides defy physics. and at the top, Luna's chair. she's been everywhere. #dreamcore #waterpark #tower #impossible #liminalspace #ai #luna` |

---

**#17 「The Dreamcore Waterpark Part 7 — The Music」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `Static shot of a speaker mounted on a pastel pink pole in the waterpark. The speaker is old — 1980s design, slightly rusted. From it, faint slowed carnival music plays. The camera slowly follows the sound, moving away from the speaker toward the heart of the park. Other speakers on other poles, all playing the same slowed music. The sound echoes between empty concrete walls and still pools. The camera tracks along a walkway lined with speakers. Each one slightly more distorted than the last. Dreamcore auditory journey. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `The camera follows the music to its source — a maintenance building at the edge of the park. The door is open. Inside: a small room with a mixing board from the 1990s. Lights still blinking on the console. The music plays from a large reel-to-reel tape machine. The reels spin slowly. On the console, a coffee cup — still warm, steam rising. Someone was just here. The camera pans across the room: stacked cassette tapes, each labeled with dates. The dates go into the future. Dreamcore control room. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `Close-up of the cassette tapes. Labels read: "Loop 1," "Loop 47," "Loop 1,000." One tape is ejected from the machine, lying on the console. Its label: "PROJECT SOMNIUM — PHASE 3." The camera slowly zooms in on the label. Behind the tape, a handwritten note on yellowed paper: "They sleep. They dream. They ride. They never want to leave." The music slows even further, becoming almost a drone. The camera pulls back — the room is empty. The reels still spin. Dreamcore revelation. Vertical 9:16.` |
| フックテキスト | `"i found where the music comes from"` (0-3秒) |
| エンドテキスト | `"Project Somnium. Phase 3. what does it mean?"` |
| 音声 | The slowed carnival music IS the video's audio — getting progressively slower and more distorted. End with near-silence + tape hiss |
| キャプション | `the dreamcore waterpark part 7. i followed the music. found the control room. the tapes go into the future. one was labeled "project somnium." what is phase 3? #dreamcore #waterpark #somnium #mystery #liminalspace #ai #dormiveglia` |

---

**#18 「The Dreamcore Waterpark Part 8 — Luna's Pool」**

| 要素 | 内容 |
|------|------|
| 長さ | 50秒 (3クリップ: 15+20+15) — シリーズフィナーレ |
| クリップ1 (Kling 3.0) | `Camera moves through a hidden path at the deepest part of the waterpark. Overgrown with tropical plants. The path narrows. Vines hang from rusted archways. The sounds of the park fade. Ahead: a clearing. In the center, a perfectly circular pool — 10 meters across. The water is impossibly still. Lavender-colored. No wind. No sound. The pool is surrounded by white stone tiles with geometric patterns. Candle-like orbs of light float above the water's surface. The most peaceful place in the park. Dreamcore sacred pool. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `Slow dolly toward the center of the circular pool. In the exact center, floating just above the water: a glowing orb of lavender light. Luna. The orb rotates slowly. As the camera approaches, the orb brightens — its light reflects off the water, turning the entire pool into a mirror of soft purple light. The floating candle-orbs respond, glowing brighter in sympathy. The water beneath Luna's orb begins to ripple in concentric circles, creating perfect geometric patterns. On the stone rim of the pool, letters become visible — carved deep into the stone, illuminated by the lavender light: "D-O-R-M-I-V-E-G-L-I-A." Each letter glows. Dreamcore revelation. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `The camera holds on Luna's orb. It pulses once — brightly — and the entire waterpark is illuminated in lavender light for a moment. Every pool, every slide, every surface glows. Then it fades back. The orb dims slowly. The floating candles extinguish one by one. The water stills. The camera slowly pulls back from the pool. The letters "DORMIVEGLIA" remain faintly glowing on the stone. The tropical path closes behind the camera as it retreats. The pool is hidden again. Fade to lavender, then black. The Dreamcore Waterpark is complete. Vertical 9:16.` |
| フックテキスト | `"i found the center of the waterpark"` (0-3秒) |
| エンドテキスト | `"Dormiveglia"` (大きく中央に表示、5秒間) |
| 音声 | Pure ambient — no music. Water ripples + gentle wind + a single sustained note that builds as Luna glows. Silence at the end. |
| キャプション | `the dreamcore waterpark part 8. the final part. at the center of it all: Luna. and a name i'll never forget. Dormiveglia. what is the space between waking and dreaming? #dormiveglia #dreamcore #waterpark #luna #finale #liminalspace #ai #thethreshold` |

---

### Luna's Theme Park シリーズ (7本)

---

**#19 「Luna's Theme Park Part 1 — The Dream Gate」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 |
| クリップ1 (Kling) | `A bedroom at night. A phone face-down on the nightstand. The person is asleep. A faint lavender glow appears at the foot of the bed. It forms into an orb — Luna. The orb floats toward the wall and passes through it. The wall ripples like water. Dreamcore bedroom transition. Vertical 9:16.` |
| クリップ2 (Sora 2) | `POV first-person following the glowing orb through the wall into another space. The bedroom is gone. The viewer emerges into a vast dreamcore amusement park at eternal twilight. Pastel rides stretching to the horizon. A Ferris wheel made of light. Slides of every color intertwining like DNA strands. Luna's orb hovers ahead, waiting. The threshold to the other side is a theme park. Vertical 9:16.` |
| クリップ3 (Kling) | `Slow pan across Luna's theme park. A carousel where the horses are glowing orbs in different colors. A roller coaster track made of light suspended in the sky. A pool that reflects stars instead of the sky above. Everything is beautiful, impossible, and slightly wrong. The camera follows Luna's orb deeper into the park. Dreamcore. Vertical 9:16.` |
| フック | `"Luna showed me what's on the other side of sleep"` |
| エンド | `"Part 2: the first ride"` |
| 音声 | Ambient dream music + distant carnival sounds(slowed & reverbed) |
| キャプション | `Luna's theme park part 1. when i finally put the phone down and fell asleep, she showed me this. the other side of sleep is better than i imagined. #dormiveglia #luna #dreamcore #themepark #ai` |

---

**#20 「Luna's Theme Park Part 2 — The First Ride」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `Luna's glowing lavender orb hovers at the entrance to a waterslide — but this slide is alive. The tube is made of translucent organic material that breathes slowly, pulsing with soft bioluminescent light. Luna's orb circles the entrance twice, then enters the slide. An invitation. The surrounding dreamcore amusement park stretches in every direction under an eternal twilight sky — pastel rides and impossible structures. The camera follows the orb to the slide entrance. Dreamcore living waterslide. Vertical 9:16.` |
| クリップ2 (Sora 2) | `POV first-person sliding down the living waterslide. The tube walls pulse with light in rhythm with the viewer's imagined heartbeat. The water is warm and slightly luminescent. Through the translucent walls: glimpses of the dreamcore park — a Ferris wheel of pure light, a roller coaster track suspended in the sky, pools that reflect impossible skies. The slide spirals downward, deeper and deeper. The light shifts from lavender to deep ocean blue. Fish appear outside the tube — the slide has gone underwater without any transition. A coral reef of impossible colors surrounds the tube. Dreamcore underwater slide. Vertical 9:16.` |
| クリップ3 (Sora 2) | `POV first-person. The underwater slide opens into a vast ocean cavern. The tube dissolves — the viewer floats freely in warm, breathable water. A sunken amusement park covers the cavern floor — a carousel of seahorses, slides made of coral, swings hanging from kelp. Everything glows with bioluminescence. Luna's orb waits at the center, hovering above the sunken carousel. The viewer drifts toward it. The orb pulses once. The cavern fills with light. Cut to: the viewer standing back at the surface of the park, dry, as if nothing happened. Luna's orb hovers nearby. Dreamcore dream logic. Vertical 9:16.` |
| フックテキスト | `"Luna showed me the first ride"` (0-3秒) |
| エンドテキスト | `"the slide was alive. Part 3: the wheel of light"` |
| 音声 | Organic ambient pulse + underwater textures + gentle build to the cavern reveal |
| キャプション | `Luna's theme park part 2. she showed me the first ride. the slide was alive — it breathed. it went underwater. there was a sunken park down there. Luna knows things about sleep we don't. #dormiveglia #luna #dreamcore #themepark #waterslide #ai` |

---

**#21 「Luna's Theme Park Part 3 — The Ferris Wheel of Light」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `A Ferris wheel made entirely of light. No metal, no structure — just luminous beams forming the shape of a wheel, rotating slowly against the twilight sky. Each gondola is a floating sphere of soft golden light. Luna's orb leads the viewer toward it. The ground beneath the wheel is a mirror-still reflecting pool, making the wheel appear to extend infinitely downward. The camera slowly approaches from ground level, capturing the full scale. Dreamcore Ferris wheel of light. Vertical 9:16.` |
| クリップ2 (Sora 2) | `POV first-person sitting inside a gondola of light. The sphere is transparent — the viewer can see everything. The Ferris wheel rises slowly. Below: the entire dreamcore amusement park unfolds. An infinite landscape of pastel rides, glowing pools, impossible slide towers, all connected by rivers of light. The park has no edges — it extends to every horizon. At the top of the wheel, the view shifts — in one direction, the infinite dreamcore park. In the other direction, far away and tiny: a city. Real buildings. Real street lights. Cars. The waking world. It looks small and dim compared to the park. Dreamcore perspective shift. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `The Ferris wheel descends. As the gondola lowers, the view of the waking world fades and the dreamcore park fills the view again. Luna's orb enters the gondola. For a moment, the orb projects an image — a bedroom. A phone face-down on a nightstand. A person sleeping peacefully. Is that the viewer? The image dissolves. Luna's orb dims to a gentle glow. The gondola reaches the ground. The door of light opens. Stepping out. The reflecting pool beneath shows not the sky, but the sleeping bedroom. The viewer looks down at themselves sleeping. Dreamcore self-reflection. Vertical 9:16.` |
| フックテキスト | `"the Ferris wheel is made of light"` (0-3秒) |
| エンドテキスト | `"i could see myself sleeping from up there"` |
| 音声 | Ascending ethereal pads + soft wind + faint city sounds when waking world is visible + silence at reflection |
| キャプション | `Luna's theme park part 3. the Ferris wheel of light. at the top i could see the real world. it looked so small. and in the reflection... i saw myself sleeping. this place is inside my dreams. #dormiveglia #luna #dreamcore #ferriswheel #themepark #ai` |

---

**#22 「Luna's Theme Park Part 4 — The Mirror Maze」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `Entrance to a mirror maze in the dreamcore park. The entrance is an ornate archway — art nouveau curves in lavender metal. "REFLECT" is written above in dream-text that shifts when you look directly at it. Luna's orb enters first, its light bouncing infinitely in the mirrors. The camera follows into a corridor of mirrors. But the reflections aren't normal — they show the viewer's silhouette, but slightly delayed, as if the reflection is reacting a half-second late. Dreamcore mirror maze entrance. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `Inside the mirror maze. The mirrors show something wrong. Each mirror reflects a different scene: one shows a person sitting in bed scrolling their phone at 2AM. Another shows the same person watching videos, the blue screen light on their face. Another mirror: the person doom-scrolling, eyes glazed. The viewer is seeing their waking-world self in the mirrors — addicted to their phone, unable to stop. The reflections don't acknowledge the viewer in the dream park. They just keep scrolling. Luna's orb dims, as if uncomfortable. The reflections' phone screens cast blue light onto the dreamcore maze walls. Dreamcore uncanny mirror. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `The viewer backs away from the mirrors. The reflections follow — the scrolling figures turn their heads. They see the viewer. Eye contact through the mirror. The scrolling stops. The reflected figure slowly puts the phone down. The mirror cracks — a single fracture line. Through the crack: lavender light pours in. Luna's orb passes through the cracked mirror. On the other side: the dreamcore park, beautiful and vast. The message is clear — put the phone down, cross the threshold. The mirror shatters completely. The maze is gone. Only the park remains. Dreamcore awakening metaphor. Vertical 9:16.` |
| フックテキスト | `"the mirrors show your OTHER self"` (0-3秒) |
| エンドテキスト | `"the reflection put the phone down"` |
| 音声 | Distorted reflection of the main theme + phone notification sounds in mirrors + glass shatter + peaceful ambient after |
| キャプション | `Luna's theme park part 4. the mirror maze. every mirror showed me scrolling my phone. at 2am. eyes dead. but when the reflection put the phone down... the mirror broke. and the dream was on the other side. #dormiveglia #luna #dreamcore #mirrormaze #phonescreentime #ai` |

---

**#23 「Luna's Theme Park Part 5 — The Carousel」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `A dreamcore carousel in the center of a meadow within the park. Instead of horses, the carousel mounts are glowing orbs of different colors — each one a smaller version of Luna. Gold, rose, mint, sapphire, lavender. They rotate slowly. The canopy above the carousel is a night sky — actual stars moving in real-time, the Milky Way visible. Fireflies drift around the meadow. A gentle music box melody plays, slowed. Luna's main orb leads the viewer toward a lavender mount. Dreamcore carousel of lights. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `POV sitting on the lavender orb-mount. The carousel spins. With each rotation, the surroundings change — a slideshow of memories. First rotation: a childhood amusement park. Cotton candy stands, a tiny Ferris wheel, a child laughing. Second rotation: summer camp, a lake, diving off a dock. Third rotation: a family trip to a waterpark, warm sunlight, no phones in sight. The memories are warm, golden, nostalgic. The carousel's music box melody accompanies each memory. Luna's orb glows warmer with each rotation. Dreamcore nostalgia carousel. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `The carousel slows. The final rotation shows: the present. A bedroom at night. A phone screen glowing. The warmth of the memories fades slightly. The carousel stops. Luna's orb floats off its mount and hovers in front of the viewer. It pulses gently — a reminder. The memories were from before screens consumed every night. The meadow returns. Fireflies glow brighter. The carousel's orb-mounts all pulse once in unison. The music box melody continues, peaceful. A title appears: "Remember when nights were for dreaming?" Dreamcore emotional moment. Vertical 9:16.` |
| フックテキスト | `"the carousel shows your memories"` (0-3秒) |
| エンドテキスト | `"remember when nights were for dreaming?"` |
| 音声 | Music box melody (slowed, 70% speed) + warm ambient + faint childhood laughter in memories |
| キャプション | `Luna's theme park part 5. the carousel of memories. it showed me my childhood. amusement parks. summer. no phones. just dreams. when did we stop dreaming? #dormiveglia #luna #dreamcore #carousel #nostalgia #memories #ai` |

---

**#24 「Luna's Theme Park Part 6 — The Closing」**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 (3クリップ: 15+15+15) |
| クリップ1 (Kling 3.0) | `A PA announcement echoes across the dreamcore park — a gentle chime followed by a voice: incomprehensible dream-language, but the meaning is felt: "The park is closing. Dawn is approaching." Across the park, rides begin to fade. The Ferris wheel of light dims. The carousel's orbs float away like lanterns. Slides dissolve into mist. One by one, the lights go out. The eternal twilight is shifting — the horizon shows the faintest hint of warm sunrise gold. Luna's orb appears, moving urgently. She wants the viewer to follow. Dreamcore park closing. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `Luna's orb races through the dissolving park. The viewer follows in POV. Slides that were solid moments ago are now transparent ghosts, fading. Pools drain into nothing. The mirror maze crumbles into light particles. The wave pool's last wave rolls and evaporates. Luna leads through a shortcut — a corridor that wasn't there before. The walls are covered in all the park's memories: silhouettes of riders on slides, swimmers in pools, the carousel spinning. A gallery of the dream. The corridor narrows. Ahead: a door of light. Luna's orb waits at the door. Dreamcore urgency. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `The camera approaches the door of light. Luna's orb pulses three times — a goodbye signal. Through the door: warmth. The viewer steps through. Transition to white. Behind: the last glimpse of the dreamcore park — now barely visible, a ghost of light against the approaching dawn. The Ferris wheel is the last thing visible, a fading outline. Then gone. Only white light remains. The warmth of morning. Luna's orb is still here — a tiny point of lavender in the white. It blinks once and fades. The threshold between dream and waking. Dreamcore farewell. Vertical 9:16.` |
| フックテキスト | `"the park is closing. dawn is coming."` (0-3秒) |
| エンドテキスト | `"Luna said goodbye"` |
| 音声 | PA chime + park sounds fading one by one + silence growing + a single sustained warm note at the end |
| キャプション | `Luna's theme park part 6. the park is closing. dawn was coming. Luna rushed me to the exit. everything faded. the Ferris wheel was the last thing i saw. she said goodbye at the door. #dormiveglia #luna #dreamcore #themepark #farewell #dawn #ai` |

---

**#25 「Luna's Theme Park Part 7 — Waking Up」**

| 要素 | 内容 |
|------|------|
| 長さ | 50秒 (3クリップ: 15+20+15) — シリーズフィナーレ |
| クリップ1 (Kling 3.0) | `A bedroom at dawn. Warm golden light streams through curtains. A person wakes up — eyes opening slowly. They look confused, then peaceful. Sitting up in bed. The room is normal. Real. Morning sounds: birds, distant traffic. They look at the nightstand. The phone is face-down, exactly where they left it. But on the pillow beside them: tiny points of lavender light, like glitter, slowly fading. Luna's light particles. The person touches them — they dissolve into warmth. Was it real? Dreamcore morning after. Vertical 9:16.` |
| クリップ2 (Kling 3.0) | `The person picks up their phone and turns it over. The screen lights up: a notification from "Dormiveglia" — the app icon is Luna's crescent orb. The notification reads: "You crossed the threshold last night. 7h 42m on the other side." Below it: a small achievement badge — a golden Ferris wheel icon. "Dreamer: Ride Complete." The person smiles. They look at the window — bright morning. Then look back at the pillow where the lavender light was. Nothing there now. But on the bedsheet, barely visible: the faintest impression of a waterslide — like a shadow that doesn't belong to anything. Dreamcore subtle evidence. Vertical 9:16.` |
| クリップ3 (Kling 3.0) | `The person gets out of bed. Morning routine. The phone stays face-down. Through the window: a normal city. Normal day. But for one frame — a single flash — the Ferris wheel of light is visible in the sky outside the window, then gone. The viewer might have imagined it. The camera slowly zooms out from the bedroom window. The city is real. But somewhere in the sky, if you look carefully: the faintest outline of a dreamcore waterpark in the clouds. You'd never see it unless you knew it was there. Title card: "Dormiveglia — the space between waking and dreaming." Fade to lavender. Then black. Dreamcore series finale. Vertical 9:16.` |
| フックテキスト | `"i woke up. Luna's light was on my pillow."` (0-3秒) |
| エンドテキスト | `"Dormiveglia — the space between waking and dreaming"` (5秒間、中央表示) |
| 音声 | Morning ambience (birds, warmth) + the faintest echo of the carousel music box + notification sound + peaceful conclusion |
| キャプション | `Luna's theme park part 7. the finale. i woke up. Luna's light was on my pillow. the app said i slept 7 hours and 42 minutes. was it real? when you finally put the phone down and sleep... Luna is waiting on the other side. Dormiveglia. link in bio. #dormiveglia #luna #dreamcore #themepark #finale #sleepbetter #ai #thethreshold` |

---

### 単発バイラル狙い (5本)

---

**#26 「Roller Coaster Through Dimensions」**

| 要素 | 内容 |
|------|------|
| 長さ | 50秒 |
| 全クリップ (Sora 2) | POVコースター。最初は普通の遊園地→線路が空間の裂け目に入る→異次元: 水中遊園地→氷の世界→宇宙→元の遊園地に戻る |
| フック | `"THIS COASTER GOES THROUGH DIMENSIONS" 💀` |
| キャプション | `the track went through a hole in reality. i saw 4 different worlds. would you ride this? #dreamcore #rollercoaster #ai #dimensions #nightmare` |

---

**#27 「Would You Ride This? — Top 5」**

| 要素 | 内容 |
|------|------|
| 長さ | 50秒 |
| 5つの短いクリップ (各10秒) | 最も恐ろしい5つのスライド/コースターのハイライト。#5→#1のカウントダウン。#1はLuna's Theme Parkのスライド |
| フック | `"Top 5 rides you'd NEVER try"` |
| キャプション | `which one is the worst? 1-5 comment below. #dreamcore #wouldyouride #waterslide #top5 #ai #fyp` |

---

**#28 「日本の夢の遊園地」(日本語)**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 |
| クリップ1 (Kling) | 廃墟の日本の遊園地。観覧車、桜、霧。ノスタルジック |
| クリップ2 (Kling) | 同じ遊園地がdreamcore化。ライドが光り始める。桜が浮遊 |
| クリップ3 (Sora 2) | POVでウォータースライドに乗る。日本庭園の上を滑っていく。鳥居をくぐる |
| フック | `"閉園した遊園地に行ったら、まだ動いてた"` |
| キャプション | `閉園した遊園地。でもライドが動いてた。スライドに乗ったら、夢の日本庭園に出た。 #dormiveglia #dreamcore #遊園地 #日本 #ai` |

---

**#29 「POV: Luna Takes You on a Ride」(Dormiveglia直結)**

| 要素 | 内容 |
|------|------|
| 長さ | 45秒 |
| クリップ1 | 画面録画: Dormivegliaアプリ。Lunaとチャット。「show me the other side」と入力。Lunaの返答: 「close your eyes.」|
| クリップ2 (Sora 2) | POV。目を閉じて開くと遊園地にいる。Lunaの球体が前方に。球体に従ってスライドへ |
| クリップ3 (Sora 2) | POVスライド。Lunaの球体が一緒に滑っている（スライド内で光っている）。最も美しいスライド。海、空、星を通過。着水は穏やかなラベンダーのプール |
| フック | `"I asked Luna to show me the other side"` |
| キャプション | `i asked Luna to show me what happens when i actually put the phone down and sleep. she showed me this. try it tonight. link in bio. #dormiveglia #luna #dreamcore #waterslide #ai` |

---

**#30 「The Waterpark You See When You Finally Sleep」(ブランド動画)**

| 要素 | 内容 |
|------|------|
| 長さ | 55秒（最高品質） |
| クリップ1 (Kling) | 深夜のベッドルーム。スマホを裏返す。目を閉じる。画面が暗くなる |
| クリップ2 (Kling) | 暗闇の中にLunaの球体が現れ、空間が広がる。巨大なウォーターパークが形成される |
| クリップ3 (Sora 2) | POV。パーク内を探索。最も美しいdreamcoreウォーターパーク。全てのシリーズの名場面を凝縮 |
| クリップ4 (Sora 2) | POVスライド。最高のスライド。海底、雲、星空を通過する壮大な旅 |
| クリップ5 (Kling) | ベッドルーム。朝。目覚め。窓から光。スマホは裏返しのまま。枕元にLunaの光の粒子 |
| フック | `"What you see when you finally put the phone down"` |
| エンド | `"Dormiveglia"` (中央に大きく) |
| 音声 | 壮大なambient build。最後にLunaのハミング |
| キャプション | `the other side of sleep isn't empty. it's this. Luna's waterpark. the threshold is open every night. you just have to cross. Dormiveglia — link in bio. #dormiveglia #dreamcore #waterpark #luna #ai #thethreshold` |

---

## 10. 投稿・成長戦略

### 10A. 投稿スケジュール

| 曜日 | 時間 (JST) | シリーズ | フォーマット |
|------|-----------|---------|------------|
| 月 | 21:00 | Waterslide Nightmare | POVスライド (Sora 2) |
| 火 | 22:00 | Dreamcore Waterpark | 探索 (Kling 3.0) |
| 水 | 21:00 | Waterslide Nightmare | POVスライド |
| 木 | 22:00 | Luna's Theme Park | Dormiveglia融合 |
| 金 | 21:00 | 単発バイラル狙い | コースター or ランキング |
| 土 | 20:00 | Dreamcore Waterpark | 探索 |
| 日 | 22:00 | Luna's Theme Park | Dormiveglia融合 |

### 10B. シリーズ戦略

**鉄則: Part番号を必ず付ける。**

シリーズ化のメリット:
- Part 1がバズる → 過去のPart全てにトラフィック流入
- 「Part 7が最も怖い」等のコメントが新規視聴者を誘導
- フォローの動機: 「次のPart見たい」

**シリーズ運営ルール:**
1. 各シリーズは最低10パート以上を目標
2. Waterslide Nightmareは週2本ペースで投稿
3. 各Partは独立して楽しめるが、通して見ると物語がある
4. コメントで「次は○○やって」→ 採用する（エンゲージメント最大化）

### 10C. エンゲージメント行動（毎日）

1. **AI遊園地/dreamcoreクリエイター5人にコメント** — genuineな反応
2. **コメントに全て返信** — 「which slide was worst?」等の議論を促進
3. **週1回 Duet** — 他のウォータースライドクリエイターの動画にDuet
4. **コメントリクエストを採用** — 「Part 8はコメントで一番多かった○○」
5. **r/Dreamcore、r/LiminalSpaceに画像を投稿** — Midjourney画像で流入

### 10D. 成長フェーズ

| フェーズ | 期間 | 目標 | 戦略 |
|----------|------|------|------|
| **Launch** | Week 1-2 | 5,000 followers | Waterslide Nightmare Part 1-4で衝撃。毎日投稿 |
| **Growth** | Week 3-6 | 50,000 followers | 3シリーズ並行。コメント活用。Duet |
| **Brand** | Week 7+ | アプリDL誘導 | Luna's Theme ParkでDormiveglia世界観。link in bio |

**重要**: 最初の2週間はWaterslide NightmareとDreamcore Waterparkのみ。Dormiveglia色は出さない。純粋なdreamcore遊園地コンテンツで信頼を構築してからLuna's Theme Parkシリーズを開始。

### 10E. マルチプラットフォーム

同じ動画を以下にも投稿:
- **YouTube Shorts** — そのままアップロード
- **Instagram Reels** — そのままアップロード
- **Pinterest** — スクリーンショット画像をピンとして投稿
- **Reddit** — r/Dreamcore, r/LiminalSpace, r/WeirdCore に画像投稿（動画はReddit向きではない）

---

## 11. 品質チェックリスト

### AI生成品質
- [ ] テクスチャの崩れがないか（特に水面、人体、文字）
- [ ] カメラの動きが自然か（ジャンプ、ワープがない）
- [ ] 物理的に一貫しているか（水の流れ、重力の方向）
- [ ] 解像度が十分か（ぼやけていない）
- [ ] 同じプロンプトで3-5回生成して最良を選んだか

### POVスライド/コースター
- [ ] スピード感が十分にあるか
- [ ] モーションブラーが自然か
- [ ] POV視点が一貫しているか（手/影が微かに見える）
- [ ] 高さ/落下の恐怖が伝わるか
- [ ] 着水/到着シーンがあるか（完結感）

### 探索/雰囲気
- [ ] カメラの動きがゆっくりか
- [ ] dreamcoreカラーグレーディング済みか
- [ ] 霧/ヘイズがあるか
- [ ] 音声が3層構造になっているか
- [ ] 人が映っていないか

### テキスト・音声
- [ ] 最初の3秒にフックテキストがあるか
- [ ] Part番号が入っているか（シリーズの場合）
- [ ] 音声がシーンに合っているか
- [ ] 音量バランスが適切か

### 全体
- [ ] 45-55秒の長さか
- [ ] 9:16の縦フォーマットか
- [ ] ウォーターマークが除去されているか
- [ ] ループが自然に繋がるか（オプション）
- [ ] スマホで全画面表示して最終確認した
- [ ] 「もう一回見たい」と思うか？

---

## Appendix: Dormivegliaへの導線設計

### Phase 1 (Week 1-2): 純粋なdreamcore遊園地

- アプリの言及なし
- Dormivegliaの名前も出さない
- 純粋にスライドとウォーターパークの美学で勝負
- 目標: 「このアカウントのコンテンツ好き」

### Phase 2 (Week 3-4): Lunaの暗示

- Luna's Theme Parkシリーズ開始
- 「Lunaという存在」が遊園地に関わっている示唆
- コメントで「Lunaって誰？」→ 「she waits at the threshold」
- プロフィールにDormivegliaのリンクを追加

### Phase 3 (Week 5+): Dormiveglia統合

- 「この遊園地は眠りの向こう側にある」と明示
- 動画内でDormivegliaアプリのチャット画面を使用
- 「Luna showed me this when I finally put the phone down」
- link in bioでアプリDL誘導
- 体験レポート動画: 「Dormivegliaを使って7日間→夢でウォーターパークが見えた」
