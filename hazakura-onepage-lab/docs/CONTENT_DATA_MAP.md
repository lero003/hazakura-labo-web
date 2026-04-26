# content.js データ地図

`content.js` を将来 JSON 化・分割する前に、データ群と描画側の依存を小さく見える化しておく。

## 現在の流れ

| データ | 描画関数 | HTML の受け口 | 主な表示 |
| --- | --- | --- | --- |
| `philosophy` | `renderPhilosophy` | `[data-render="philosophy"]` | Core Philosophy の3カード |
| `experienceLayers` | `renderExperienceLayers` | `[data-render="experienceLayers"]` | One-page Architecture のレイヤーカード |
| `stats` | `renderStats` | `[data-render="stats"]` | カウントアップ数値 |
| `process` | `renderProcess` | `[data-render="process"]` | 問い、実験、発見、循環のステップ |
| `researchGroup.logs` | `renderResearchGroup` / `renderResearchLogs` | `[data-render="researchLogs"]` | Vision 前の Research Log カード |
| `visionsGroup.entryGuide` | `renderVisions` / `renderVisionEntryGuide` | `[data-render="visions"]` | 将来フォーム化する入力種別ガイド |
| `visionsGroup.items` | `renderVisions` | `[data-render="visions"]` | 構想カード、構造化した入口文、タグ |
| `researchGroup.cycleBridge` | `renderResearchGroup` / `renderCycleBridge` | `[data-render="cycleBridge"]` | Vision 末尾の循環メモ |
| `projectsGroup.lanes` | `renderProjects` / `initProjectLaneFilter` | `[data-render="projects"]` | 棚ガイド、絞り込み、選択時コピー |
| `projectsGroup.overview` | `renderProjects` / `initProjectLaneFilter` | `[data-render="projects"]` | Projects の棚ステータス文 |
| `projectsGroup.actionGuide` | `renderProjects` | `[data-render="projects"]` | 外部リンク / ダウンロードの見分け |
| `projectsGroup.items` | `renderProjects` / `initProjectLaneFilter` | `[data-render="projects"]` | 制作物カード本体 |

## 分ける時の単位

1. `core`: `philosophy`, `experienceLayers`, `stats`, `process`
2. `library`: 現状はHTML直書き。書籍が増えるなら、表紙・メタ・問い・CTAをこの単位へ移す。
3. `research`: `researchGroup.logs`, `researchGroup.cycleBridge`
4. `visions`: `visionsGroup.entryGuide`, `visionsGroup.items`
5. `projects`: `projectsGroup.lanes`, `projectsGroup.overview`, `projectsGroup.actionGuide`, `projectsGroup.items`

`projectsGroup` は棚の定義とカード本体が一緒に動くため、最初に分割するならこの入れ子を同じファイルに残す。カードだけ先に分けると、件数表示・フィルター文・カードの `lane` がずれやすい。

## JSON 化前の注意

- 現在の値は文字列・数値・配列・オブジェクトだけなので、JSONへ移しやすい。
- `href` は外部URL、相対ダウンロード、未設定の3種類が混在する。`actionType` と `download` の整合を保つ。
- 画像ありカードは `image` と `alt`、画像なしカードは `placeholderIcon` と `placeholderText` を使う。
- Vision の入口文は `entry.label` / `entry.prompt` / `entry.kind` に分ける。旧 `entryQuestion` も描画側は読めるが、新規追加は `entry` に寄せる。
- Vision の将来フォーム種別は `visionsGroup.entryGuide.kinds` に置き、カード本体とは分けて扱う。
- `cycle`, `entry`, `tag`, `status`, `why`, `surprise` は任意項目。描画側は未設定でも壊れない前提で扱っている。
- 絵文字は表示上の意味を持つので、JSON化しても UTF-8 のまま保持する。

## 次に小さくやるなら

次に分けるなら、`visionsGroup.entryGuide.kinds` と各 Vision カードの `entry.kind` を対応させ、入力種別ごとの初期カード表示やフォーム下書きへつなげる。
