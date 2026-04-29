# リッチ化ログ

## 2026-04-29

- Focus: Structure / Access
- Changed: `garden-handoff-steps` にラベル下余白のCSS変数を足し、Library→Projects のモバイル橋渡しだけが `li` / `span` を直指定していた重複を削除した。phase gate には、Library と Research の橋が同じ共有classを使い、Library専用の直指定が戻らない保護を追加した。
- Learned: 橋渡しの見た目は同じでも、モバイルだけ個別セレクタが残ると次の間奏や縦線調整で保守境界がぼやける。余白まで共有部品の変数に寄せると、情報を増やさず参道の整え方を次回へ渡しやすい。
- Next: preview可能な環境で、Library→Projects の縦線と Research handoff の縦線をモバイル幅で見比べ、共有変数へさらに寄せられる差分がないか確認する。

## 2026-04-29

- Focus: Structure / Access
- Changed: Library→Projects と Vision→Research Log の橋渡しステップを `garden-handoff-steps` class へ参加させ、線・点・ラベル・本文のCSSを共通セレクタで扱うようにした。Library の「制作棚へ渡す」リンクには focus-visible の輪郭も足し、phase gate で共通classとフォーカス契約を保護した。
- Learned: 変数だけを揃えてもセレクタが別々に残ると、次の橋や間奏を足す時に「どちらを真似るか」で迷いやすい。橋のステップを一つのclass名へ寄せると、見た目を増やさず小径の保守境界がはっきりする。
- Next: preview可能な環境で、Library→Projects のTab移動とモバイル縦線を見て、フォーカスの光が橋の余韻より強く出すぎていないか確認する。

## 2026-04-29

- Focus: Access / Structure
- Changed: 常設ナビとフッター巡回路に、スクロール位置から現在の小径を `aria-current="location"` で同期する処理を足した。モバイル6分割ナビは現在地セルを薄く点灯させ、デスクトップとフッターは既存のhover/focus表現に寄せて、どの棚を巡っているかを見失いにくくした。phase gate でも現在地同期と表示契約を保護した。
- Learned: 研究ログまで巡回路が増えた後は、リンクが揃っていても「今どこを歩いているか」が見えないと、特に狭幅では六つの札が同じ重さに見える。情報を増やさず現在地だけを残すと、1ページ庭園の参道が少し読みやすくなる。
- Next: preview可能な環境で、Hero / Vision / Research Log / Quote付近をモバイル幅でスクロールし、現在地セルの点灯が強すぎず、Quote到達時に余計な場所を指し続けないか確認する。

## 2026-04-29

- Focus: Structure
- Changed: Research Log の直後にある `cycle-bridge` の昼夜テーマを `--cycle-bridge-*` 変数へ寄せた。終盤の橋だけが `::before`、eyebrow、title、text の夜テーマ直指定を持たないよう整理し、phase gate でトークン境界と直指定の不在を保護した。
- Learned: 研究ログから最後の詩へ折り返す橋は、見た目の情報量を増やさなくても、調整場所が散ると終盤の余韻を磨くたびに読み直す範囲が増える。橋単位のローカルトークンへ閉じると、次回の演出や余白調整を小さく戻せる。
- Next: preview可能な環境で、Research Log末尾からcycle bridge、Quote前カードまでをモバイル幅で続けて見て、終盤の橋が強すぎず次の詩へ渡せているか確認する。

## 2026-04-29

- Focus: Structure / Access
- Changed: フッター終端の「はじまりへ戻る」リンクを、ナビと終端巡回路で使っている共有 `--garden-route-focus-*` トークンへ参加させた。個別の `outline` 直指定を削り、終端リンクだけが別のfocus-visible契約を持たないよう phase gate でも保護した。
- Learned: Heroへ戻る小径はスクロール演出では巡回路に参加していても、キーボード到達時の光が別実装だと終端だけ保守の外へ出やすい。見た目を増やさず同じfocus境界へ戻すことで、最後の余韻と実用導線を一緒に保てる。
- Next: preview可能な環境で、フッターの「はじまりへ戻る」と終端巡回路をTab移動し、focus ring の強さと背景の重なりが暗いフッター上で過剰に見えないか確認する。

## 2026-04-29

- Focus: Structure / Access
- Changed: Projects CTA の行き先表示を、Research の論文リンクと同じ `formatExternalDestination` helper に寄せた。ダウンロード導線はファイル名表示のまま残し、外部リンクだけ共通のホスト名整形を使うようにし、phase gate で Projects 側に個別の `new URL(item.href)` 分岐が戻らないよう保護した。
- Learned: 外へ出る小径は見た目が似ているほど、行き先表記の整形が別々に増えると次の導線調整で揺れやすい。小さな helper 境界に戻すだけでも、カードの追加やCTA文言変更時に迷う場所が減る。
- Next: 次は実ブラウザで Projects の外部リンク・DMGダウンロード・準備中ステータスを見比べ、CTAの情報量がカード本文を押していないか確認する。

## 2026-04-29

- Focus: Structure / Access / Motion
- Changed: `scroll-animations.js` の表示対象を単一の `revealTargetSelectors` 契約へまとめ、通常観測・reduced-motion初期表示・途中切り替え時の強制表示が同じ対象を見るようにした。`app-controller.js` 側の古い `setAllCounters()` 呼び出しは `revealAll()` に置き換え、phase gate でも縮小モーション時の表示契約を保護した。
- Learned: カードや間奏が増えた後は、スクロール表示対象の直書きが複数箇所へ散るだけで、縮小モーションや後続のセクション追加時に「見えないまま残る」弱さになる。演出を増やさなくても、表示契約をひとつに戻すことで庭の導線は壊れにくくなる。
- Next: 実ブラウザで reduced motion を切り替えられる環境がある時に、途中スクロール位置から未到達の Projects / Vision / Quote 前カードがすべて表示されるか確認する。

## 2026-04-29

- Focus: Structure / Access
- Changed: Vision入口ガイドの各種別を、JS初期化時に `role="button"` と `aria-pressed` を持つ選択コントロールとして扱うようにした。固定選択後に別種別を一時プレビューして離れた時は、固定中の入口へ表示が戻るようにし、受付メモの `summary` 操作は入口選択として誤発火しないよう境界を分けた。
- Learned: Visionの入口ガイドは見た目の光だけでなく、選んだ状態がDOMにも残り、寄り道から戻れることで「預け口を選ぶ」所作として安定する。情報を増やさない小さなAccess整理でも、構想セクションの遊びを実用に寄せられる。
- Next: 実ブラウザでVision入口ガイドをキーボード操作し、受付メモ開閉と入口選択のフォーカス移動が混ざって見えないか確認する。

## 2026-04-29

- Focus: Structure / Access
- Changed: ページ内リンクのスムーススクロール後に `history.pushState` で現在のアンカーをURLへ残すようにした。Phase gateにも、常設ナビ、Quote前ステップ、Projects内の戻り道が「住所を持つ小径」として保たれる検査を追加した。
- Learned: 1ページ庭園の導線は、到着演出だけでなくURLへ現在地が残ることで、戻る・共有する・再訪問する時の体験が弱くなりにくい。見た目を増やさない構造改善でも、参道の完成度には効く。
- Next: preview可能な環境で、Quote前の4ステップとProjects内Research Log戻りリンクを実クリックし、到着光・URLハッシュ・戻る操作の感触をまとめて確認する。

## 2026-04-29

- Focus: Structure
- Changed: Library→Projects と Vision→Research Log の橋渡しステップCSSを、線・点・ラベル・本文の共通 `--handoff-step-*` 契約へ寄せた。各橋は色、余白、モバイル縦線だけを親側の変数で差し替え、既存の見た目と導線は維持した。
- Learned: セクション間の間奏は増えるほど体験上の役割が似てくるため、個別セレクタに同じ線と点の指定を持たせ続けると、次の演出調整で片方だけ古くなる。ステップ表現を共通化すると、遊び心のある橋を保ったまま保守面積を小さくできる。
- Next: 次回は実ブラウザで Library→Projects と Vision→Research Log のモバイル縦線を見比べ、共通化後も余韻の強さがそれぞれのセクションに合っているか確認する。

## 2026-04-29

- Focus: Structure / Access
- Changed: ページ内リンクのスムーススクロールを、初期描画済みリンクへの直接 listener 登録から document への委譲型クリック受け口へ整理した。Quote 前ステップ、Projects から Research Log への戻り道、常設ナビ、フッター帰還の到着演出はそのまま維持し、再初期化時は古い受け口を外して二重登録しない形にした。phase gate でも直接バインドへ戻らないよう保護した。
- Learned: 1ページの小径が増えるほど、リンクごとの listener 登録は見た目に出ない弱さになる。委譲型にしておくと、今後 Quote / Projects / Research の描画境界を触っても、導線演出の受け口を再登録し忘れにくい。
- Next: preview 可能な環境で、ナビ、Quote 前の4ステップ、Projectsカード内の Research Log 戻りリンクを1回ずつ触り、到着光とフォーカス位置が従来通りに見えるか確認する。

## 2026-04-29

- Focus: Structure / Access
- Changed: 常設ナビのリンク色、hover色、下線色、モバイル6分割ナビの背景・境界・hover背景を `--garden-nav-*` トークンへ寄せた。夜テーマと未スクロールHero上の色も同じ変数境界で受ける形にし、phase gate で `body.theme-night .nav-links a` の直指定へ戻らないよう保護した。
- Learned: Research Log まで巡回路が増えた後は、見た目の小さな色差分でも昼夜・Hero・モバイルで指定場所が散ると、導線演出の次の調整が重くなる。ナビ単位の色契約に閉じると、情報を増やさずに参道の保守面積を小さくできる。
- Next: ポート起動が許可される環境で、640px以下の昼夜ナビを実表示し、未スクロールHero上とスクロール後で文字色・hover背景が同じ意図に見えるか確認する。

