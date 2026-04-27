# 葉桜ラボ Web 実験場

RFPから始まった葉桜ラボのWebサイトを、1ページのまま少しずつリッチに育てるための作業場です。

## ディレクトリ

- `RFP.md`: 最初期の企画意図。思想、目的、コンテンツ構想の原典。
- `hazakura-onepage-lab/`: 現在のWebサイト本体。1ページ表現の実験場。
- `docs/`: サイト全体の運用・改善ループ・編集原則・作業記録。

## 基本の触り方

まずは `hazakura-onepage-lab/index.html` をブラウザで開けば表示できます。

Astroスパイクでは、同じページを `src/pages/index.astro` から静的ビルドします。

```bash
npm install
npm run dev
npm run build
```

コンテンツを増やす時は、HTMLへ直接カードを増やすより先に `hazakura-onepage-lab/content.js` を見るのが基本です。制作物、構想、数値、思想カードなどはここから描画されます。

## 公開とデプロイ

GitHub の `main` ブランチへpushすると、Cloudflare Pagesで自動デプロイされます。

- GitHub: https://github.com/lero003/hazakura-labo-web
- Production URL: https://hazakura-labo-web.pages.dev
- Cloudflare Pages root directory: `hazakura-onepage-lab`
- Framework preset: `None`
- Build command: なし
- Build output directory: `.` または空欄

現在は素の静的サイトとして運用しています。

AstroスパイクをCloudflare Pagesで試す場合の設定:

- Cloudflare Pages root directory: リポジトリルート
- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: `.node-version` で `22.16.0` を指定

本線へ採用する前に、相対パス、既存のスクロール演出、Canvas演出、ダウンロード導線が崩れないか確認します。

## 改善ループ

小さく濃くし続ける作業は [docs/IMPROVEMENT_LOOP.md](/Users/keisetsu/Projects/hazakura-labo-web/docs/IMPROVEMENT_LOOP.md) にまとめています。
判断に迷う表現や機能の線引きは [docs/WEB_IMPROVEMENT_PRINCIPLES.md](/Users/keisetsu/Projects/hazakura-labo-web/docs/WEB_IMPROVEMENT_PRINCIPLES.md) を先に見ます。
