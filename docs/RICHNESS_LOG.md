# リッチ化ログ

## 2026-04-27

- Focus: Content / Structure
- Changed: `visionsGroup.entryGuide` を追加し、将来フォーム化する「問い」「記憶」「古い道具」の入力種別ガイドを Vision セクション先頭に描画できるようにした。
- Learned: コミュニティ導線はフォーム本体を急がず、まず何を預けられる場所なのかをデータ化して見せるだけでも、RFPの「問い」「物語」「レトロ・ガジェット再生」へ接続しやすくなる。
- Next: `entryGuide.kinds` と各 Vision カードの `entry.kind` を対応させ、入力種別ごとの初期カード表示やフォーム下書きへつなげる。

## 2026-04-27

- Focus: Structure / Content
- Changed: `visions` を `visionsGroup.items` に寄せ、AI寺子屋と自分史編纂の入口文を `entry.label` / `entry.prompt` / `entry.kind` に分けて描画する形にした。
- Learned: 入口文を1本の文章から小さなオブジェクトへ分けると、将来フォーム化するときに「問い」「記憶」などの入力種別をそのまま扱いやすい。
- Next: `visionsGroup` にセクション前文や入力種別ガイドを足し、コミュニティ・インターフェースの下書きをもう少し見えるようにする。

## 2026-04-27

- Focus: Structure
- Changed: `researchLogs` と `cycleBridge` を `researchGroup` にまとめ、`renderResearchGroup` から Research Log カードと循環メモを同じ入口で描画する形にした。
- Learned: Vision 前後の読み物データを同じ境界に置くと、Research Log を増やす時に「問いの記録」と「循環への橋」を一緒に扱いやすい。
- Next: `visions` の構想カードと入口文を、将来フォーム化しやすい小さなグループに寄せる。

## 2026-04-27

- Focus: Structure
- Changed: Projects 周辺の `projectLanes` / `projectLaneOverview` / `projectActionGuide` / `projects` を `projectsGroup` にまとめ、`renderProjects` と `initProjectLaneFilter` が同じ入れ子を受け取る形にした。
- Learned: 棚定義・概要文・リンク種別・カード本体を一つの境界に置くと、将来JSON化するときに Projects だけを安全に切り出しやすい。
- Next: Research Log と循環メモを `researchGroup` に寄せ、読み物系データの境界も同じ粒度で整える。

## 2026-04-27

- Focus: Structure
- Changed: `hazakura-onepage-lab/docs/CONTENT_DATA_MAP.md` を追加し、`content.js` のデータ群、描画関数、HTML受け口、Projects周辺の分割単位を整理した。
- Learned: Projects はカード本体だけでなく棚定義、概要文、リンク種別ガイドが同じ描画関数に乗っているため、JSON化時は一まとまりで扱うほうが安全。
- Next: `projects` 関連データを小さな入れ子にまとめ、`renderProjects` と `initProjectLaneFilter` の参照を合わせる。

## 2026-04-26

- Focus: Structure
- Changed: `hazakura-onepage-lab/walkthrough.md` を現状の Projects 棚、Research Log、循環導線、モーション低減対応に合わせて更新し、完了したバックログ項目を整理した。
- Learned: 1ページ内の表現が増えるほど、運用メモにも `content.js` のどのデータがどの導線を支えるかを書いておくと、次の小改善で迷いにくい。
- Next: `content.js` を将来JSON化しやすい単位へ分ける前に、まずデータ群の境界と依存している描画関数を短く棚卸しする。

## 2026-04-26

- Focus: Narrative / Content
- Changed: Projects の各カードに `surprise` を追加し、動機の下に「どんな驚きがあったか」を小さく表示できるようにした。
- Learned: RFPの Magic Tools は機能と動機だけでなく、作った後に見えた発見を同じカードに置くと、道具がResearch Logへ戻る循環として読める。
- Next: `surprise` が増えてきたら、Magic Tool / Research Log / Story Seed ごとに見出しラベルの言葉を少し変える。

## 2026-04-26

- Focus: Access / Structure
- Changed: Projects に `projectActionGuide` を追加し、外部リンクとダウンロードの違いをカード一覧前の短いガイドとして表示した。
- Learned: カード内の小さなバッジだけでなく、一覧の入口にも行き先の意味を置くと、未署名DMGのような注意が必要な導線を落ち着いて読める。
- Next: ダウンロード系の制作物が増えたら、注意文をカードごとに `content.js` へ持たせて表示する。

## 2026-04-26

- Focus: Access / Narrative
- Changed: Projects の棚フィルターに合わせて、棚ガイドの選択状態と短い説明文が切り替わるようにした。
- Learned: 絞り込み結果だけでなく「今どの棚を見ているか」の文脈も動かすと、制作物一覧が単なるフィルターではなく道具・問い・物語の循環として読める。
- Next: 制作物が増えたら、選択中の棚に合わせてカードの並びやResearch Logの見せ方を小さく調整する。

## 2026-04-26

