# 葉桜ラボ Webサイト — 開発ハンドオフ

## サイト構成

```
TOP / Product / Notes の3ページ構成
```

- `/` — TOP（紹介文 + 代表プロダクト + 最新Notes）
- `/products` — Product一覧（Released/Growing/Experiment の3ステータス）
- `/notes` — Notes一覧
- `/notes/[slug]` — Notes詳細

## 技術スタック

- Astro 6（静的ビルド、`output: 'static'`）
- Content Collections（glob loader、Markdown）— `src/content.config.ts`
- バニラJS（インタラクション系、`public/scripts/`）
- CSS（手書き、`src/styles/site.css`）

## 開発コマンド

```bash
npm run dev       # 開発サーバー
npm run build     # ビルド
npm run preview   # プレビュー
```

## ディレクトリ構成

```
src/
  pages/
    index.astro              # TOP
    products.astro           # Product一覧
    notes/
      index.astro            # Notes一覧
      [...slug].astro        # Notes詳細
  content/
    notes/                   # Markdown記事
      *.md
  content.config.ts          # Content Collections定義
  layouts/
    BaseLayout.astro         # 共通レイアウト
    NoteLayout.astro         # Notes詳細レイアウト
  components/
    Header.astro             # グローバルナビ
    FooterSection.astro      # フッター
    LogoMark.astro           # ロゴ
    ProductCard.astro        # プロダクトカード
    NoteCard.astro           # ノートカード
  data/
    site-meta.js             # サイトメタ情報
    products.js              # プロダクトデータ
  styles/
    site.css                 # 全スタイル
public/
  scripts/                   # バニラJS（インタラクション系）
  img/                       # 画像
  downloads/                 # ダウンロードファイル
```

## Notes記事の追加方法

1. `src/content/notes/` にMarkdownファイルを追加
2. frontmatterに以下を定義:

```md
---
title: "記事タイトル"
description: "記事の説明"
pubDate: 2026-05-03
tags: ["AI", "制作"]
source: "note"        # note | original（省略可）
---
```

3. ビルドすれば自動で一覧・詳細ページに反映

## Productの追加方法

`src/data/products.js` にオブジェクトを追加。`status` は `Released` / `Growing` / `Experiment` のいずれか。

## インタラクション

- 桜花びら（sakura-petals.js）、カスタムカーソル（cursor-follow.js）、ゾーン雰囲気（zone-atmosphere.js）等を残している
- `public/scripts/` に移動済み。BaseLayout.astroで読み込み順を制御
- app-controller.js が各モジュールを統合・初期化

## 既知の残タスク

- **CSS整理**: 旧セクションのスタイル（8798行中の多く）が残存。不要スタイルの剪定が必要
- **ゾーン雰囲気の調整**: 単一長ページ前提の設計が残る。複数ページ向けに各ページの雰囲気を固定する等の調整が望ましい
- **Notes記事**: 現在ダミー3本。本番記事に差し替えが必要
- **画像整理**: `public/img/` に旧セクション用画像が残る可能性あり
- **モバイルナビ**: ハンバーガーメニュー等のモバイル向けナビ未実装（旧CSSに定義あり）

## リニューアル方針

企画書: `/Users/keisetsu/Downloads/hazakura_labo_site_plan.md`

合言葉: 構造はシンプルに。置く文章は選ぶ。世界観は薄めず、入口だけ親切に。