## 2026-04-29

- Focus: Structure / Access
- Changed: 巡回路リンクの focus-visible 用トークンを `:root` と夜テーマの共有境界へ寄せ、ナビとフッターで重複していた outline / shadow 指定を整理した。モバイル6分割ナビだけ `--garden-route-focus-offset` を小さくし、狭幅でもフォーカスの小径がセルからはみ出しにくい形へした。
- Learned: Research Log まで常設巡回路へ入った後は、見た目の導線だけでなく、キーボードで辿る時のフォーカス契約が散ると次の小調整で崩れやすい。共通トークンと狭幅の差分だけにすると、情報を増やさず導線の保守面積を減らせる。
- Next: ブラウザ起動が許可される環境で、360px前後の6分割ナビをTab移動し、focus ring の強さとセル内の収まりを実表示で確認する。

## 2026-04-29

- Focus: Access / Structure
- Changed: 常設ナビとフッター巡回路へ aria-label を付け、ナビ・フッターのリンクに共有の focus-visible 表現を足した。phase gate でも、巡回路の意味づけとフォーカス表示が消えないよう保護した。
- Learned: 6分割ナビは見た目のタップ面積だけでなく、キーボードで辿った時の「今いる小径」が見えないと参道として弱くなる。ホバー演出と同じ境界へフォーカスを参加させると、情報を増やさず導線の完成度を上げられる。
- Next: GUI権限のある環境で、375px前後のモバイル表示を実ブラウザで開き、フォーカスリングが強すぎずナビセルからはみ出して見えないか確認する。

## 2026-04-29

- Focus: Structure / Access
- Changed: 常設ナビとフッターに二重で直書きしていた巡回路を `src/data/site-navigation.js` へ切り出し、`src/pages/index.astro` は同じ配列から上部ナビと終端ナビを描画する形へ寄せた。phase gate にも、巡回路がデータ境界から外れない検査を追加した。
- Learned: Research Log への入口を増やした直後は、表示そのものよりも「次にアンカーを触る場所」が散っていることが弱点になる。巡回路を小さなデータに束ねると、1ページの参道を保ったまま次の導線調整で片側だけ忘れるリスクを減らせる。
- Next: モバイル6分割ナビの見た目を実ブラウザで確認できる環境で、文字間とタップ面積が窮屈すぎないか1スクロールだけ見る。

## 2026-04-29

- Focus: Structure / Access
- Changed: head内に直書きしていたタイトル、説明、OGP/Twitter画像、favicon、Hero画像altを `src/data/site-meta.js` へ寄せ、canonical / og:url / og:image / twitter:image を Cloudflare Pages の絶対URLで出力するようにした。phase gate にも相対OGPへ戻らない検査を追加した。
- Learned: 庭の中の導線が整っても、外部共有や検索結果から入る最初の札が相対パス任せだと、入口の完成度が弱く見える。metaを小さなデータ境界へ置くと、今後のOGP画像差し替えやサイト説明の調整もページ構造を掘らずに済む。
- Next: 実ブラウザまたは公開後のカードプレビューで、SNSカードが `hero.png` を拾えているか確認し、必要なら専用OGP画像の比率だけを次回小さく整える。

## 2026-04-29

- Focus: Access / Motion / Structure
- Changed: 常設ナビとフッターの巡回路へ Research Log への `#research-log-strip` 導線を足し、ナビ・フッターから入った時も研究ログの handoff が短く光る `is-research-route-arrival` を追加した。モバイルナビは6項目グリッドへ更新し、phase gate で研究ログ導線と到着演出の契約を保護した。
- Learned: Research Log はQuote前やProjectsカードから戻れるようになっていても、常設の巡回路に名前がないと、活動母艦の核である「問い・実験・発見」が少し隠れて見える。情報を増やさず、既存ランドマークへ入口を通すだけで、1ページの庭を巡る順路が読みやすくなる。
- Next: ブラウザ確認が可能な環境で、360px前後の6分割ナビが窮屈すぎないか、研究ログ到着光が夜テーマで強すぎないかを1スクロールだけ見る。

## 2026-04-29

- Focus: Structure / Access
- Changed: Projectsカード内の `Why` と `Note` を同じ `project-note` chrome へ参加させ、余白、ラベル、昼夜テーマ差分を `--project-note-*` 変数へまとめた。`project-action-note` のrenderer markupも共通クラスを持つ形にし、phase gate で注釈UIが分岐し直さないよう保護した。
- Learned: 制作カードの小さな補足札は、見た目が近いままCSSだけ分かれると、次の文言整理やモバイル調整で片方だけ歩幅がずれやすい。注釈として同じ骨格へ寄せると、情報を増やさずにProjectsの読み筋を保守しやすくなる。
- Next: Projects の trail / action / return / note が十分に整理されたので、次は Quote 前 route marker のモバイル実表示か、OGP画像の相対パス点検を小さく見る。

## 2026-04-29

- Focus: Access / Visual / Structure
- Changed: Quote 前の折り返しステップを、ラベルと本文を分けた小さな route marker 構造へ整理し、既存のCSS counterを `01` から `04` の巡回札として見える化した。昼夜テーマの marker 色は `--quote-prelude-step-marker-*` 変数へ閉じ、phase gate で compact route marker 構造を保護した。
- Learned: 折り返し先が Library / Projects / Research / Vision の4つに増えると、単なるカード列では終盤の参道として少し平板に見える。情報を増やさず、番号札と本文境界だけを足すと、最後の詩へ向かう前の「巡る順番」が拾いやすい。
- Next: preview が許可される環境で、Quote 前ステップの番号札と縦レールがモバイル幅で強すぎないか1スクロールだけ見る。

## 2026-04-29

- Focus: Access / Motion / Structure
- Changed: Research Log の描画領域を名前付きの小さなランドマークにし、Quote 前の折り返し導線から `#research-log-strip` へ戻れるようにした。到着時は既存の研究ログ光を handoff にも受け渡し、phase gate でアンカーと非表示見出しの契約を保護した。
- Learned: Research Log は内容が育っていても、ページ構造上の入口が弱いと Vision の中に沈んで見える。新しいカードを増やさず、既存の折り返し導線に「記録をひらく」を混ぜるだけで、問い -> 実験 -> 発見の循環が拾いやすくなる。
- Next: preview 可能な環境で、Quote 前の4分割ステップがモバイル幅で詰まりすぎないか、1スクロールだけ実表示で見る。

## 2026-04-29

- Focus: Structure / Access
- Changed: Projectsカード内のResearch Log戻りリンクを、直指定の昼夜テーマから `--project-return-*` のローカルCSS変数へ寄せた。hover / focus / ラベル色も同じ境界で扱い、phase gate で夜テーマの子セレクタ上書きへ戻らないよう保護した。
- Learned: スムーススクロールや到着光が整っても、リンク本体の見た目契約が散ると次の小径調整で昼夜差分とキーボード状態を追い直すことになる。戻り道をリンク単位の変数にまとめると、体験を変えずに導線の保守面積を減らせる。
- Next: Projectsカード内の `project-why` / `project-action-note` も、同じ注釈系UIとして昼夜テーマが直指定に散っていないか1テーマだけ点検する。

## 2026-04-28

- Focus: Access / Motion / Structure
- Changed: Projectsカード内のResearch Log戻りリンクを、通常ジャンプから `smooth-scroll.js` の測定済みスクロールへ参加させた。対応するResearch Logカードには `is-research-return-arrival` の短い到着光を足し、キーボード操作でも戻りリンクのフォーカス位置が見えるようにした。
- Learned: LibraryやQuoteの大きな折り返し導線が整っていても、カード内の小さな戻り道だけがブラウザ標準ジャンプだと、問いがログへ巡る感触がそこで途切れる。既存のスクロール境界に乗せるだけで、情報を増やさず循環の所作を揃えられる。
- Next: sandbox外でpreview可能な時に、ProjectsカードからResearch Log 004-006へ戻る距離と到着光がモバイル幅で強すぎないか1件ずつ見る。

## 2026-04-28

- Focus: Structure / Access
- Changed: モバイル終盤の Projects / Research / Vision / Quote に散っていた `overflow-wrap: anywhere` を、共有の long-copy guard セレクタへ集約した。
- Learned: 狭幅で長い問いや補足文を守る指定が各カードに散ると、次の導線調整で「どこが崩れ止めなのか」が見えにくくなる。庭全体の小径に対するガードとして置くと、見た目を変えずにモバイルの読み筋を保守しやすい。
- Next: モバイル終盤のカード角丸・余白にも同じ値が散っているため、見た目を変えずに共通化できる範囲を1テーマだけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: Research / Projects / Vision の折りたたみ導線で使う `--garden-drawer-*` の既定値を、Research専用ブロックから共有ドロワーセレクタへ移した。
- Learned: 同じUIの既定トークンを共有入口へ置くと、次に祠的な小径や補足メモを足す時も、見た目を変えずに責務を追いやすい。
- Next: `site.css` の大型テーマブロックをもう1箇所だけ選び、夜テーマの直接指定を共通トークンへ寄せられるか点検する。

## 2026-04-28

