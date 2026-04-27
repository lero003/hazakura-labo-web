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
- ゾーンナビのDOM生成とactive表示は `src/scripts/zone-nav.js` に切り出し、スクロール判定や背景更新は既存 `script.js` 側に残す。
- ゾーン雰囲気レイヤーのDOM生成とCSS変数更新は `src/scripts/zone-atmosphere.js` に切り出し、ブレンド計算は既存 `script.js` 側に残す。
- Heroのオーロラ用オーバーレイ生成は `src/scripts/hero-aurora-overlay.js` に切り出し、表示切り替えは既存CSSとゾーン状態に任せる。
- Hero画像のloaded class付与は `src/scripts/hero-image-loader.js` に切り出し、初期表示のフェードインだけを独立管理する。
- 縮小モーション設定の読み取りとbody class同期は `src/scripts/motion-preferences.js` に切り出し、Canvas停止/再開処理は既存 `script.js` 側に残す。
- ページ内リンクのスムーススクロールは `src/scripts/smooth-scroll.js` に切り出し、縮小モーション時の挙動だけ既存初期化から渡す。
- スクロール進捗バーとナビのscrolled状態は `src/scripts/scroll-indicators.js` に切り出し、スクロールループから `update()` だけを呼ぶ。
- 見出しの一文字reveal用DOM生成は `src/scripts/text-reveal.js` に切り出し、IntersectionObserver側の表示タイミングは既存 `script.js` に残す。
- Heroのパララックス更新は `src/scripts/hero-parallax.js` に切り出し、縮小モーション時の停止判断は既存初期化側に残す。
- カード表示・統計カウンター・Process表示のIntersectionObserver管理は `src/scripts/scroll-animations.js` に切り出し、既存DOMとvisible classの契約は維持する。
- Canvasのviewport寸法同期は `src/scripts/canvas-size.js` に切り出し、描画エンジン側のresize前処理を薄くする。
- ページ非表示時の停止/再開フックは `src/scripts/visibility-playback.js` に切り出し、実際のCanvas停止/再開処理は既存 `script.js` のコールバックに残す。
- resizeイベントのデバウンス登録は `src/scripts/resize-listener.js` に切り出し、Canvas再初期化やゾーン更新は既存 `script.js` のコールバックに残す。
- アニメーションフレームの複数キャンセルは `src/scripts/animation-frames.js` に切り出し、各描画エンジンの停止処理から呼び出す。
- Canvasのクリア処理は `src/scripts/canvas-clear.js` に切り出し、reduced motion時は描画エンジン側から呼び出す。
- カーソルリングのhover class制御は `src/scripts/cursor-hover.js` に切り出し、マウス座標やカードtilt処理は既存 `script.js` に残す。
- カードtilt用の `--mouse-x` / `--mouse-y` 更新は `src/scripts/card-hover-fields.js` に切り出し、mousemove内の風入力やBook 3D処理は既存 `script.js` に残す。
- 書籍表紙の3D tiltとglare更新は `src/scripts/book-tilt.js` に切り出し、mousemove内から `update()` だけを呼ぶ。
- pointer/mousemoveのイベント登録は `src/scripts/pointer-input.js` に切り出し、座標・風・hover更新の処理は既存 `script.js` のコールバックに残す。
- scrollイベントのrequestAnimationFrameスロットリングは `src/scripts/scroll-ticker.js` に切り出し、進捗・Hero・ゾーン更新は既存 `script.js` のコールバックに残す。
- Aurora canvasの生成・波生成・描画ループ・停止/クリアは `src/scripts/aurora-canvas.js` に切り出し、ゾーン側からopacityだけを更新する。
- Moonゾーンのshooting starsは `src/scripts/shooting-stars.js` に切り出し、Sakura描画ループから `ensure()` / `update()` だけを呼ぶ。
- カスタムカーソルのdot/ring追従ループは `src/scripts/cursor-follow.js` に切り出し、pointer入力から座標だけ渡す。
- Sakura/Petalの生成・描画ループ・マウス反発・ゾーン別Firefly/Micro変化は `src/scripts/sakura-petals.js` に切り出し、Moon補助演出だけコールバックで連携する。
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
