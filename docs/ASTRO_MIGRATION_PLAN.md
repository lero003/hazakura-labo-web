# Astro移行メモ

葉桜ラボの現行1ページを壊さず、Cloudflare Pagesで静的ビルドできる形へ移すための段階的な作業メモです。

## Phase A: Astro shell

目的: 既存の見た目と演出をできるだけ維持したまま、Astroで静的ビルドできる状態を作る。

- Astro projectをリポジトリルートに置く。
- 既存の `index.html` 相当を `src/pages/index.astro` として移植する。
- 既存の `style.css` / `script.js` / `content.js` / 画像 / downloads は、まず `public/` に置いてそのまま読み込む。
- 既存JSはAstroにバンドルさせず、`is:inline` 付きの外部scriptとして読み込む。
- Cloudflare Pagesは root directory をリポジトリルート、build command を `npm run build`、output を `dist` にする。
- `npm run build` が通ることをPhase Aの完了条件にする。

## Phase B: Content split

目的: 表示構造は大きく変えず、コンテンツだけを育てやすい単位へ分ける。

- `src/data/` にコンテンツを分け、Astroの静的エンドポイント `src/pages/content.js.ts` から従来どおり `window.HAZAKURA_CONTENT` を配信する。
- `content.js` の Research Log / Projects / Vision / stats / philosophy を分割候補にする。
- 最初はJSONまたはTS dataでよい。Markdown/MDXやAstro Content Collectionsは、編集頻度が上がってから判断する。
- Projectsは `lanes` / `overview` / `actionGuide` / `items` を同じ境界として扱う。
- Visionは `entryGuide` と `items` を分けつつ、描画上の見え方は変えない。
- 既存のカード構造、フィルター、アンカー、CTAは大きく変えない。

## Phase C: Rich islands

目的: 動く部分だけを安全にisland化し、演出の実験をしやすくする。

- Projectsの棚フィルターは `src/scripts/project-filter.js` に切り出し、`src/pages/project-filter.js.ts` から従来のscriptとして配信する。カード生成はまだ既存 `script.js` 側に残す。
- Quote前の循環メモ描画は `src/scripts/quote-prelude.js` に切り出し、あとから演出だけ差し替えやすい境界にする。
- 棚フィルターをProjects islandとして分離する。
- 花びら/葉/光のCanvas演出を、初期化と破棄ができる小さなscriptへ分ける。
- Quote前の循環演出を、文言とモーションを別々に調整できる単位にする。
- モバイル向けの小さな演出は、表示領域に入ってから動くようにする。
- island化する時も、最初は見た目とDOM構造をできるだけ変えない。

## Phase D: Experimental garden

目的: 季節テーマや間奏セクションを、ページ全体を壊さず差し替えられる構造へ育てる。

- 季節テーマをデータまたは設定として持つ。
- セクション間の間奏を、追加・削除しやすいコンポーネントにする。
- 祠的な遊びや隠し演出は、主要導線を妨げない独立した入口にする。
- セクション間トランジションは、既存スクロール体験を壊さない範囲で検証する。
- 大きな演出を入れる前に、低スペック端末とモバイル幅での負荷を確認する。

## 現時点の方針

今はPhase Aのスパイク段階です。`hazakura-onepage-lab/` は比較用の現行静的サイトとして残し、Astro版は `src/` と `public/` から組み立てます。本線採用前に、Cloudflare Pagesの設定変更と公開ページの目視確認を行います。

大きい演出を切り出す前に、`npm run check:phase` で静的な完了条件を確認します。このチェックは `dist/index.html`、主要セクション順、生成JS、必須assets、`src/data/` と `/content.js` の一致を見ます。ブラウザ上の目視確認は別途行います。