- Focus: Structure
- Changed: `scripts/phase-gate.mjs` に、`src/data/script-load-order.js` のmanifest、`src/scripts/*.js` の実体、`src/pages/*.js.ts` の互換配信ルートが一対一で揃っているかを確認する検査を追加した。
- Learned: 演出scriptが細かく分かれた今は、見た目を増やすよりも「追加した小径が配信されない」「消したscriptのルートだけ残る」状態を早く検出できるほうが、次の遊びを安心して足せる。
- Next: preview可能な環境で、ProjectsフィルターとQuote折り返し導線をモバイル幅で触り、script境界の保護が実体験の崩れ検出にも十分か確認する。

## 2026-04-28

- Focus: Structure / Access / Motion
- Changed: 通常アンカー、ゾーンナビ、Vision入口カードへの寄せを `src/scripts/scroll-target.js` の共有境界へ集めた。`scroll-offset` の測定値と reduced-motion 判断を各導線で同じ扱いにし、Vision入口フォーカスは controller から受け取る motion 状態でスクロールするようにした。
- Learned: セクション間の小径が増えるほど、同じ「どこへ寄せるか」の計算がscriptごとに散ると到着演出の調整範囲が広がる。スクロール先だけを共有すると、見た目を変えずに次の間奏や導線演出を足しやすくなる。
- Next: preview 可能な環境で、ゾーンナビ、書庫CTA、Vision入口ガイドをモバイル幅で1回ずつ触り、到着位置の歩幅が揃っているか確認する。

## 2026-04-28

- Focus: Structure
- Changed: Quote 前の折り返しカードに散っていた昼夜テーマ、ステップレール、hover / focus 色を `--quote-prelude-*` のローカルCSS変数へまとめた。モバイルの縦レールも同じ変数境界へ寄せ、phase gate で夜テーマが子セレクタ直指定へ戻らないよう保護した。
- Learned: 最後の詩へ入る前の折り返しは、Library / Projects / Vision を畳む重要な余韻なので、小さな色調整でも読み筋が散ると次の演出が迷いやすい。カード単位のトークンに寄せると、終盤の遊びを足す余白だけ残せる。
- Next: Quote 本体と footer close の暗転の歩幅が、モバイルで急に閉じて見えないか、次回 preview 可能な環境で1スクロールだけ点検する。

## 2026-04-28

- Focus: Access / Motion / Structure
- Changed: 常設ロゴの `#hero` 帰還を、フッターの「はじまりへ戻る」と同じ測定済みスムーススクロールへ参加させた。Hero到着演出は `is-garden-return-arrival` として共通化し、`smooth-scroll.js` の到着演出分岐を `arrivalRules` の小さな対応表へ整理した。
- Learned: 終端導線だけが庭らしく戻れても、常設ロゴが急にジャンプするとページ全体の循環感が少し欠ける。戻り方を同じ所作へ揃えると、情報を増やさずに1ページを巡る導線が自然になる。
- Next: ナビ内の各アンカーも、到着先ごとの受け取り演出が必要か、過剰にならない範囲で1導線だけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: `src/pages/index.astro` に残っていた Library の書籍棚と Library -> Projects bridge のAstro markupを `src/components/LibrarySection.astro` へ切り出した。書籍データと橋データの参照はコンポーネント側へ閉じ、phase gate でページ本体がLibraryの細部を持ち直さないことも保護した。
- Learned: 書庫の文脈と橋の演出は一体で育つため、ページ本体に残ると次の文言・余白調整で読む範囲が広がる。見た目を変えずにセクション単位へ分けるだけでも、1ページの骨格と書庫の庭仕事を分けて考えやすくなる。
- Next: `src/pages/index.astro` に残る Hero / Footer などの静的塊も、次回以降に「分けるほど軽くなるか」を1ブロックだけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: Vision の `data-entry-kind` アクセント色指定を、guide / question / badge / card に散った4列セレクタから `:is(...)` の共有セレクタへ集約した。昼夜それぞれの種別色は同じ場所で読む形にし、phase gate で旧セレクタ列へ戻らない保護を追加した。
- Learned: Vision の預け口は演出が複数パーツへ渡るため、色の契約がセレクタ列で散ると次の入口種別追加時に見落としやすい。見た目を変えずに accent map を一段共有すると、構想の入口を育てる時のCSS面積が小さくなる。
- Next: `src/pages/index.astro` に残る Library bridge のAstro直書き部分が、将来の間奏差し替えに十分軽いか、見た目を変えずに1ブロックだけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: `content-renderers.js` に残っていた Philosophy / Layers / Process の静的DOM生成を `section-foundation-renderer.js` へ切り出し、司令塔側は各専用rendererを呼ぶだけの形へ寄せた。互換配信ルート、script load order、phase gate も追加して、基礎セクションの描画境界が戻らないようにした。
- Learned: Projects / Vision / Research を専用rendererへ分けても、基礎セクションのDOM文字列が司令塔に残ると「どこで何を描くか」の読み筋がまだ混ざる。静的セクションも小さく分けると、次の演出追加時に司令塔を汚さず済む。
- Next: `src/pages/index.astro` に残る Library bridge のAstro直書き部分が、将来の間奏差し替えに十分軽いか、見た目を変えずに1ブロックだけ点検する。

## 2026-04-28

- Focus: Narrative / Visual / Structure
- Changed: Library 冒頭コピーと Library -> Projects bridge を「販売棚」ではなく「問いの結晶」から次の実験へ渡す文脈へ寄せた。書籍の価格行は `読書入口` の小さなメモとして扱い、価格だけが強く見えないように `--book-access-*` 変数で昼夜テーマを整理した。
- Learned: Kindleリンクや価格は必要でも、視覚的に価格が一番強いと書庫の空気が売り場へ寄る。読書入口として控えめに束ねると、書籍を制作循環の起点として読みやすい。
- Next: Library のハイライト4項目が、内容紹介として重すぎず「問いの断片」として読めるか、1冊分だけ文言と余白を点検する。

## 2026-04-28

- Focus: Access / Structure
- Changed: Vision 入口ガイドの受付メモ drawer で、summary の文字サイズと件数カウント表示を `--garden-drawer-summary-font-size` / `--vision-entry-drawer-note-*` 変数へ寄せた。狭幅の調整も drawer 本体の変数だけで扱い、直書きの summary 上書きを削った。
- Learned: 受付メモは小さな補助UIでも、件数と開閉記号が狭幅で詰まるとフォーム仕様の確認に見えやすい。summary とカウントを変数化すると、Vision の入口だけを軽くしながら drawer 共通骨格を崩さずに済む。
- Next: Vision カード内の受付メモチップが、入口ガイド側の drawer と重なって情報過多に見えないか、カード1件だけモバイル幅で点検する。

## 2026-04-28

- Focus: Structure
- Changed: Research / Projects の drawer モバイル調整に残っていた summary の整列と sigil のサイズ・余白直指定を、`--garden-drawer-summary-align` / `--garden-drawer-sigil-margin-top` などの共通変数へ寄せた。見た目は保ったまま、phase gate で drawer の共有chrome契約も更新した。
- Learned: 共通drawer骨格を作っても、狭幅だけ直指定が残ると次回のモバイル調整で読む場所が散る。小さな位置調整も `--garden-drawer-*` に乗せると、Research / Projects の小径を同じ庭具として扱いやすい。
- Next: Vision の field drawer 側も、モバイル幅で summary 内の補足テキストが詰まりすぎていないか実表示で1件だけ見る。

## 2026-04-28

- Focus: Access / Visual / Structure
- Changed: Research / Projects / Vision の共有 details drawer に `summary:focus-visible` のフォーカスリングと背景を足し、Research / Projects 側の開閉トグルを右端へ揃える `--garden-drawer-toggle-margin-left` を追加した。Vision の受付メモは既存の件数表示を保つため、同じ変数で個別に0へ戻した。
- Learned: drawer骨格を共通化しても、キーボードで辿った時の着地点とトグル位置が弱いと「小径をひらく」所作が見た目だけに寄る。共有変数で触り口を整えると、情報を足さずに遊びの入口を実用にも寄せられる。
- Next: 実ブラウザ確認が可能な環境で、モバイル幅の drawer フォーカスリングが強すぎないか、Research / Projects / Vision を1件ずつ見る。

## 2026-04-28

- Focus: Structure
- Changed: Research / Projects の drawer モバイル調整を、個別の `summary` / `sigil` 指定から garden drawer 共通変数へ寄せた。Vision も含む共通drawer骨格の意図がわかる短いコメントを足し、開閉UIの小径を次回以降まとめて調整しやすくした。
- Learned: drawer本体を共通化しても、モバイル幅だけ個別指定が残ると次の調整で見落としやすい。サイズ差は `--garden-drawer-*` へ逃がし、所作だけ共有すると見た目を保ったまま保守範囲を狭められる。
- Next: drawer内のチップやtrail類が、狭い幅で情報の重さを増やしていないか、Research / Vision どちらか1ブロックだけ実表示で点検する。

## 2026-04-28

