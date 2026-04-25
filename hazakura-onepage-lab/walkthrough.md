# 葉桜ラボ onepage lab — 現状ウォークスルー

## 概要

`hazakura-onepage-lab` は、葉桜ラボのRFPを起点にした1ページWebサイトです。

目的は「完成形のLP」を固定することではなく、1ページのまま、思想・制作物・演出・地域循環の入口を少しずつ濃くしていくことです。

## ファイル構成

| ファイル | 役割 |
|---------|-----|
| `index.html` | セクションの順番、ナビゲーション、大きな舞台装置 |
| `content.js` | 哲学カード、構造カード、実績、制作物、構想のデータ |
| `style.css` | 見た目、レスポンシブ、昼夜テーマ、カード表現 |
| `script.js` | データ描画、花びら、スクロール、ゾーン遷移、カウンター |
| `RICH_ONE_PAGE_ARCHITECTURE.md` | 1ページ拡張の設計メモ |
| `docs/README.md` | サイト本体側のメモ置き場 |

## 現在のセクション

1. Hero: 世界観と第一印象
2. Philosophy: 三つの花弁
3. One-page Architecture: 1ページを層として育てる考え方
4. Library: 『チカちゃんの哲学冒険譚』
5. Projects: 制作物一覧
6. Vision: Research Log / Magic Tools / AI寺子屋 / 自分史
7. Quote: 余韻と思想の着地

## コンテンツ追加の基本

制作物や構想カードを増やす時は、まず `content.js` を編集します。

HTMLにカードを直接足すのは、まだデータ化していない新しい表現型を試す時だけにします。表現型が固まったら、次の改善ループで `content.js` 側へ寄せます。

## 確認方法

ブラウザで直接開きます。

```text
file:///Users/keisetsu/Projects/hazakura-labo-web/hazakura-onepage-lab/index.html
```

構文チェック:

```sh
node --check hazakura-onepage-lab/content.js
node --check hazakura-onepage-lab/script.js
```

## 改善ループ

日々のルーチンはルートの `docs/` を参照します。

- `../docs/IMPROVEMENT_LOOP.md`
- `../docs/RICHNESS_BACKLOG.md`
- `../docs/RICHNESS_LOG.md`
