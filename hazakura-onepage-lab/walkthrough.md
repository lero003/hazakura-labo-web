# 葉桜ラボ onepage lab — 現状ウォークスルー

## 概要

`hazakura-onepage-lab` は、葉桜ラボのRFPを起点にした1ページWebサイトです。

目的は「完成形のLP」を固定することではなく、1ページのまま、思想・制作物・演出・地域循環の入口を少しずつ濃くしていくことです。

現在は、制作物を「道具の棚」「問いの棚」「物語の棚」として見られるようにし、Research Logや循環メモを同じページ内で育てる段階です。

## ファイル構成

| ファイル | 役割 |
|---------|-----|
| `index.html` | セクションの順番、ナビゲーション、大きな舞台装置 |
| `content.js` | 哲学カード、構造カード、実績、Research Log、制作物、構想、棚導線のデータ |
| `style.css` | 見た目、レスポンシブ、昼夜テーマ、カード表現、モーション低減時の表示 |
| `script.js` | データ描画、棚フィルター、花びら、スクロール、ゾーン遷移、カウンター |
| `RICH_ONE_PAGE_ARCHITECTURE.md` | 1ページ拡張の設計メモ |
| `docs/README.md` | サイト本体側のメモ置き場 |
| `docs/CONTENT_DATA_MAP.md` | `content.js` と描画関数の依存地図 |

## 現在のセクション

1. Hero: 世界観と第一印象
2. Philosophy: 三つの花弁
3. One-page Architecture: 1ページを層として育てる考え方
4. Library: 『チカちゃんの哲学冒険譚』
5. Projects: 制作物一覧。棚ガイドとフィルターで Magic Tool / Research Log / Story Seed を切り替える
6. Vision: Research Log / Magic Tools / AI寺子屋 / 自分史 / 地域LLM / レトロ・ガジェット再生
7. Quote: 余韻と思想の着地

## コンテンツ追加の基本

制作物や構想カードを増やす時は、まず `content.js` を編集します。

HTMLにカードを直接足すのは、まだデータ化していない新しい表現型を試す時だけにします。表現型が固まったら、次の改善ループで `content.js` 側へ寄せます。

### `projects` の見方

- `lane`: `Magic Tool` / `Research Log` / `Story Seed` のいずれか。棚ガイドとフィルターに使う。
- `why`: 「なぜ作ったか」。RFPの Magic Tools にある動機の表示。
- `surprise`: 作った後に見えた驚き。道具を Research Log へ戻す短い余韻。
- `cycle`: 任意。Research Log型のカードだけに「問い・実験・発見」を足す。
- `actionType` / `actionLabel`: 外部リンクとダウンロードリンクの見分けに使う。

棚そのものの説明は `projectLanes`、リンク種別の入口説明は `projectActionGuide` にあります。制作物を足す時は、カード本文だけでなく、棚やリンク種別が既存データに合うかも見ます。

将来 `content.js` を分割したり JSON 化したりする時は、先に `docs/CONTENT_DATA_MAP.md` でデータ群と描画関数の対応を見ます。特に Projects は `projects` だけでなく、棚定義とリンク種別ガイドが同じ描画関数に依存しています。

### `visions` と循環導線

`visions` は構想カードの置き場です。将来フォーム化できる入口文は `entryQuestion` に置きます。カード群の後ろには `cycleBridge` があり、Research Log、自分史、寺子屋、地域LLMを「知恵の巡り」としてつなぎます。

### 演出とアクセシビリティ

連続描画やスクロール演出は `prefers-reduced-motion` を見て弱めます。演出を足す時は、通常時だけでなく `motion-reduced` とモバイル幅の表示も確認します。

## 確認方法

ブラウザで直接開きます。

```text
file:///Users/keisetsu/Projects/hazakura-labo-web/hazakura-onepage-lab/index.html
```

構文チェック:

```sh
node --check hazakura-onepage-lab/content.js
node --check hazakura-onepage-lab/script.js
```

## 改善ループ

日々のルーチンはルートの `docs/` を参照します。

- `../docs/IMPROVEMENT_LOOP.md`
- `../docs/RICHNESS_BACKLOG.md`
- `../docs/RICHNESS_LOG.md`

`main` にpushすると Cloudflare Pages の `hazakura-onepage-lab` root から自動デプロイされます。ビルドコマンドは使わない静的配信なので、相対パス、画像、ダウンロードファイルの位置を変える時は先に確認します。