- Focus: Structure
- Changed: Vision 入口ガイドの `vision-entry-guide__field-drawer` を、Research / Projects と同じ garden drawer の共通CSS骨格へ参加させた。受付メモの小ささは `--garden-drawer-*` 変数で維持し、専用の summary / toggle / open ルールを削って phase gate の保護対象も三者共有へ広げた。
- Learned: 同じ「小径をひらく」所作がセクションごとに別実装だと、見た目が近くても次の演出調整で追う範囲が増える。Vision の受付メモも共通骨格に乗せると、構想の入口を重くせずに開閉UIだけまとめて磨ける。
- Next: drawer 本体は揃ったので、次は Vision カード内の `vision-entry-question__fields` とガイド側の受付メモが、モバイル幅で二重に重く見えないか1ブロックだけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: Research Log の補足drawerと Projects の cycle drawer に重複していたsummary、開閉トグル、sigil、label/hintのCSS骨格を `--garden-drawer-*` 変数と共有 `:is(.research-extra-drawer, .project-cycle-drawer)` ルールへまとめた。夜テーマの子セレクタ上書きも、drawer単位の変数差し替えへ寄せ、phase gate で共有契約を保護した。
- Learned: 「小径をひらく」UIはセクションごとに色が違っても、触り方と開閉の所作は同じ庭具として読ませたほうが保守しやすい。共通骨格に寄せると、次回のdrawer演出調整がResearchとProjectsで二重化しにくい。
- Next: Vision の受付メモdrawerも同じ garden drawer 骨格へ寄せられるか、見た目を変えずに1ブロックだけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: Hero CTA と書庫CTAに重複していた前面レイヤー、グラデーションオーバーレイ、矢印モーションを `src/styles/site.css` の shared action link へ集約した。橋渡しリンクの中身を前面に出す指定も同じ境界へ寄せた。
- Learned: 小さな導線の演出ほど、CTAごとに同じ指定が散ると次の調整で差分が迷子になる。見た目を足さずに共通境界を作るだけでも、書庫から制作棚へ渡す導線を崩さず磨きやすくなる。
- Next: CTA系の hover / focus-visible の扱いを、モバイルとキーボード操作で同じ意図に見えるか1ブロックだけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: `src/pages/*.js.ts` と `style.css.ts` に散っていた互換配信の `new Response` / `Content-Type` 生成を、`src/route-responses.ts` の `javascriptResponse` / `stylesheetResponse` へ集約した。phase gate で各配信ルートが共通helperを使い、ローカルResponse生成へ戻らないことも保護した。
- Learned: 演出scriptの粒度が細かくなるほど、ページ本体ではなく配信ルートのコピーが次の追加の迷いになる。見た目を変えない薄いhelperでも、script islandを増やす時の安全な差し込み口が読みやすくなる。
- Next: `src/pages/index.astro` のLibrary周辺に残る表示用class組み立てが、次の書籍追加時にも十分軽いか、見た目を変えずに1ブロックだけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: 36本に増えた script load order を、`content-data` / `content-renderers` / `navigation-scroll` / `interaction-foundation` / `garden-effects` / `bootstrap` の責務グループへ整理した。生成される読み込み順は変えず、phase gate でグループ説明、重複なし、`app-controller.js` が最後に起動する契約を保護した。
- Learned: 演出scriptが増えるほど、順番だけの配列では「どの庭仕事の層へ入れるべきか」が見えにくくなる。配信順をグループ化すると、次にスクロール間奏やCanvas演出を足す時も、起動順を崩さず差し込み場所を選びやすい。
- Next: `src/pages/*.js.ts` の互換配信ルートに同じResponse生成が散っているため、見た目を変えない範囲で小さなroute helperへ寄せられるか点検する。

## 2026-04-28

- Focus: Structure
- Changed: DOM文字列を生成する各レンダラーに重複していたHTMLエスケープ処理と外部リンク表示名の整形を、`src/scripts/dom-helpers.js` へ集約した。Astro配信ルートと script load order を追加し、phase gate で共通ヘルパーがレンダラーより先に読み込まれること、重複した `escapeHtml` が戻らないことを保護した。
- Learned: Projects / Vision / Research / Quote の描画は見た目の責務が分かれていても、DOM文字列の安全処理は同じ土台を共有している。ここが散ると、次にカードや間奏を足す時に安全処理の差分を追う範囲が無駄に広がる。
- Next: `project-renderer.js` の action / trail / cycle の小関数が、次のProjects改善時に読みやすい順序になっているか、見た目を変えずに1ブロックだけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: Vision の入口ガイドとカード内の受付メモで散っていた夜テーマ上書きを、`--vision-entry-*` / `--vision-question-*` のローカルCSS変数へ寄せた。Phase gate に、入口ガイド・受付メモの夜テーマが子セレクタ直指定へ戻らない保護も追加した。
- Learned: Vision の入口はガイド、受付メモ、カード内質問が同じ「預け口」として連動するため、色や背景を子要素ごとに上書きすると次の演出調整で追う範囲が広がる。入口単位の変数に寄せると、見た目を変えずに小さな遊びを足す余地が残る。
- Next: Vision の `entry-kind` 別アクセント背景と hover / active 背景も、必要なら同じ変数境界へ一段だけ寄せられるか点検する。

## 2026-04-28

- Focus: Structure
- Changed: Vision の入口ガイドと構想カード内で重複していたフィールドチップCSSを共通の `--entry-field-*` 変数へ寄せ、Projects のプレースホルダー背景定義の重複を1箇所に整理した。
- Learned: 入力種別ガイドはカード側の質問フィールドと同じ「小さな預け口」なので、見た目を変えずにCSS契約だけ揃えると、次にフォーム下書きや種類追加を試す時の変更範囲が狭くなる。
- Next: Vision の夜テーマ側に残る entry guide / entry question の上書きを1ブロックだけ点検し、昼テーマと同じ変数境界へ寄せられるか確認する。

## 2026-04-28

- Focus: Access / Structure
- Changed: Research Log の由来表示、知恵断片、論文メモを `research-extra-drawer` にまとめ、本文の「問い・実験・発見」は常時見せたまま、補足だけを必要な時に開く小径へ畳んだ。夜テーマとモバイル幅の余白も追加し、phase gate で補足drawer契約を保護した。
- Learned: Research Log は循環の厚みを出すほど、カードによって二次情報の重さがばらつく。補足を同じdrawerへ寄せると、ログの核は軽く読み進められ、深掘りしたいカードだけ開ける。
- Next: 実ブラウザで Research Log 004-006 をモバイル幅で開閉し、drawerのラベルが抽象的すぎないか、また開いた後の論文リンクが詰まりすぎないか確認する。

## 2026-04-28

- Focus: Structure
- Changed: Research Log の handoff、ログカード、cycle bridge 生成を `src/scripts/research-renderer.js` へ切り出し、`content-renderers.js` は Research 専用レンダラーへ委譲するだけにした。Astro配信ルートと script load order を追加し、phase gate で Research markup が司令塔へ戻らないことも保護した。
- Learned: Vision から Research Log へ戻る導線は、入口・ログ・最後の循環メモが一塊で育つため、汎用レンダラーに残すと次回の余白や文脈調整で読む範囲が広がる。専用境界に寄せると、研究ログの「問いへ戻す」体験だけを小さく磨きやすくなる。
- Next: Research Log カード内の paper sample / wisdom trail / source 表示が、モバイル幅で一度に重く見えないか、表示順か折り畳み候補だけを点検する。

## 2026-04-28

- Focus: Motion / Access / Structure
- Changed: フッターの `はじまりへ戻る` を通常ジャンプから測定済みスムーススクロールへ接続し、Hero到着時に短い帰還光とアクセント行の受け取りを出すようにした。Phase gate でフッター帰還導線と到着演出の契約も保護した。
- Learned: 最後の小径は見た目だけ庭らしくても、クリック後に急に先頭へ飛ぶと読後の余韻が切れる。既存のsmooth-scroll境界へ入れるだけで、情報を増やさず循環の体験を閉じられる。
- Next: preview可能な環境で、FooterからHeroへ戻るスクロール距離とHero到着光がモバイル幅で強すぎないか確認する。

## 2026-04-28

- Focus: Structure
- Changed: Research Log への橋渡しCSSを `--research-handoff-*` トークンへ寄せ、夜テーマの疑似要素・テキスト色上書きをコンポーネント変数だけで扱うようにした。Phase gate に直指定へ戻らない保護も追加した。
- Learned: Library / Projects の橋渡しだけでなく Vision 内の Research 導線も同じトークン境界へ揃えると、次の間奏演出を足す時に夜テーマ差分を追いやすくなる。
- Next: Quote prelude と Research handoff のレール表現に共通化できる最小の設計トークンがあるか、見た目を変えずにもう一段だけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: Vision の入口ガイド、入口バッジ、構想カード生成を `src/scripts/vision-renderer.js` へ切り出し、`content-renderers.js` は Vision 専用レンダラーへ委譲するだけにした。Astro配信ルートと script load order を追加し、phase gate で Vision markup が司令塔へ戻らないことも保護した。
- Learned: 構想セクションは入口ガイド、カード、フォーカス演出が絡むため、汎用レンダラーに残すと次回の導線調整で読む範囲が広がる。見た目を変えない分割でも、預ける入口まわりを触る足場がかなり軽くなる。
- Next: Research Log 側の handoff と log card 生成も、次に構想からログへの導線を触る前に専用レンダラー化するか点検する。

## 2026-04-28

- Focus: Structure
- Changed: Library の2冊分の書籍カードを `src/data/library-books.js` へ切り出し、`index.astro` は同じ見た目のまま `libraryBooks.map` で描画する形にした。phase gate で書籍データ、表紙asset、CTA、`.book-3d` の複数冊描画契約を保護した。
- Learned: 書庫は演出が育っていても、本文・表紙・価格・CTAがページ本体に残ると次の本追加や文脈調整で触る範囲が広がる。データ境界へ寄せると、書庫を「販売棚」ではなく「問いの結晶」として磨く入口が細くなる。
- Next: Library 見出しと各本の短い説明が、販売情報より「どんな問いの結晶か」を先に読ませているか、文言だけで1冊ずつ点検する。

## 2026-04-28

