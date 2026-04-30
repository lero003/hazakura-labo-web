# Hazakura Labo Web Improvement Principles

このサイトは、完成品LPではなく、葉桜ラボの思想・実験・問い・制作物が循環する1ページの実験庭園であり、出版物・アプリ開発・AI実験・将来構想を束ねる活動母艦です。
きれいに整えるだけでなく、ときどき無駄にリッチで、少し過剰で、遊び心のある表現を試してよいです。

ただし、リッチ化の目的は「情報量を増やすこと」ではなく、ページを見た人が、葉桜ラボの空気・思想・遊び・怪しさ・やさしさをより強く感じることです。

## Webでやること

- 思想、問い、実験、制作物の見せ方を育てる。
- Library、Research Log、Projects、Visionが同じ循環の中にあることを伝える。
- Kindle本を販売棚ではなく、問いが結晶化した書庫として見せる。
- フォームやCMSの「構想」や「入口」を表現する。
- ユーザーが預けたくなる雰囲気を設計する。

## まだWebでやらないこと

- 実際に問いや記憶を預かる本格フォーム。
- 認証、保存、投稿管理。
- 地域LLM / AI万屋の運用基盤。
- CMS本体。

## 基本方針

1. This site is a one-page experimental garden, not a product dashboard.
2. Prefer atmosphere, rhythm, surprise, and memory over feature completeness.
3. It is acceptable to add playful, ornamental, or slightly excessive interactions if they make the page feel more alive.
4. Richness is allowed. Bloat is not.
5. Do not add new cards just to increase volume.
6. When adding expression, prefer motion, transition, layering, microcopy, visual rhythm, scroll experience, seasonal or symbolic motifs, and strange but gentle details.
7. Every change should improve at least one of emotional atmosphere, philosophical clarity, visual rhythm, sense of discovery, or the loop from question -> experiment -> artifact -> question.
8. If a section feels dense, first try pruning, merging, folding, or staging it before adding more content.
9. Animation may be whimsical, but it must not make reading painful.
10. Keep the site static-first unless a dynamic feature clearly earns its complexity.

## 攻めてよいこと

- 花びら、葉、光、影、紙片、古い道具、神社的な気配などの演出を足す。
- スクロールに合わせて空気が変わる。
- セクション間に小さな間奏を入れる。
- QuoteやVisionの前後に、少し詩的な演出を入れる。
- カードの出方、重なり、奥行き、余韻を変える。
- モバイルで読んだときに、少し物語っぽく感じる流れにする。
- 役に立つか微妙でも、葉桜ラボらしい小さな仕掛けを試す。

## 避けること

- 似たようなカードや文章を増やしてリッチに見せる。
- 説明文を長くして思想を語りすぎる。
- セクションを増やしすぎて1ページの庭を壊す。
- 読みにくくなる演出。
- 重すぎるアニメーション。
- 本格フォーム、認証、投稿管理、CMS本体など、静的サイトの範囲を超える機能。
- 「サービスとして完成している」ように見せすぎること。
- RFP内の技術例を、現行Astro構成より優先して機械的に作ること。

## 判断基準

迷ったら、次の問いで判断してください。

- これは葉桜ラボの空気を濃くするか？
- これは見た人の記憶に残るか？
- これは情報追加ではなく、体験の密度を上げているか？
- これは1ページの庭として美しいか？
- これは少し変だけど、やさしいか？

## 外部視点からの補正

2026-04-30の外部レビューでは、葉桜ラボは「AIとの対話から生まれた思想・本・道具・構想を、庭のように育てている実験研究所」として伝わった。一方で、初見では思想とLibraryの印象が強く、Projects / Research Log / Vision の具体的な動きや相談口は奥に隠れて見えやすい。

今後の改善では、庭の入口と書庫の美しさを保ちつつ、奥に小さな灯りを置く。つまり、情報量を増やすのではなく、読者が「ここに入っていい」「これは実際に動いている」と感じる具体の手がかりを早めに見せる。

- Hero付近では、世界観だけでなく「本を書く、道具を作る、問いを記録する、構想を育てる」ような母艦の動きを短く予告する。
- Projectsでは、抽象説明よりも「問い / 実験 / 状態」が先に立つようにする。代表実験を3つの灯りとして見せる案を優先候補にする。
- Visionでは、AI万屋、AI寺子屋、自分史、地域知識循環などの構想を、名前だけでなく「何を相談していいか」の1行具体例で受ける。
- Libraryが強くなりすぎる場合は、本から生まれた実験や残った問いを小さく添え、書庫をProjectsの起点として読む流れを強める。
- 抽象的な語りを削りすぎる必要はない。ただし「移ろい」「循環」「問い」「結晶」のような抽象語には、椅子、雨、温かい飲み物、道具、相談、記録のような具体物をできるだけ一つ添える。
- JS描画中心の要素は、外部の読み取りや検索、アクセシビリティ上で存在感が薄くならないか注意する。必要ならAstro側に静的な道標だけ置く。

## 現在の改善方針

今は、情報を増やす段階から、既存コンテンツを整理しつつ、演出・余白・リズム・発見感でリッチにする段階です。

ただし、実験場なので、無難に整えるだけで終わらせない。小さくても「なんか変だけど好き」と思える表現を歓迎します。

「小さく進める」は、演出を小さくするという意味ではありません。変更の狙いをひとつに絞り、検証しやすく、戻しやすくするという意味です。狙いが明確なら、スクロール間奏、季節テーマ、光や葉のレイヤー、Quote前の循環演出など、見た目には大きく感じる改善も歓迎します。

1時間ごとの改善では、観察と検証に少し余白を使ってよいです。文脈、データ、描画、スタイル、phase gateが同じ弱点につながっているなら、別々の細切れにせず、ひとまとまりの改善として扱ってかまいません。

同じくらい、CSS / JS / Astroの小さな整理も歓迎します。構造改善は地味な清掃ではなく、次の表現が迷子にならないための庭仕事として扱います。
