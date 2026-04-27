# Astro移行メモ

葉桜ラボの1ページを壊さず、Cloudflare Pagesで静的ビルドできるAstro構成へ移した段階的な作業メモです。

## Phase A: Astro shell

目的: 既存の見た目と演出をできるだけ維持したまま、Astroで静的ビルドできる状態を作る。

- Astro projectをリポジトリルートに置く。
- 既存の `index.html` 相当を `src/pages/index.astro` として移植する。
- 既存の画像 / downloads は、まず `public/` 互換で読み込む。`content.js` / `style.css` / 旧 `script.js` はAstro配信の互換ルートへ移した。
- 既存JSはAstroにバンドルさせず、`is:inline` 付きの外部scriptとして読み込む。
- Cloudflare Pagesは root directory をリポジトリルート、build command を `npm run build`、output を `dist` にする。
- `npm run build` が通ることをPhase Aの完了条件にする。

Status: 完了。リポジトリルートの Astro project から `dist/` を生成する。

## Phase B: Content split

目的: 表示構造は大きく変えず、コンテンツだけを育てやすい単位へ分ける。

- `src/data/` にコンテンツを分け、Astroの静的エンドポイント `src/pages/content.js.ts` から従来どおり `window.HAZAKURA_CONTENT` を配信する。
- `content.js` の Research Log / Projects / Vision / stats / philosophy を分割候補にする。
- 最初はJSONまたはTS dataでよい。Markdown/MDXやAstro Content Collectionsは、編集頻度が上がってから判断する。
- Projectsは `lanes` / `overview` / `actionTypes` / `items` を同じ境界として扱う。`actionTypes` は独立したガイドを再表示するためではなく、CTAと棚ステータス文のラベル契約として扱う。
- Visionは `entryGuide` と `items` を分けつつ、描画上の見え方は変えない。
- 既存のカード構造、フィルター、アンカー、CTAは大きく変えない。

Status: 完了。`src/data/` へ分割し、`/content.js` は互換配信として維持する。

## Phase C: Rich islands

目的: 動く部分だけを安全にisland化し、演出の実験をしやすくする。