- Focus: Structure
- Changed: Projects 入口の `project-threshold` に散っていた昼/夜テーマの色、霧、しるし、レール、終端ノードをローカルCSS変数へまとめた。夜テーマは親セレクタの変数差し替えだけにし、phase gate でこのトークン化契約を保護した。
- Learned: Library から Projects へ渡る間奏は演出としては小さくても、昼夜の上書きが子要素に散ると次の調整で読み筋が増える。入口単位の変数へ寄せると、導線の光だけを迷わず磨ける。
- Next: Research Log handoff と Vision entry guide も、昼夜テーマの直指定が増えすぎていないか1ブロックだけ点検する。

## 2026-04-28

- Focus: Structure
- Changed: `site.css` の Library -> Projects bridge で散っていた昼/夜テーマの色、線、光、CTA状態を `.library-projects-bridge` 内のCSS変数へまとめ、夜テーマは親の変数差し替えだけで成立する形にした。モバイルの縦レールも専用変数で保護し、phase gate にトークン化契約を追加した。
- Learned: 橋のような間奏UIは、演出が小さくても色と状態の上書きが増えやすい。コンポーネント内トークンにまとめると、次回の余白・光・テーマ調整で読む範囲が狭くなる。
- Next: Library の書籍HTML直書き部分を、見た目を変えずに `src/data/` へ寄せられる境界だけ点検する。

## 2026-04-28

- Focus: Motion / Structure
- Changed: 書庫の本3D tilt が最初の1冊だけを対象にしていたため、`book-tilt.js` を `.book-3d` 全体へ広げ、各本の glare を本ごとに扱う形へ整理した。phase gate で複数冊対応の契約も保護した。
- Learned: 書庫に新しい本を増やしても、触り味のscriptが単数DOM前提のままだと「本を手に取る」演出が片側だけで止まる。対象を複数化しておくと、今後の書籍追加にも同じ空気を渡しやすい。
- Next: 書籍データ自体も `src/data/` 側へ寄せられるか、小さな境界だけを次回以降に検討する。

## 2026-04-28

- Focus: Structure
- Changed: `content-renderers.js` に残っていた Projects のカード生成を `project-renderer.js` へ分け、`project-filter.js` と並ぶ Projects 専用の描画境界にした。読み込み順、Astro配信ルート、phase gate も新しい境界を守るように更新した。
- Learned: Projects は trail / cycle / action / filter の契約が多く、汎用レンダラー内に残すと次の棚改善で読む範囲が広がりすぎる。見た目を変えずに描画単位を分けるだけでも、実験棚を触る時の迷いが減る。
- Next: Vision 側も同じように入口ガイド、カード、entry handoff の描画が一塊になっているため、次に構想セクションを触る前に境界コメントか小分割を検討する。

## 2026-04-28

- Focus: Structure / Access
- Changed: Library の末尾から数値カウンターを削り、書庫の本から Library → Projects の橋へ直接つながる流れに整理した。未使用になった `stats` データ、描画関数、カウンター演出、CSS、phase gate 契約も削除した。
- Learned: 書庫から実験棚へ渡す場面では、ページ数や冊数の実績表示よりも「問いをどう次へ戻すか」の導線を残したほうが、1ページの参道が途切れにくい。
- Next: Projects のカード本文がさらに重く見える場合は、タグや trail の密度をカード内で一段だけ畳む。

## 2026-04-28

- Focus: Motion / Access / Structure
- Changed: Quote 前の折り返しリンクを通常アンカーから測定済みスムーススクロールへ接続し、Library / Projects / Vision へ戻った時に `is-quote-return-arrival` の淡い着地光が一拍だけ出るようにした。phase gate でこの終盤導線も保護した。
- Learned: 最後の詩へ向かう前の折り返しは、リンク先へ飛べるだけだと「戻る理由」はあっても「戻ってきた感触」が薄い。新しい説明を足さず、到着先の見出しが受け取るだけで循環の手触りが増える。
- Next: Footer の `はじまりへ戻る` も、通常アンカーの急なジャンプで読後の余韻を切っていないか次回だけ点検する。

## 2026-04-28

- Focus: Motion / Structure
- Changed: 書庫から制作棚へ渡すCTAを押した時、Projects 到着時にしるし・レール・棚操作が短く反応する `is-handoff-arrival` 演出を追加し、phase gate で保護した。
- Learned: セクション間の橋は文言だけでなく、到着先が一拍だけ受け取ると「問いが渡った」感覚が増える。
- Next: Projects の棚フィルターを選んだ後、最初のカードまでの視線誘導が強すぎないかモバイル幅で点検する。

## 2026-04-28

- Focus: Access / Motion / Structure
- Changed: Vision 入口ガイドで選んだ預け方が、対応する構想カードへ届かず画面外に残りやすい弱さを直した。クリック/Enter/Spaceで固定した時だけ、測定済みのスクロールオフセットを使って該当カードへ寄せ、短い `visionEntryNudge` の光で着地点を示すようにした。phase gate にこの導線契約も追加した。
- Learned: 入口ガイドのスポットライトは対応関係を見せるが、モバイルでは「選んだ先へ歩ける」動きがないと導線が途中で止まる。情報を増やさず、既存の `data-entry-kind` とスクロール補正を使うだけで、構想セクションの入口感が強まる。
- Next: preview 可能な環境で、Vision ガイドからカードへ寄るスクロール距離と、短い光の反応がモバイルで強すぎないか確認する。

## 2026-04-28

- Focus: Access / Visual / Structure
- Changed: 480px以下で Library 末尾の `library-projects-bridge` の三段ステップが潰れて見えやすい弱さを直した。ステップの余白、最小高、本文サイズを戻し、縦の小径と点がラベルに重ならない歩幅へ整理した。あわせて phase gate に小幅モバイルの橋ステップ余白を保護するチェックを追加した。
- Learned: 橋渡し演出はデスクトップで整っていても、最後の小幅上書きが強すぎると「読む→ほどく→置く」の一拍がただの詰まった箇条書きに戻る。新しい情報を足さず、モバイルの余白契約だけを守るのが効く。
- Next: preview 可能な環境で、Library bridge から Projects threshold までを 390px 幅でスクロールし、ステップの高さとCTAの距離が重くないか見る。

## 2026-04-28

- Focus: Visual / Access / Structure
- Changed: Projects 入口の `project-control-deck` を、棚ガイド・フィルター・状態文の縦積みから、デスクトップでは左右に分かれる門前、モバイルでは横に流せる棚小径へ整理した。表示情報は増やさず、棚ガイドの細い rail、フィルターの器、夜テーマ、phase gate の保護を追加した。
- Learned: 書庫から Projects へ渡す橋が整っていても、入口の操作群が縦に続くとカード一覧の事務感が戻りやすい。既存の棚情報を横方向の小径として圧縮すると、問いが三つの棚へ分かれる感触を保ったまま最初のカードへ入りやすい。
- Next: preview 可能な環境で、モバイルの横スクロール棚が見落とされないか、フィルターとの距離が近すぎないか確認する。

## 2026-04-28

- Focus: Narrative / Visual / Access / Structure
- Changed: Quote のあとにすぐ実務的なフッターへ落ちる弱さを、既存フッター内の `footer-garden-close` で整えた。最後の余韻を「読み終えた問いを庭へ戻す」小さな小径に変え、Heroへ戻る導線、終端の光、モバイル折り返し、phase gate の保護を追加した。
- Learned: 終盤の循環メモが整っていても、フッターがただのリンク置き場だと読後の体験が急に閉じる。新しいセクションを足さず、footer の入口だけを庭らしくすると、1ページをもう一度巡る理由が残る。
- Next: preview 可能な環境で、Quote から Footer へ落ちる暗さの変化と、`はじまりへ戻る` のピルがモバイル幅で強すぎないか確認する。

## 2026-04-28

- Focus: Narrative / Visual / Structure
- Changed: Projects 冒頭に `projectsGroup.threshold` 由来の小さな着地点を追加し、書庫から渡った問いが道具・ログ・物語の三つの棚へ分かれる一拍を置いた。既存の棚ガイド、フィルター、状態文は `project-control-deck` にまとめ、phase gate で threshold のデータ・描画・reveal を保護した。
- Learned: Library 側の橋が整っても、Projects 側がすぐ棚ガイドから始まると「渡された問いを受け取る」感触が弱い。新しいカードを足さず、入口の一拍と既存操作群の器を分けるだけで、一覧開始の事務感を抑えられる。
- Next: preview 可能な環境で、Projects threshold の細い rail がモバイル幅で余白を取りすぎないか、棚ガイドまでの歩幅も含めて確認する。

## 2026-04-28

- Focus: Narrative / Visual / Structure
- Changed: Vision のプロセスフローと Research Log の間に、`researchGroup.handoff` 由来の小さな戻り道を追加した。入口を「預ける → ほどく → 返す」の三段に整え、ログ件数の印、夜テーマ、モバイル縦レール、スクロール reveal、phase gate の保護まで接続した。
- Learned: Vision の入口とログがどちらも育つほど、間に「なぜここで研究ログへ戻るのか」の一拍がないとカード群が急に始まって見える。短い間奏をデータ化すると、情報を増やさずに循環の手触りを補える。
- Next: preview 可能な環境で、Vision 末尾の handoff が Research Log 先頭を押し下げすぎないか、モバイル幅の縦レールも含めて見る。

## 2026-04-28

