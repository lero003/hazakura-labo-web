# 葉桜ラボ Web 実験場

RFPから始まった葉桜ラボのWebサイトを、1ページのまま少しずつリッチに育てるための作業場です。

## ディレクトリ

- `RFP.md`: 現行Astro版の正本。思想、目的、コンテンツ構想、技術判断の基準。
- `src/pages/index.astro`: 現在のWebサイト本体。1ページ表現の実験場。
- `src/data/`: Philosophy / Research Log / Projects / Vision などの表示データ。
- `src/scripts/`: 演出・描画・初期化を小さく分けたフロントエンド script 群。
- `public/`: 画像、ダウンロードファイルなど静的に配信する資産。
- `docs/`: サイト全体の運用・改善ループ・編集原則・作業記録。

## 基本の触り方

Astro 版だけを本線として扱います。旧静的版の比較用アーカイブは削除済みです。ローカルでは dev server か preview で確認します。

```bash
npm install
npm run dev
npm run build
npm run check:phase
```

コンテンツを増やす時は、HTMLへ直接カードを増やすより先に `src/data/` を見ます。制作物、構想、数値、思想カードなどは `src/pages/content.js.ts` から従来形式の `window.HAZAKURA_CONTENT` として配信され、`src/scripts/content-renderers.js` が描画します。

RFPに出てくる `books.ts` / `projects.ts` / `BaseLayout.astro` などの構成案は、将来の整理候補です。現時点では、既存の `src/data/`、`src/scripts/`、`src/pages/*.js.ts` の境界を正として扱い、必要な時だけ小さく寄せます。

## 公開とデプロイ

GitHub の `main` ブランチへpushすると、Cloudflare Pagesで自動デプロイされます。

- GitHub: https://github.com/lero003/hazakura-labo-web
- Production URL: https://hazakura-labo-web.pages.dev
- Cloudflare Pages root directory: リポジトリルート
- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: `.node-version` で `22.16.0` を指定

デプロイ前は `npm run check:phase` を通し、必要に応じてローカル preview でスクロール演出、Canvas演出、Projectsフィルター、ダウンロード導線を確認します。

## 改善ループ

小さく濃くし続ける作業は [docs/IMPROVEMENT_LOOP.md](/Users/keisetsu/Projects/hazakura-labo-web/docs/IMPROVEMENT_LOOP.md) にまとめています。
判断に迷う表現や機能の線引きは [docs/WEB_IMPROVEMENT_PRINCIPLES.md](/Users/keisetsu/Projects/hazakura-labo-web/docs/WEB_IMPROVEMENT_PRINCIPLES.md) を先に見ます。
