# リッチ化ログ

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