- Focus: Access / Motion / Structure
- Changed: Vision 入口ガイドの四つの預け方に、触れる・フォーカスする・クリックするだけで対応する構想カードが浮かぶ `vision-entry-focus` を追加した。表示内容は増やさず、既存の `data-entry-kind` を使って「問い」「記憶」「古い道具」「地域の知恵」がどのカードへ接続するかを見えるようにし、phase gate で配信とCSS契約を保護した。
- Learned: Vision は入口ガイドとカードがどちらも整っていても、対応関係が静止したままだとフォーム仕様の一覧に見えやすい。軽いスポットライトだけで、預けたものが次の構想へ渡る感触を足せる。
- Next: preview 可能な環境で、Vision の入口スポットライトがモバイルのタップ後に強すぎないか、未対応カードの薄まり方も含めて見る。

## 2026-04-28

- Focus: Visual / Motion / Access
- Changed: Library 末尾の `library-projects-bridge` を、説明カードではなく書庫の問いを制作棚へ渡す小径として見えるように整えた。三段ステップに細い道筋と点を通し、末尾に小さな種の印とCTAの光を足した。モバイルでは三列を縦の参道へ変え、読む歩幅を詰めすぎないようにした。
- Learned: 橋渡しは文言が整っていても、ステップが横並びの情報片に見えると「次へ渡す」感触が弱い。線、点、出口の印を同じ方向へ揃えると、情報追加なしでスクロールの意味が濃くなる。
- Next: preview 可能な環境で、Library 末尾から Projects 冒頭へスクロールした時の余白と、Bridge の小さな種の印が過剰に目立たないか見る。

## 2026-04-28

- Focus: Visual / Motion / Structure
- Changed: Projects の `project-cycle-drawer` に小さな印と「小径をひらく」合図を加え、開いた三段メモに細い導線を通した。情報量は増やさず、折り畳み操作を実験棚の小さな参道として読めるようにし、phase gate で印と文言を保護した。
- Learned: 密度を下げるための折り畳みは、そのままだと事務的なUIに見えやすい。summary の合図と開いた中の視線誘導を少し整えるだけで、情報整理と遊び心を同居させられる。
- Next: preview 可能な環境で、Projects drawer のタップ感と開閉後のカード高さがモバイル幅で重く見えないか確認する。

## 2026-04-28

- Focus: Access / Structure
- Changed: Vision 入口ガイドの受付メモを `vision-entry-guide__field-drawer` として折り畳み、四つの預け方は見せたまま、フォーム仕様のように見える項目列を一段奥へ下げた。phase gate で折り畳み契約も保護した。
- Learned: 構想セクションは入力項目を丁寧に出しすぎると、庭を歩く体験より仕様確認に寄りやすい。最初は「何を預けるか」と「どこへ巡るか」だけを見せ、項目は必要な時に開くほうが空気を保てる。
- Next: Vision の個別カード側に残る受付メモと handoff が、ガイドを畳んだ後でも重複して見えないかモバイル幅で点検する。

## 2026-04-28

- Focus: Access / Structure
- Changed: Projects カードの `問い → 実験 → 発見` を常時表示の3列ブロックから、必要な時だけ開く `project-cycle-drawer` へ畳んだ。`project-trail` の直後に同じ道筋が二重に見える重さを抑え、phase gate で折り畳み契約を保護した。
- Learned: 制作棚は情報を消すより、最初に読む層とあとで開く層を分けるだけで、問いの循環を残したままカードの歩幅を軽くできる。
- Next: 折り畳んだ cycle の summary 文言が Magic Tool / Research Log / Story Seed のどの棚でも自然に読めるか、preview 可能な環境でタップ感を確認する。

## 2026-04-28

- Focus: Access / Visual / Structure
- Changed: Projects カードの `Origin` / `Surprise` / `Next` を縦に積む個別注釈から、1つの `project-trail` へ圧縮した。旧個別CSSを削り、phase gate に圧縮表示の保護を追加した。
- Learned: 制作棚は情報を削らなくても、二次情報を「実験の道筋」として同じ器にまとめるだけで、カードの読み始めが軽くなる。
- Next: Projects の `cycle` 表示があるカードだけ、道筋と「問い→実験→発見」の二重表示が重く見えないか次回点検する。

## 2026-04-27

- Focus: Structure / Access
- Changed: Projects のリンク種別データを `actionGuide` から `actionTypes` へ整理し、独立ガイドではなくCTAと棚ステータス文のラベル契約として扱う形にした。`project-filter` と `content-renderers` が同じ `actionTypes` を参照し、phase gate で旧キーが戻らないことも保護した。
- Learned: 一度削った表示ガイドの名前がデータ側に残ると、画面は増えていなくても次の編集で説明レイヤーを戻しやすくなる。表示しない情報ほど、用途が名前で読めることが大事。
- Next: Projects カード内の Why / Origin / Surprise / Next が4段続くカードを1件選び、注釈の密度を見た目だけで少し軽くできるか点検する。

## 2026-04-27

- Focus: Access / Motion / Structure
- Changed: モバイルのページ内導線で見出しが固定ナビ下へ潜りやすい弱点を、`scroll-offset` の小さな境界で整理した。CSSの `--hazakura-anchor-offset` と実測ナビ高を使い、通常リンクとゾーンナビのスクロール着地を同じ計算に揃えた。
- Learned: セクション間の橋渡しを増やした後は、橋そのものより「着地した瞬間に何が見えるか」が体験の質を左右する。固定値のままだと、モバイルの参道だけが少し窮屈になる。
- Next: 実ブラウザでアンカー着地を確認できる環境になったら、Hero CTA、Library bridge、ゾーンナビの3経路だけをモバイル幅で見る。

## 2026-04-27

- Focus: Narrative / Access / Structure
- Changed: Library 末尾に `libraryProjectsBridge` を追加し、書庫で読んだ問いを「読む→ほどく→置く」の短い間奏として Projects へ渡せるようにした。橋渡しリンクも既存のスムーススクロール対象に加え、phase gate で Stats 後から Projects 前に存在することを保護した。
- Learned: 書庫の直後に実績数値だけが残ると、販売・成果で一度閉じて見えやすい。短い余白の橋を置くと、新しい情報を増やさずに「本が実験棚へ戻る」流れを読ませられる。
- Next: 実ブラウザで Library 末尾の橋が重すぎないか確認し、必要ならステップ文か上部の光線だけをさらに削る。

## 2026-04-27

- Focus: Narrative / Access / Structure
- Changed: Vision の見出しを「次に育つ問い」へ寄せ、入口カードを先に読ませてからプロセスフロー、Research Log へ巡る順序へ並べ直した。あわせて process flow を Vision 内の小さな間奏として見えるように整え、phase gate でこの順序を保護した。
- Learned: 構想は最初に抽象的な循環図を置くより、何を預ける入口なのかを先に見せたほうが、未来予告ではなく実験庭園の導線として読める。
- Next: Vision の末尾から Quote prelude へ入る直前の余白が重く見えないか、モバイル幅で cycle bridge の密度を点検する。

## 2026-04-27

- Focus: Narrative / Access / Structure
- Changed: Quote 前の `quotePrelude` を、書庫・制作棚・構想へ戻れる三つの折り返しリンクとして整えた。あわせて紙片のような細い接続線と hover 表現を足し、`scripts/phase-gate.mjs` で `#library` / `#projects` / `#vision` への折り返しを守るようにした。
- Learned: 終盤の間奏は抽象的な余白だけだと最後の詩へ漂うが、上流セクションへ戻る小さなアンカーを持つと「読んで終わり」ではなく、問いをもう一度庭へ返す導線になる。
- Next: Quote prelude の折り返しリンクが実ブラウザで重く見えないか、preview 可能な環境でモバイル幅の余白とタップ感を確認する。

## 2026-04-27

- Focus: Structure / Motion
- Changed: scriptの読み込み順を `src/data/script-load-order.js` に集約し、`index.astro` と `scripts/phase-gate.mjs` が同じリストを見るようにした。新しい演出scriptを足す時に、ページ側とチェック側の更新漏れが起きにくい形へ寄せた。
- Learned: 演出追加の足枷は抽象化そのものより、読み込み順や必須assetの重複管理にも出やすい。manifestを1つ持つだけなら管理コストを増やさず、追加時の迷いを減らせる。
- Next: scriptごとの役割が増えてきたら、manifestに短い用途メモを持たせるか、今の軽さを保つかを一度だけ点検する。

## 2026-04-27

- Focus: Structure / Motion
- Changed: Sakura / Aurora / Cursor の start / stop / resize / clear を `effects-lifecycle.js` の薄い棚に集め、`app-controller.js` から個別に呼ぶ箇所を減らした。見た目は変えず、次に演出を足す時のライフサイクル入口を揃えた。
- Learned: CSSの肥大化よりも、演出ごとの停止・再開・縮小モーション対応が散ることのほうが足枷になりやすい。抽象化は大きくせず、共有hookだけを揃えると管理コストを抑えられる。
- Next: 新しい演出を足す前に、`effects-lifecycle.js` の棚へ入れるべきものと、DOM描画系として別扱いすべきものの線引きを1つだけ点検する。

## 2026-04-27

- Focus: Access / Narrative
- Changed: Hero の副CTAを Amazon 直行の「本をみる」からページ内アンカーの「書庫へ寄る」へ戻し、主CTAより静かなピルにして、初見の重心を販売導線ではなく1ページの参道へ寄せた。
- Learned: ファーストビューの副導線が外部販売へ向いているだけで、書庫や制作棚へ巡る前にページの体験が閉じて見えやすい。購入導線は Library 内へ残し、Hero では庭を歩く分岐にするほうが流れが自然になる。
- Next: Quote 前の prelude が Library / Projects / Vision を最後に畳む役目として読めるか、文量を増やさず余白と順序だけを点検する。

## 2026-04-27

