# リッチ化ログ

## 2026-04-26

- Focus: Access
- Changed: ヒーロー画像と制作物画像のalt文を、画像の役割と情景が伝わる説明へ整え、画像なし制作物サムネイルは読み上げ対象から外した。
- Learned: 画像の説明はタイトルの繰り返しではなく、RFPの「理と情」や制作物の文脈を補う一文にすると、1ページの読み味を邪魔せず濃くできる。
- Next: `prefers-reduced-motion` 対応を追加し、演出量を選べるようにする。

## 2026-04-26

- Focus: Access
- Changed: モバイル時のナビを2段構成にし、5つのリンクを均等なレールとして表示して、タップ領域と読みやすさを安定させた。
- Learned: ロゴ文字を残したままリンクを5分割にすると、狭い幅でもブランドと導線を同時に保てる。
- Next: 画像のalt文を全体点検し、制作物と装飾画像の役割をもう少し明確にする。

## 2026-04-26

- Focus: Narrative / Content
- Changed: Vision セクション末尾に `cycleBridge` を追加し、Research Log / 自分史 / AI寺子屋 / 地域LLM が一つの知恵の巡りとして読める短い導入を表示した。
- Learned: 構想カードの後に一段だけ橋渡しを置くと、引用セクションの「移ろい」へ自然に接続できる。
- Next: ナビのモバイル表示を再点検し、5項目が狭い幅でも窮屈に見えないようにする。

## 2026-04-26

- Focus: Content / Narrative
- Changed: 自分史編纂カードに、将来フォーム化しやすい `entryQuestion` を追加し、記憶を預ける入口を一文で見えるようにした。
- Learned: AI寺子屋の「問い」と自分史の「記憶」を同じ小さな入口表現で揃えると、Vision セクションがコミュニティ・インターフェースの下書きとして読める。
- Next: Quote前に「循環」の気配をもう一段つくり、Research Log / 自分史 / 寺子屋が同じ流れに見える短い導入を足す。

## 2026-04-26

- Focus: Content / Narrative
- Changed: AI寺子屋カードの入口文を、子どもの学びとシニアの経験が巡る形へ整え、将来フォーム化できる `entryQuestion` を `content.js` から表示するようにした。
- Learned: 「問いを預ける」一文があると、Vision が構想紹介だけでなくコミュニティ・インターフェースの入口として読める。
- Next: 自分史編纂カードにも、記憶を預けるための短い問いを1つ足す。

## 2026-04-26

- Focus: Content / Narrative
- Changed: Vision セクションに「レトロ・ガジェット再生」の構想カードを追加し、古い道具へAIの対話を重ねるワークショップの種を見えるようにした。
- Learned: 地域LLMが知恵を返す循環炉なら、レトロ・ガジェット再生はその知恵がモノと記憶に触れる実験場として読ませられる。
- Next: AI寺子屋の入口文を、将来フォーム化できる問いかけの形へ少し寄せる。

## 2026-04-26

- Focus: Content / Narrative
- Changed: Vision セクションに「地域LLM」の構想カードを追加し、`vision-tag` を `content.js` から表示できるようにした。
- Learned: Research Log、自分史、AI寺子屋を「地域の言葉で返す知恵の循環炉」へつなぐと、RFPの循環型CMSの目的が1ページ内で見えやすくなる。
- Next: RFPの「レトロ・ガジェット再生」を Vision か Projects の小さな種として追加し、AI万屋の道楽感を具体化する。

## 2026-04-26

- Focus: Access / Content
- Changed: 制作物カードの行動導線に `actionType` / `actionLabel` を追加し、外部サイトとDMGダウンロードを見分けられる小さなバッジ表示に整えた。
- Learned: Projects のリンクは同じ位置に並ぶほど、外へ出る導線とファイル取得の導線をデータで分けておくほうが、将来カードが増えても迷いにくい。
- Next: `visions` に「地域LLM」か「レトロ・ガジェット再生」を1件足し、AI万屋の循環感をもう少し具体化する。

## 2026-04-26

- Focus: Narrative / Content
- Changed: Vision セクションに Research Log のミニサンプルを1件追加し、「問い→実験→発見」の読み口を `content.js` から描画する形にした。
- Learned: 構想カードだけだと未来の予告に見えるが、実ログの小片を挟むとRFPの「探求の可視化」が1ページ内で始まって見える。
- Next: 外部リンクとダウンロードリンクの見分けを整え、制作物カードの行動導線をもう少し読みやすくする。

## 2026-04-26

- Focus: Structure
- Changed: 実サイト本体を `qwen_lpQ2` から `hazakura-onepage-lab` に改名し、運用ドキュメントを追加。
- Learned: 1ページの限界を探るには、コンテンツ追加と演出追加を同じ場所に混ぜないほうが育てやすい。
- Next: `walkthrough.md` を現状の構成に合わせて更新し、古い生成物メモから運用メモへ寄せる。

## 2026-04-26

- Focus: Narrative / Content
- Changed: 制作物カードに `why` フィールドを追加し、「なぜ作ったか」を本文とは別の短い動機行として表示。
- Learned: Projects は機能説明だけだと道具一覧に寄りやすい。動機を分けるとRFPの Magic Tools らしい「驚きの記録」に近づく。
- Next: Research Log のミニサンプルを1件追加し、「問い→実験→発見」の入口を実カードとして見せる。

## 2026-04-26

- Focus: Structure
- Changed: GitHub push後のCloudflare Pages自動デプロイ先 `https://hazakura-labo-web.pages.dev` と、現在の静的サイト運用設定をREADMEと改善ループに追記。
- Learned: フレームワーク導入は将来の選択肢として残せるが、root/build設定、相対パス、スクロール・Canvas演出の初期化が崩れる可能性を先に見る必要がある。
- Next: 必要になったら、現状維持 / Astro / Vite / Next.js の比較メモを作る。
