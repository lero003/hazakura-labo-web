# content.js データ地図

`content.js` を将来 JSON 化・分割する前に、データ群と描画側の依存を小さく見える化しておく。

## 現在の流れ

| データ | 描画関数 | HTML の受け口 | 主な表示 |
| --- | --- | --- | --- |
| `philosophy` | `renderPhilosophy` | `[data-render="philosophy"]` | Core Philosophy の3カード |
| `experienceLayers` | `renderExperienceLayers` | `[data-render="experienceLayers"]` | One-page Architecture のレイヤーカード |
| `stats` | `renderStats` | `[data-render="stats"]` | カウントアップ数値 |
| `process` | `renderProcess` | `[data-render="process"]` | 問い、実験、発見、循環のステップ |
| `researchLogs` | `renderResearchLogs` | `[data-render="researchLogs"]` | Vision 前の Research Log カード |
| `visions` | `renderVisions` | `[data-render="visions"]` | 構想カード、入口文、タグ |
| `cycleBridge` | `renderCycleBridge` | `[data-render="cycleBridge"]` | Vision 末尾の循環メモ |
| `projectLanes` | `renderProjects` / `initProjectLaneFilter` | `[data-render="projects"]` | 棚ガイド、絞り込み、選択時コピー |
| `projectLaneOverview` | `renderProjects` / `initProjectLaneFilter` | `[data-render="projects"]` | Projects の棚ステータス文 |
| `projectActionGuide` | `renderProjects` | `[data-render="projects"]` | 外部リンク / ダウンロードの見分け |
| `projects` | `renderProjects` / `initProjectLaneFilter` | `[data-render="projects"]` | 制作物カード本体 |

## 分ける時の単位

1. `core`: `philosophy`, `experienceLayers`, `stats`, `process`
2. `library`: 現状はHTML直書き。書籍が増えるなら、表紙・メタ・問い・CTAをこの単位へ移す。
3. `research`: `researchLogs`, `cycleBridge`
4. `visions`: `visions`
5. `projects`: `projectLanes`, `projectLaneOverview`, `projectActionGuide`, `projects`

`projects` は棚の定義とカード本体が一緒に動くため、最初に分割するならこの5項目を同じファイルに残す。カードだけ先に分けると、件数表示・フィルター文・カードの `lane` がずれやすい。

## JSON 化前の注意

- 現在の値は文字列・数値・配列・オブジェクトだけなので、JSONへ移しやすい。
- `href` は外部URL、相対ダウンロード、未設定の3種類が混在する。`actionType` と `download` の整合を保つ。
- 画像ありカードは `image` と `alt`、画像なしカードは `placeholderIcon` と `placeholderText` を使う。
- `cycle`, `entryQuestion`, `tag`, `status`, `why`, `surprise` は任意項目。描画側は未設定でも壊れない前提で扱っている。
- 絵文字は表示上の意味を持つので、JSON化しても UTF-8 のまま保持する。

## 次に小さくやるなら

`content.js` の先頭にデータ群コメントを足すより、`projects` 関連を `window.HAZAKURA_CONTENT.projectsGroup` のような新しい入れ子へ変えるほうが、将来のJSONファイル境界に近い。ただしその時は `renderProjects` と `initProjectLaneFilter` を同時に直す。