- Focus: Narrative / Visual
- Changed: Projects の見出しを「制作物一覧」から「問いから生まれた実験」へ寄せ、Library で結晶化した問いが実験棚へ戻る説明に置き換えた。あわせて Projects 冒頭に細い境界光を足し、書庫から制作棚へ移るスクロールの切り替わりを少しだけ濃くした。
- Learned: Library 直後の Projects は、タイトルに「つくったもの」が残るだけで成果物一覧へ戻って見えやすい。文量を増やさず、既存見出しと境界の演出を揃えるだけでも導線の意味は強くなる。
- Next: Hero の副CTA「本をみる」が Library へ重心を寄せすぎていないか、ラベルか強弱だけを小さく見直す。

## 2026-04-27

- Focus: Access / Structure
- Changed: Projects 入口のリンク種別ガイドを別行表示から外し、既存の棚ステータス文に外部サイト・保存ファイル・準備中の内訳を集約した。あわせて未使用になったガイド用CSSを削り、最初のカードまでの助走を短くした。
- Learned: Projects は棚説明、フィルター、リンク種別をすべて並べると親切だが、カードの主題に入る前の説明量が勝ちやすい。内訳は状態文に圧縮しても導線の意味は残せる。
- Next: Projects カード内の Why / Origin / Surprise / Next が4段続くカードを1件選び、注釈の表示順か密度を少しだけ整理する。

## 2026-04-27

- Focus: Narrative / Visual
- Changed: Projects セクションの導入文を「完成物一覧」から「公開済み・試作中・構想中を同じ棚で眺める」説明へ整え、棚ガイドと状態文の余白・区切りを調整して、カードへ入る前の視線誘導を強めた。
- Learned: Seed や Concept が増えた Projects では、「完成したら残す場所」という言い方が弱くなりやすい。導入文と棚ガイドを循環の言葉へ揃えるだけでも、追加なしでセクションの意味が通りやすくなる。
- Next: Projects カード内の Why / Origin / Surprise / Next が長く見えるものを1件選び、本文を削らずに注釈の密度や順番だけで読みやすくできるか見る。

## 2026-04-27

- Focus: Content / Access
- Changed: Research Log 004 に `sourceProject` を追加し、`地域LLM 知恵棚（構想メモ）` 由来の構想を次の問いへ戻す実験として読めるようにした。あわせてレトロ・ガジェット再生カードへ `entry.handoff` を追加し、古い道具を記憶とワークショップの問いへ巡らせる流れを1文で示した。
- Learned: Projects から Research Log へ戻る導線と、Vision の入口から預けた後の巡りを同じ短い型で足すと、1ページのまま「保存して終わらない」感じを増やせる。
- Next: レトロ・ガジェット再生の Research Log 002 側にも、道具カードやワークショップ由来の source 表示が必要か小さく見る。

## 2026-04-27

- Focus: Content / Access
- Changed: 地域LLMカードの `entry.handoff` を追加し、預かった知恵を由来・場面・問いへ分けて地域の言葉で返す流れを1文で示した。あわせて Research Log 004 にアンカーを付け、`地域LLM 知恵棚（構想メモ）` から同ログへ戻れる `returnLink` を追加した。
- Learned: 知恵棚は Vision の入口文と Projects の構想カードを同じ Research Log へ戻すだけでも、循環型CMSの「保存して終わらない」感じが強まる。
- Next: 地域LLMの往復導線が増えたら、Research Log 004 側にも Projects 由来であることを短く示すか検討する。

## 2026-04-27

- Focus: Content / Access
- Changed: 自分史編纂カードの `entry.handoff` を追加し、預かった記憶が自分史断片から地域LLMの知恵棚へ巡る流れを読めるようにした。あわせて Research Log の論文出典リンクに `actionLabel` / `actionHint` を持たせ、外部リンクのラベル・行き先表示を Projects の導線に近づけた。
- Learned: 入口カードの handoff は全カードへ一気に足すより、次の循環が具体的に見えるものから1件ずつ増やすほうが、Vision セクションを長くしすぎずに済む。
- Next: レトロ・ガジェット再生か地域LLMにも handoff を足す場合は、カード本文との重複を避けて1文だけに収める。

## 2026-04-27

- Focus: Content / Access
- Changed: AI寺子屋の `entry` に「預けたあとの巡り」を追加し、カード内で受付メモの後に表示できるようにした。あわせて Projects の棚フィルター状態文に、表示中カードの外部サイト・保存ファイル・準備中の内訳を出すようにした。
- Learned: 入力前の受付項目だけでなく、預けた後にどこへ巡るかまで同じデータ境界に置くと、RFPのコミュニティ・インターフェースをフォーム実装前でも読みやすくできる。
- Next: AI寺子屋以外の Vision カードにも、必要に応じて `handoff` を1件ずつ足し、入口ごとの巡りが長くなりすぎないか見る。

## 2026-04-27

- Focus: Content / Access
- Changed: Vision の自分史・レトロガジェット・地域LLMカードにも受付メモの `fields` を追加し、Projects のリンクなしカードを外部・DLと同じ `project-action--status` ピルで表示するようにした。
- Learned: 将来フォーム化する入口と制作物カードの状態表示を同じデータ境界で揃えると、1ページ内の「預けるもの」と「まだ育てているもの」が読み分けやすくなる。
- Next: `project-action--status` の短い状態文を棚フィルターと連動させ、準備中カードだけを見た時の説明をもう一段だけ濃くする。

## 2026-04-27

- Focus: Content / Access
- Changed: Research Log 006 の `paperSample` に実論文 `Generative Agents: Interactive Simulacra of Human Behavior` と arXiv URL を追加し、読む前の3分メモを地域LLM・AI万屋へ返す問いとして具体化した。あわせて `paperSample.source` を表示する `research-paper-source` を追加し、出典リンクが本文メモと分かれて読めるようにした。
- Learned: 実論文のURLを1件だけ置く場合も、リンク単体ではなく「どの語を拾い、どの実験へ戻すか」を同じデータ境界に持たせると、arxiv_scout が検索道具ではなく Research Log へ巡る入口として読める。
- Next: 次回は `paperSample.source` が複数ログへ増えても重くならないように、出典表示のラベルやリンク色を Projects の外部リンク表記と揃えるか検討する。

## 2026-04-27

- Focus: Content / Access
- Changed: Research Log 006 に `paperSample` を追加し、arxiv_scout から戻ってきた論文メモの最小単位を「拾う語 / 問いへ戻す / 次の実験」で読めるようにした。あわせて制作物カードの Why / Origin / Surprise / Next に共通の `project-note` を付け、モバイル幅でもラベルと本文が詰まりにくい注釈レイアウトへ整えた。
- Learned: 論文探索は実リンクを急いで増やすより、まず「1本を読む前に何を残すか」の型を置くほうが、Research Log と Magic Tool の循環に接続しやすい。
- Next: 次回は `paperSample` に実際の論文タイトルやURLを1件だけ足し、外部リンク表記とResearch Log内の出典表示が重くならないか確認する。

## 2026-04-27

- Focus: Visual / Content
- Changed: One-page Architecture の各レイヤーに `phase` / `phaseNote` を追加し、読む・触れる・移ろう・巡らすの薄い時間軸をカード内に表示した。あわせて Magic Tool 系カードに `origin` を足し、なぜ作ったかの前段にある作り始めの火種を読めるようにした。
- Learned: Why だけだと動機の説明で止まりやすいが、Origin を添えると RFP の「探求の可視化」として、道具が問いから生まれた流れまで追いやすくなる。
- Next: Origin が増えたら、Magic Tool のみを絞り込んだ時に Origin / Why / Surprise / Next の並びが長すぎないか、モバイルで再点検する。

## 2026-04-27

- Focus: Narrative / Content
- Changed: Research Log に「未知の論文は、どう問いへ変わるか」を追加し、`arxiv_scout（試作メモ）` から Research Log 006 へ戻れる導線を表示した。
- Learned: 未知の論文探索は検索結果を増やす話にせず、驚いた語を次の仮説へ戻すログとして置くと、RFPの「探求の可視化」と Magic Tools の循環が近づく。
- Next: Research Log 006 を起点に、実際の論文メモを1件だけ `問い / 実験 / 発見` へ落とし込む小さなサンプルを足す。

## 2026-04-27

- Focus: Narrative / Content
- Changed: Quote セクション直前に `quotePrelude` を追加し、読む・預ける・巡らせるの三段で、最後の引用へ入る前に問いがもう一度入口へ戻る余韻を置いた。あわせて AI寺子屋カードの `entry.fields` を表示できるようにし、将来フォーム化する時の受付メモをカード側にも持たせた。
- Learned: 終盤の詩へ向かう前に短い循環メモを挟むと、Visionで増えた入口群がページの余韻とつながり、RFPの「循環する魔法の拠点」として読み終わりが閉じすぎない。
- Next: Quote 前の `quotePrelude` が重く感じる場合は、Research Log や Projects の状態に応じて三段メモの文言だけを差し替えられるようにする。

## 2026-04-27

- Focus: Content / Access
- Changed: Projects の全カードに `nextStep` を追加し、道具・問い・物語が次にどこへ巡るかを短い Next メモとして表示した。あわせて画像なしの仮サムネイルへ `placeholderAlt` を持たせ、見た目だけのカードでも説明をデータ側で点検できるようにした。
- Learned: 制作物カードは Why / Surprise だけでなく Next まで揃えると、RFPの「作って終わりではなく、問いへ戻る」循環が一覧の中で読みやすくなる。
- Next: Next メモが増えてきたら、棚フィルターごとに「次にできること」を上部の概要へ集約するか検討する。

## 2026-04-27

