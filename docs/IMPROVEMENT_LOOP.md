# 小さくリッチにし続ける改善ループ

このサイトは一度の大改修ではなく、短いルーチンで「読み味」「触り味」「情報の濃さ」を増やしていく。

## 1回の作業単位

目安は15分から60分。1回に触るテーマはひとつだけにする。

1. 今日の焦点を決める
2. 1セクションだけ観察する
3. 小さく変更する
4. ブラウザで確認する
5. 変更ログに残す

## 焦点の選び方

- Narrative: 文章、順番、余韻をよくする
- Visual: 余白、色、画像、カードの密度をよくする
- Motion: スクロール、粒子、ホバー、ゾーン遷移をよくする
- Content: 制作物、構想、Research Log候補を増やす
- Access: モバイル、可読性、リンク、導線をよくする
- Structure: データ化、命名、ファイル分割、将来のCMS化を進める

## 作業前チェック

- `RFP.md` の思想から外れていないか
- 1ページ内で意味の流れが増えているか
- 演出が本文の読みやすさを邪魔していないか
- 追加するものは `content.js` に置けないか
- `main` へpushすると https://hazakura-labo-web.pages.dev に自動デプロイされる前提で安全な変更か

## 作業後チェック

最低限この3つを見る。

```sh
node --check hazakura-onepage-lab/content.js
node --check hazakura-onepage-lab/script.js
```

ブラウザでは以下を見る。

- ファーストビューでブランドと世界観が伝わる
- `構造` セクションが崩れていない
- 制作物カードが増減してもレイアウトが壊れない
- モバイル幅で横スクロールが出ない

## デプロイ前チェック

GitHubの `main` にpushするとCloudflare Pagesへ自動デプロイされる。現在のCloudflare設定は、root directoryが `hazakura-onepage-lab`、ビルドコマンドなし、フレームワークなし。

フレームワーク導入は検討してよい。ただし、導入時は次の崩れに注意する。

- Cloudflare Pagesのroot/build/output設定が変わる
- `./img/...` や `downloads/...` の相対パスが変わる
- 既存の `file://` 確認とPages上の挙動がずれる
- Canvas、スクロールゾーン、カスタムカーソルの初期化順が変わる
- 生成後のHTML/CSS/JS構造により、現在の1ページ演出が崩れる

フレームワークを試す時は、まず検証ブランチで小さく移植し、既存サイトと見比べる。

## ログの残し方

作業したら [docs/RICHNESS_LOG.md](/Users/keisetsu/Projects/hazakura-labo-web/docs/RICHNESS_LOG.md) に短く残す。

形式:

```md
## YYYY-MM-DD
- Focus: Narrative / Visual / Motion / Content / Access / Structure
- Changed: 何を変えたか
- Learned: 次回に活かす気づき
- Next: 次に小さくやること
```
