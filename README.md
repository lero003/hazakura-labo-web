# 葉桜ラボ Web 実験場

RFPから始まった葉桜ラボのWebサイトを、1ページのまま少しずつリッチに育てるための作業場です。

## ディレクトリ

- `RFP.md`: 最初期の企画意図。思想、目的、コンテンツ構想の原典。
- `hazakura-onepage-lab/`: 現在のWebサイト本体。1ページ表現の実験場。
- `docs/`: サイト全体の運用・改善ループ・編集原則・作業記録。

## 基本の触り方

まずは `hazakura-onepage-lab/index.html` をブラウザで開けば表示できます。

コンテンツを増やす時は、HTMLへ直接カードを増やすより先に `hazakura-onepage-lab/content.js` を見るのが基本です。制作物、構想、数値、思想カードなどはここから描画されます。

## 公開とデプロイ

GitHub の `main` ブランチへpushすると、Cloudflare Pagesで自動デプロイされます。

- GitHub: https://github.com/lero003/hazakura-labo-web
- Production URL: https://hazakura-labo-web.pages.dev
- Cloudflare Pages root directory: `hazakura-onepage-lab`
- Framework preset: `None`
- Build command: なし
- Build output directory: `.` または空欄

現在は素の静的サイトとして運用しています。将来的にNext.js、Astro、Viteなどのフレームワーク利用を検討してもよいですが、その場合はCloudflare Pagesのroot/build設定、相対パス、既存のスクロール演出やCanvas演出が崩れる可能性があります。導入する時は小さな検証ブランチで試してから本線へ戻します。

## 改善ループ

小さく濃くし続ける作業は [docs/IMPROVEMENT_LOOP.md](/Users/keisetsu/Projects/hazakura-labo-web/docs/IMPROVEMENT_LOOP.md) にまとめています。
判断に迷う表現や機能の線引きは [docs/WEB_IMPROVEMENT_PRINCIPLES.md](/Users/keisetsu/Projects/hazakura-labo-web/docs/WEB_IMPROVEMENT_PRINCIPLES.md) を先に見ます。