- Focus: Access / Structure
- Changed: Projects の `projectLanes` から「すべて / 道具の棚 / 問いの棚 / 物語の棚」の絞り込みボタンを生成し、制作物カードを棚ごとに見られるようにした。
- Learned: 棚ガイドと同じデータで絞り込みまで作ると、カードが増えてもHTMLを増やさず、1ページ内の探索導線を濃くできる。
- Next: 絞り込み状態に合わせてセクション説明や棚ガイドをもう少し呼応させるか、カードが増えてから検討する。

## 2026-04-26

- Focus: Content / Structure
- Changed: Projects の前に `projectLanes` 由来の棚ガイドを追加し、Magic Tool / Research Log / Story Seed の役割と件数を一覧前に読めるようにした。
- Learned: lane ラベルをカード内だけでなく一覧の入口にも置くと、制作物が増えても「道具・問い・物語」の棚として見通しを保ちやすい。
- Next: 棚ごとのカードが増えたら、同じ `projectLanes` を使って軽い絞り込みを追加する。

## 2026-04-26

- Focus: Content / Access
- Changed: Projects の各カードに `lane` を追加し、Magic Tool / Research Log / Story Seed の小さな分類ラベルを表示できるようにした。
- Learned: 制作物が増え始めた段階でRFP上の役割を短く見せておくと、一覧が単なるカード列ではなく「探求・道具・物語」の棚として読みやすくなる。
- Next: Projects がさらに増えた時に、同じ `lane` を使って軽い絞り込みや並び替えを足すか検討する。

## 2026-04-26

- Focus: Content / Narrative
- Changed: Projects に「情緒プロンプト実験ノート」の種カードを追加し、任意の `cycle` データがある制作物だけ「問い・実験・発見」をミニ表示できるようにした。
- Learned: Works 側にも Research Log の型を少し混ぜると、道具一覧が単なる成果物ではなく、RFPの「探求の可視化」と「Magic Toolsの驚きの記録」に近づく。
- Next: 追加した種カードが増えても読みやすいように、Projects の並びやカテゴリ見出しを小さく整理する。

## 2026-04-26

- Focus: Visual / Narrative
- Changed: Library の3D本表紙に既存の `bk_hero.png` を薄く重ね、タイトルやKindleバッジの可読性を保つためのオーバーレイと影を調整した。
- Learned: 書庫の本が抽象的なグラデーションだけでなく作品世界の絵を帯びると、RFPの「表紙、あらすじ、扱っている問い」という Library 要件に近づく。
- Next: `projects` に Research Log / Magic Tools の試作カードを1件足し、制作物一覧にも「問い→実験→発見」の入口を増やす。

## 2026-04-26

- Focus: Visual / Structure
- Changed: `experienceLayers` に各層の育ち方を示す短い `cadence` を追加し、構造セクションへ薄い時間軸のレールと補助ラベルを重ねた。
- Learned: 1ページを増築する順番を小さなラベルで見せると、RFPの「探求の可視化」と「循環型CMS」への接続が説明文を増やさず伝わりやすくなる。
- Next: Library の3D本表現に実表紙画像を使うか検討し、書庫セクションの具体感をもう一段だけ濃くする。

## 2026-04-26

- Focus: Visual / Access
- Changed: 制作物カードのサムネイル枠を 3:2 に揃え、画像なしカードにもプレースホルダー用の枠スタイルが効くようにした。
- Learned: 画像あり・なしが混ざる Projects では、カード本文より先にメディア枠の比率を固定すると、一覧の読み始めが安定する。
- Next: Kindle本の3D表現に実表紙画像を使うか検討し、Library の視覚情報をもう一段だけ具体化する。

## 2026-04-26

- Focus: Motion / Visual
- Changed: `構造` セクションのレイヤーカードに、順番を示す小さなシグナルと遅延付きの立ち上がりを追加した。
- Learned: カード本文を増やさなくても、番号・点・細い光の立ち上がりを揃えるだけで「一枚の中に層をつくる」感覚が伝わりやすくなる。
- Next: 制作物カードの画像比率をそろえ、画像あり・なしのカード密度をもう少し安定させる。

## 2026-04-26

- Focus: Motion / Visual
- Changed: スクロールゾーンの境界付近で昼・夕・夜・月・オーロラの薄い大気レイヤーを重ね、Canvasフィルタもゆっくり遷移するようにした。
- Learned: ゾーン判定を大きく変えなくても、境界の前後だけ色を補間すると、本文の読みやすさを保ったまま「移ろい」の体感を濃くできる。
- Next: `構造` セクションでレイヤーが順番に立ち上がる演出を少し強める。

## 2026-04-26

- Focus: Access / Motion
- Changed: `prefers-reduced-motion` を検出し、Canvas粒子・オーロラ・カスタムカーソルの連続描画を起動しない経路と、即時スクロール・即時表示のCSS/JS対応を追加した。
- Learned: 演出のリッチさは常に動かすことだけではなく、動きを望まない環境で静かに読める余白を用意することでも濃くなる。
- Next: セクションごとのゾーン遷移を、通常モーション側で読み味を邪魔しない範囲でもう少しなめらかにする。

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
