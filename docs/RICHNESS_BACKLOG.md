# リッチ化バックログ

小さく切って進めるための候補置き場。1時間ごとの改善サイクルでは、基本は1回の作業で1テーマだけ拾う。焦点が同じなら、文言、データ境界、CSS / JS / Astro、phase gate、ログ更新までを一塊で扱ってよい。

## RFP Alignment 2026-04-28

- [P1 / 45〜60分] RFP更新後のLibrary文脈を点検する。2冊のKindle本が「販売棚」ではなく「問いの結晶」として読めるか、見出し・説明・橋渡し文に加えて、必要なら関連CSSやphase gateまでまとめて調整する。
- [P1 / 45〜75分] CSS肥大化の入口調査をする。`src/styles/site.css` の大きなセクション、重複値、似たセレクタを1テーマだけ選び、見た目を変えずに整理する。影響範囲が明確なら、対応するAstro classやJS hookの命名も同時に揃える。
- [P2 / 45〜75分] `src/pages/index.astro` 内のLibrary直書き部分を点検し、データ分離した方がよい境界を1つだけメモまたは実装する。`books.ts` 化は目的化しないが、既存の `src/data/` と互換配信に沿うなら、描画と検証まで進めてよい。
- [P2 / 45〜60分] Research Logの現在の扱いがRFPの「問い -> 実験 -> 気づき -> 次に試すこと」と合っているか確認し、足りないラベル、順序、戻り導線、表示密度を同じ焦点の範囲で直す。
- [P2 / 45〜60分] OGP / favicon / metaの現状を確認し、Cloudflare Pages上で相対パスが迷子にならないかを点検する。必要なら `src/data/` のmeta境界、head出力、phase gateを一緒に整える。

## Review Follow-ups 2026-04-27

- [P1 / 45〜60分] Library末尾からProjects冒頭への橋渡しを見直す。書籍を「販売物」ではなく「問いが結晶化した記録」として受け、次の制作実験へ流れる導入文、余白、CTAの強弱、モバイル表示まで一続きで確認する。
- [P2 / 45〜60分] Projectsの見出しと棚ステータスを、「つくったもの」より「問いから生まれた実験」に寄せる。カード本文は増やしすぎず、section label / title / desc / overview / filter状態文を同じ文脈へ揃える。
- [P3 / 45〜60分] Visionの冒頭を「未来の地図」から「次に育つ問い」へ寄せて読めるか点検する。entry guide と process flow の見え方、冒頭コピーのコントラスト、最初のカードまでの余白、Research Logへの戻り道まで整える。
- [P4 / 45分] Heroの副CTA「本をみる」が初見の重心をLibraryへ寄せすぎていないか点検する。新規導線は増やさず、ラベル・強弱・行き先・スクロール後の受け皿を比較して1案だけ実装する。
- [P5 / 45〜60分] Quote前のpreludeが、Library / Projects / Visionで拾った問いを最後に畳む役目として読めるか見直す。文言を増やしすぎず、拾う対象の順序、カード内余白、到着演出、phase gateを一緒に確認する。

## Narrative

- Research Logのミニサンプルを1件入れる
- Magic Toolsの「なぜ作ったか」を各制作物カードに1文ずつ足す
- Quote前に「循環」の気配をもう一段つくる

## Visual

- Kindle本の3D表現に実表紙画像を使うか検討する
- 制作物カードの画像比率をそろえる
- `構造` セクションに薄い時間軸表現を足す

## Motion

## Content

- `projects` に Research Log / Magic Tools の試作カードを足す
- `visions` に「地域LLM」「レトロ・ガジェット再生」を足す
- AI寺子屋の入口文を、将来フォーム化できる形にする

## Access

- ナビのモバイル表示をさらに読みやすくする
- 外部リンクとダウンロードリンクの見分けを整える
- 画像のalt文を全体点検する

## Structure

- `visions` の構想カードと入口文を、将来フォーム化しやすい小さなグループに寄せる
- `src/scripts/content-renderers.js` の描画単位を点検し、Projects / Vision / Quote prelude の差し替え口がわかる短い境界コメントか関数名へ寄せる
- `scripts/phase-gate.mjs` に、次に壊したくない導線を1つだけ追加する。例: Projectsフィルター、Quote prelude、主要scriptの読み込み順
- Astro island化候補を1つ選び、実装ではなく「今のvanilla JS境界で十分か / island化で何が楽になるか」を `docs/ASTRO_MIGRATION_PLAN.md` に1段落だけ追記する