- Philosophy / Research Log / Projects / Vision などのDOM描画は `src/scripts/content-renderers.js` に切り出し、`app-controller.js` から描画起動とhover対象更新だけを行う。
- Projectsのカード生成は `src/scripts/project-renderer.js` に切り出し、棚フィルターは `src/scripts/project-filter.js` へ委ねる。`content-renderers.js` はセクション描画の起動順だけを持つ。
- Quote前の循環メモ描画は `src/scripts/quote-prelude.js` に切り出し、あとから演出だけ差し替えやすい境界にする。
- ゾーンナビのDOM生成とactive表示は `src/scripts/zone-nav.js` に切り出し、ゾーン司令塔から操作する。
- ゾーン雰囲気レイヤーのDOM生成とCSS変数更新は `src/scripts/zone-atmosphere.js` に切り出し、ブレンド計算はゾーン司令塔へ移す。
- ゾーン判定・ナビ選択・背景/境界線/Atmosphere更新・Canvas演出のゾーン同期は `src/scripts/zone-performance.js` にまとめ、`app-controller.js` は `update()` を呼ぶだけにする。
- Heroのオーロラ用オーバーレイ生成は `src/scripts/hero-aurora-overlay.js` に切り出し、表示切り替えは既存CSSとゾーン状態に任せる。
- Hero画像のloaded class付与は `src/scripts/hero-image-loader.js` に切り出し、初期表示のフェードインだけを独立管理する。
- 縮小モーション設定の読み取りとbody class同期は `src/scripts/motion-preferences.js` に切り出し、Canvas停止/再開処理は `app-controller.js` 側で束ねる。
- ページ内リンクのスムーススクロールは `src/scripts/smooth-scroll.js` に切り出し、縮小モーション時の挙動だけ既存初期化から渡す。
- スクロール進捗バーとナビのscrolled状態は `src/scripts/scroll-indicators.js` に切り出し、スクロールループから `update()` だけを呼ぶ。
- 見出しの一文字reveal用DOM生成は `src/scripts/text-reveal.js` に切り出し、IntersectionObserver側の表示タイミングは `src/scripts/scroll-animations.js` に寄せる。
- Heroのパララックス更新は `src/scripts/hero-parallax.js` に切り出し、縮小モーション時の停止判断は既存初期化側に残す。
- カード表示・統計カウンター・Process表示のIntersectionObserver管理は `src/scripts/scroll-animations.js` に切り出し、既存DOMとvisible classの契約は維持する。
- Canvasのviewport寸法同期は `src/scripts/canvas-size.js` に切り出し、描画エンジン側のresize前処理を薄くする。
- ページ非表示時の停止/再開フックは `src/scripts/visibility-playback.js` に切り出し、実際のCanvas停止/再開処理は `app-controller.js` のコールバックで束ねる。
- resizeイベントのデバウンス登録は `src/scripts/resize-listener.js` に切り出し、Canvas再初期化やゾーン更新は `app-controller.js` のコールバックで束ねる。
- アニメーションフレームの複数キャンセルは `src/scripts/animation-frames.js` に切り出し、各描画エンジンの停止処理から呼び出す。
- Canvasのクリア処理は `src/scripts/canvas-clear.js` に切り出し、reduced motion時は描画エンジン側から呼び出す。
- カーソルリングのhover class制御は `src/scripts/cursor-hover.js` に切り出し、マウス座標やカードtilt処理は `app-controller.js` から各islandへ渡す。
- カードtilt用の `--mouse-x` / `--mouse-y` 更新は `src/scripts/card-hover-fields.js` に切り出し、mousemove内の風入力やBook 3D処理は `app-controller.js` から各islandへ渡す。
- 書籍表紙の3D tiltとglare更新は `src/scripts/book-tilt.js` に切り出し、mousemove内から `update()` だけを呼ぶ。
- pointer/mousemoveのイベント登録は `src/scripts/pointer-input.js` に切り出し、座標・風・hover更新の処理は `app-controller.js` のコールバックで束ねる。
- scrollイベントのrequestAnimationFrameスロットリングは `src/scripts/scroll-ticker.js` に切り出し、進捗・Hero・ゾーン更新は `app-controller.js` のコールバックで束ねる。
- Aurora canvasの生成・波生成・描画ループ・停止/クリアは `src/scripts/aurora-canvas.js` に切り出し、ゾーン側からopacityだけを更新する。
- Moonゾーンのshooting starsは `src/scripts/shooting-stars.js` に切り出し、Sakura描画ループから `ensure()` / `update()` だけを呼ぶ。
- カスタムカーソルのdot/ring追従ループは `src/scripts/cursor-follow.js` に切り出し、pointer入力から座標だけ渡す。
- Sakura/Petalの生成・描画ループ・マウス反発・ゾーン別Firefly/Micro変化は `src/scripts/sakura-petals.js` に切り出し、Moon補助演出だけコールバックで連携する。
- 最後の起動処理は `src/scripts/app-controller.js` に移し、ページ側は Astro ルートから配信される `/app-controller.js` を読む。
- 棚フィルターをProjects islandとして分離する。
- 花びら/葉/光のCanvas演出を、初期化と破棄ができる小さなscriptへ分ける。
- Quote前の循環演出を、文言とモーションを別々に調整できる単位にする。
- モバイル向けの小さな演出は、表示領域に入ってから動くようにする。
- island化する時も、最初は見た目とDOM構造をできるだけ変えない。

Status: 完了。旧 `public/script.js` は削除し、起動処理は `/app-controller.js` へ移行した。

## Phase D: Experimental garden

目的: 季節テーマや間奏セクションを、ページ全体を壊さず差し替えられる構造へ育てる。

- 季節テーマをデータまたは設定として持つ。
- セクション間の間奏を、追加・削除しやすいコンポーネントにする。
- 祠的な遊びや隠し演出は、主要導線を妨げない独立した入口にする。
- セクション間トランジションは、既存スクロール体験を壊さない範囲で検証する。
- 大きな演出を入れる前に、低スペック端末とモバイル幅での負荷を確認する。
- 大きめの演出も、1つの問いや導線改善に閉じていて、CSS/vanilla JSの境界が明確なら通常の改善ループで扱ってよい。

## 現時点の方針

Astro版だけを本線として扱います。旧 `hazakura-onepage-lab/` の比較用アーカイブは削除済みで、現在の公開候補は `src/` と `public/` から組み立てます。Cloudflare Pagesは root directory をリポジトリルート、build command を `npm run build`、output を `dist` にする前提です。

大きい演出を切り出す前後に、`npm run check:phase` で静的な完了条件を確認します。このチェックは `dist/index.html`、主要セクション順、生成JS、必須assets、旧 `/script.js` が出力されていないこと、旧静的版ディレクトリが残っていないこと、`src/data/` と `/content.js` の一致を見ます。ブラウザ上の目視確認は別途行います。