- Focus: Content / Access
- Changed: Vision の入口ガイドに `fields` を追加し、問い・記憶・古い道具・地域の知恵ごとに将来フォームで受け取りたい「受付メモ」を表示した。あわせて4種の入口ガイドを2列/1列で崩れにくく読めるように調整した。
- Learned: フォーム本体を置く前に、どの項目を受け取るかだけを `content.js` に持たせると、RFPのコミュニティ・インターフェースへ近づけつつ1ページの軽さを保てる。
- Next: 受付メモが増えたら、Vision ガイドから各カードへ移動する小さなアンカーか、入力種別ごとの折りたたみを検討する。

## 2026-04-27

- Focus: Content / Access
- Changed: Research Log に「物語の風景は、どんな問いを連れてくるか」を追加し、`オリジナルアニメ映画` の Story Seed カードから Research Log 005 へ戻れる細い導線を表示した。
- Learned: 物語の構想は完成予定として置くだけでなく、風景から生まれる問いへ戻すと、Projects と Research Log の循環が読みやすくなる。
- Next: Story Seed から戻したログが増えたら、Project 側の `returnLink` を棚ごとに標準化し、モバイルでリンクが詰まらないか実機確認する。

## 2026-04-27

- Focus: Access / Structure
- Changed: Projects のリンク種別ガイドに外部サイト・保存ファイル・準備中の件数を表示し、リンク付きカードのCTA内に行き先ホスト名または保存ファイル名を出すようにした。
- Learned: 制作物が増えてきたら、行動ボタンの文言だけでなく「どこへ行くか」「何件あるか」を同じデータ境界で示すと、外部移動と保存の違いを迷わず読める。
- Next: Projects の準備中カードが多くなってきたので、次回は Story Seed / Magic Tool のうち1件だけを Research Log へ戻す細い導線を検討する。

## 2026-04-27

- Focus: Content / Structure
- Changed: Research Log に「地域の知恵は、どんな問いへ戻せるか」を追加し、任意の `wisdomTrail` で `由来 / 場面 / 次に返す問い` を表示できるようにした。
- Learned: 地域LLMの知恵棚は、長い説明を増やすより、預かった言葉が次の問いへ戻る最小単位をログ内に置くほうが循環型CMSへつなげやすい。
- Next: `wisdomTrail` が複数ログに増えたら、Vision の地域LLMカードから該当 Research Log へゆるく辿れる導線を検討する。

## 2026-04-27

- Focus: Content / Narrative
- Changed: Vision の入口ガイドに「地域の知恵」を追加し、地域LLMカードへ預ける問いを表示した。あわせて Projects に `地域LLM 知恵棚（構想メモ）` を足し、地域の言葉を問いへ返す循環を Story Seed として読めるようにした。
- Learned: 地域LLMはモデル名として置くより、預かった言葉を由来・場面・次の問いへ分ける知恵棚として書くと、RFPの循環型CMSに近づく。
- Next: 地域LLMの種が増えたら、預かった知恵を `由来 / 場面 / 次に返す問い` の型で Research Log にも小さく展開する。

## 2026-04-27

- Focus: Narrative / Content
- Changed: Research Log に「AI万屋の伝令」を追加し、相談を次の人へ渡す問い・実験・発見を置いた。あわせて `AI万屋 伝令エージェント（構想メモ）` に `cycle` を追加し、Projects 側でも同じ循環を読めるようにした。
- Learned: 伝令エージェントは「答えるAI」ではなく、未整理の声をほどいて人やログへ返す役割として書くと、RFPのAI万屋と循環型CMSが自然につながる。
- Next: 伝令エージェントの相談メモを増やす時は、`困りごと / 背景 / 次に聞くこと / 渡す相手` の型をカードやログで再利用できるようにする。

## 2026-04-27

- Focus: Content / Access
- Changed: Vision の入口ガイドに `flow` を追加し、「問い」「記憶」「古い道具」を預けた後の巡りを表示した。あわせて Vision カードへ入力種別バッジを出し、ガイドとカードの対応を読み分けやすくした。
- Learned: フォーム本体を増やさなくても、預けるものと預けた後の行き先を同じ種別色で見せると、RFPのコミュニティ・インターフェースが1ページ内で具体化しやすい。
- Next: Vision の入口種別が増えたら、ガイド側から該当カードへ軽くスクロール補助できるか検討する。

## 2026-04-27

- Focus: Content / Narrative
- Changed: `arxiv_scout（試作メモ）` に問い・実験・発見の `cycle` を追加し、Projects に `AI万屋 伝令エージェント（構想メモ）` の Magic Tool 種カードを足した。
- Learned: AI万屋のエージェント構想は、固有アプリ名ではなく「問いを運ぶ役割」として置くほうが、権利面に慎重でResearch Logへも戻しやすい。
- Next: 伝令エージェント構想の役割が見えたら、相談入力をどう分類して次の人へ渡すかを `cycle` として小さく足す。

## 2026-04-27

- Focus: Content / Access
- Changed: Projects に `arxiv_scout（試作メモ）` の Magic Tool 種カードを追加し、640px以下のナビリンクを少し大きい5分割レールとして読めるようにした。
- Learned: RFPに出ている道具名を小さな種として置くだけでも、制作物一覧が「公開済みの成果」だけでなく、問いが道具へ育つ途中の棚として読める。
- Next: `arxiv_scout` の試作が進んだら、問い・実験・発見の `cycle` を足して Research Log 側へも接続する。

## 2026-04-27

- Focus: Access / Content
- Changed: Projects のリンク種別ガイドに `icon` を追加し、制作物CTAには `actionHint` を表示できるようにした。Library の書影altも、タイトルの反復ではなく本の問いが伝わる説明へ整えた。
- Learned: 外部移動とファイル保存の違いは、一覧前のガイドとカード上の短い補助文を同じデータ境界で持たせると、カードが増えても迷いにくい。
- Next: 外部リンクやダウンロードが増えたら、`actionHint` の文言を種別ごとに標準化し、モバイルでCTAが詰まらないか実機確認する。

## 2026-04-27

- Focus: Access / Structure
- Changed: ダウンロード系制作物に `actionNote` を追加し、Sakura Sky の未署名版注意を本文から分けてカード内の補足として表示できるようにした。
- Learned: 注意文を本文へ混ぜるより、導線に近い補足としてデータ化したほうが、制作物の物語性と利用前の確認を両立しやすい。
- Next: ダウンロード系カードが増えたら、`actionNote` の種別や重要度を分けて、注意・推奨環境・署名状態を読み分けられるようにする。

## 2026-04-27

- Focus: Content / Access
- Changed: Research Log カードに `theme` を追加し、番号とテーマを上部メタ情報として分けて表示できるようにした。
- Learned: ログが複数になった段階では、本文を増やすよりテーマを短く添えるほうが、問いの棚をすばやく読み分けやすい。
- Next: Research Log がさらに増えたら、テーマごとの並びや絞り込みを Projects の棚導線と呼応させる。

## 2026-04-27

- Focus: Content / Narrative
- Changed: Research Log に「古い道具は、どんな記憶を話しはじめるか」を追加し、レトロ・ガジェット再生を問い・実験・発見の形で読めるようにした。複数ログが詰まらないよう Research Log の縦余白も整えた。
- Learned: レトロ・ガジェット再生は修理や工作の紹介だけでなく、モノを入口にした自分史・地域記憶の採集として置くと、RFPの循環に自然につながる。
- Next: Research Log が増えてきたら、Vision内のログ一覧に番号やテーマ別の軽い見出しを足すか検討する。

## 2026-04-27

- Focus: Access / Visual
- Changed: Vision のモバイル表示で、入口ガイドとカードの余白・文字サイズ・補足行の折り返しを詰め、縦に長くなりすぎない読み口へ整えた。
- Learned: 入力種別ガイドは情報量を減らさず、補足メタ情報を横並びで折り返すだけでも、狭い幅で入口のまとまりが保ちやすい。
- Next: 実機またはブラウザで Vision セクションを見直し、360px 幅でもカード間の呼吸が足りているか確認する。

## 2026-04-27

- Focus: Content / Access
- Changed: Vision の入口ガイドに接続先名を追加し、カード順を「問い」「記憶」「古い道具」の三つの入口に先に呼応する並びへ整えた。
- Learned: フォーム本体を作らなくても、入口種別と対応カードを近くに置くと、コミュニティ・インターフェースの下書きとして読みやすくなる。
- Next: モバイル幅で Vision ガイドとカードの縦間隔を見直し、入口のまとまりが長くなりすぎないよう調整する。

## 2026-04-27

- Focus: Visual / Access / Structure
- Changed: Vision カードにも `data-entry-kind` を付け、問い・記憶・古い道具の入口ガイドとカード本文へ薄い種別アクセントを反映した。
- Learned: フォームを作る前でも、入力種別の色と境界を揃えると、コミュニティ導線が「何を預ける場所か」として読み分けやすくなる。
- Next: Vision セクションのカード順を入力種別ガイドとより自然に呼応させるか、モバイル幅での余白を再点検する。

## 2026-04-27

- Focus: Content / Structure
- Changed: レトロ・ガジェット再生カードに `entry.kind: object` の入口文を追加し、Vision の入力種別ガイドに各種別へ接続しているカード数を表示するようにした。
- Learned: 「問い」「記憶」「古い道具」の三種すべてに初期カードが対応すると、将来フォーム化する時の受け口が1ページ内で見通しやすくなる。
- Next: 入力種別ごとにカードの薄いアクセント色や並びを調整し、フォーム下書きへ進む前の読み分けをもう少し強める。

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
