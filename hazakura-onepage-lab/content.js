window.HAZAKURA_CONTENT = {
    philosophy: [
        {
            icon: '揺',
            title: '変化の肯定',
            subtitle: '— ゆらぎ —',
            text: '満開だけでなく、散りゆく花びらにも美を見出す。完成ではなく「移ろい」の中にこそ、本当の価値が宿る。'
        },
        {
            icon: '融',
            title: '理と情の融合',
            subtitle: '— 習合 —',
            text: '西洋的な論理（AI / Lab）と東洋的な情緒（自然 / 大和言葉）。対立ではなく、溶け合わせる。'
        },
        {
            icon: '巡',
            title: '知恵の循環',
            subtitle: '— 事上磨錬 —',
            text: '使うほどに賢くなり、教え合うことで豊かになる。生きているシステムとしての知識の巡り。'
        }
    ],
    experienceLayers: [
        {
            label: 'Narrative',
            title: '思想を読む',
            cadence: 'RFPの核を置く',
            phase: '読む',
            phaseNote: '移ろい・習合・循環',
            text: 'RFPの核にある「移ろい」「習合」「循環」を、スクロールで少しずつ体験へ変えていく層。'
        },
        {
            label: 'Works',
            title: '成果に触れる',
            cadence: '制作物と発見を足す',
            phase: '触れる',
            phaseNote: '道具・本・ログ',
            text: '本、ツール、アプリ、実験作品を、単なる一覧ではなく制作動機と発見のログとして蓄積する層。'
        },
        {
            label: 'Motion',
            title: '空気が変わる',
            cadence: '読みに沿って移ろう',
            phase: '移ろう',
            phaseNote: '昼から夜へ',
            text: '昼、夕、夜、月、オーロラへ移ろう演出を、セクションやコンテンツ追加に追従できる層。'
        },
        {
            label: 'Community',
            title: '問いを預ける',
            cadence: '知恵を入口へ戻す',
            phase: '巡らす',
            phaseNote: '寺子屋・自分史・地域LLM',
            text: 'AI寺子屋、自分史、AI万屋へつながる入口を、将来的にフォームやCMSへ接続する層。'
        }
    ],
    stats: [
        { target: 548, suffix: '+', label: 'ページの対話', sub: 'チカちゃんシリーズ二冊に広がる思索' },
        { target: 2, suffix: '', label: '冊の本', sub: '哲学冒険譚と重さのないノート' },
        { target: 240, suffix: '', label: '日の問い', sub: '生活の手ざわりまで続く探求' },
        { target: 100, suffix: '%', label: '好奇心', sub: 'すべては「なぜ？」から始まる' }
    ],
    process: [
        { icon: '🔍', label: '問い' },
        { icon: '⚗️', label: '実験' },
        { icon: '💡', label: '発見' },
        { icon: '🌸', label: '循環' }
    ],
    quotePrelude: {
        eyebrow: 'Before the last poem',
        title: 'ページの最後で、問いをもう一度入口へ戻す。',
        text: '読み終えたあとに残った小さな気配を、Research Log、制作物、地域の知恵へ返すための余白です。',
        steps: [
            {
                label: '読む',
                text: '思想、本、道具、構想のどこで心が止まったかを拾う。'
            },
            {
                label: '預ける',
                text: '問い・記憶・古い道具・地域の知恵のどれとして残せるかを見る。'
            },
            {
                label: '巡らせる',
                text: '次のResearch LogやMagic Toolへ戻し、また一枚の中で育てる。'
            }
        ]
    },
    researchGroup: {
        logs: [
            {
                eyebrow: 'Research Log 001',
                theme: '情緒プロンプト',
                title: 'AIの答えに、情緒は宿るのか',
                question: '正しさだけでなく、読み手の気持ちが少し動く返答はどう作れるのか。',
                experiment: 'RFPの「理と情の融合」を軸に、同じ案内文を説明調・物語調・対話調で書き分けて比べる。',
                finding: '情緒は飾りではなく、問いの置き方と余白の残し方から生まれる。葉桜ラボでは、答えより先に驚きの入口を置く。'
            },
            {
                eyebrow: 'Research Log 002',
                theme: 'レトロ・ガジェット再生',
                title: '古い道具は、どんな記憶を話しはじめるか',
                question: '眠っているラジオや写真にAIの対話を重ねると、道具はただの機械ではなく記憶の入口になるのか。',
                experiment: '古い道具を持ち寄る場を想像し、持ち主の思い出、道具の音、AIからの問い返しを三つの短いメモに分けて記録する。',
                finding: 'レトロ・ガジェット再生は修理だけではなく、モノをきっかけに人の記憶をひらく小さな自分史の入口になる。'
            },
            {
                eyebrow: 'Research Log 003',
                theme: 'AI万屋の伝令',
                title: '相談は、どう次の人へ渡っていくか',
                question: '人から預かった相談を、AIが答えきるのではなく、次に動ける小さな手順として誰かへ渡せるのか。',
                experiment: '「困りごと」「背景」「次に聞くこと」「渡す相手」の四つに分け、伝令エージェントが返す短い引き継ぎ文を想像する。',
                finding: 'AI万屋の価値は即答だけではなく、未整理の声をほどき、地域の知恵や制作メモへ戻せる形に整えることにもある。'
            },
            {
                id: 'research-log-local-wisdom',
                eyebrow: 'Research Log 004',
                theme: '地域LLM',
                title: '地域の知恵は、どんな問いへ戻せるか',
                question: '暮らしの工夫や土地の言い回しを、ただ保存するだけでなく、次の人の困りごとへ返すにはどんな形がよいのか。',
                experiment: '預かった知恵を「由来」「場面」「次に返す問い」の三つに分け、地域LLMの知恵棚で再利用できる短い断片として置いてみる。',
                finding: '地域の知恵は説明文に伸ばすより、誰がどんな場面で使い、次に何を聞けるかまで添えると、循環型CMSの入口として育ちやすい。',
                wisdomTrail: [
                    {
                        label: '由来',
                        text: '誰かの仕事、暮らし、遊びから自然にこぼれた言葉として受け取る。'
                    },
                    {
                        label: '場面',
                        text: '困りごと、季節、道具、地域の習慣など、使われた背景と一緒に残す。'
                    },
                    {
                        label: '次に返す問い',
                        text: '似た状況の人へ「このやり方を試すなら、まず何を見ますか？」と問い返す。'
                    }
                ]
            },
            {
                id: 'research-log-hazakura-anime',
                eyebrow: 'Research Log 005',
                theme: '物語の棚',
                title: '物語の風景は、どんな問いを連れてくるか',
                question: 'まだ形になっていないアニメ映画の一枚絵は、説明では届きにくい葉桜ラボの思想を問いへ戻せるのか。',
                experiment: '夜明けの湖畔、桜、光、移ろいという要素を「場面」「感情」「次に作る小さな断片」に分け、Story SeedからResearch Logへ移して読む。',
                finding: '物語の種は完成予定を語るより、どんな感覚を残し、次に何を試すかまで置くと、制作物ではなく探求の入口として巡りはじめる。',
                sourceProject: {
                    label: 'Story Seed',
                    title: 'オリジナルアニメ映画',
                    text: '風景の構想を、作品紹介で閉じずに次の問いへ戻す。'
                }
            },
            {
                id: 'research-log-arxiv-scout',
                eyebrow: 'Research Log 006',
                theme: '未知の論文',
                title: '未知の論文は、どう問いへ変わるか',
                question: '論文をたくさん集める前に、まだ知らない概念から自分の次の問いをどう取り出せるのか。',
                experiment: 'arxiv_scoutの試作メモを、タイトル、気になる語、次に試す仮説の三つへ分け、1件だけResearch Logへ戻す前提で読む。',
                finding: '探索道具は情報量を増やすより、驚いた言葉を「次に何を試すか」まで小さく整えると、AIと人の探求が循環しやすい。',
                sourceProject: {
                    label: 'Magic Tool',
                    title: 'arxiv_scout（試作メモ）',
                    text: '未知の論文探索を、道具紹介から問いの記録へ戻す。'
                },
                paperSample: {
                    eyebrow: 'Paper memo seed',
                    title: 'Generative Agentsを読む前の、3分メモ',
                    text: '論文を読み切る前に、地域LLMやAI万屋へ返せそうな「記憶」「日課」「ふるまい」の語だけを先に拾う。',
                    source: {
                        actionLabel: '外部',
                        actionHint: '論文ページ',
                        label: 'arXiv 2304.03442',
                        title: 'Generative Agents: Interactive Simulacra of Human Behavior',
                        url: 'https://arxiv.org/abs/2304.03442',
                        note: '人のような日課や記憶を持つエージェントの論文を、地域の知恵棚へ応用できるか眺める。'
                    },
                    notes: [
                        {
                            label: '拾う語',
                            text: '記憶の流れ、日課、ふるまいの連鎖という語が、AI万屋の伝令役や地域LLMの知恵棚に触れる。'
                        },
                        {
                            label: '問いへ戻す',
                            text: '地域の人から預かった言葉も、単発の回答ではなく、その人らしい背景や次の行動へ結べるのかを問う。'
                        },
                        {
                            label: '次の実験',
                            text: '寺子屋の相談メモを一つ想定し、記憶、反省、次に声をかける相手の三行へ分けてみる。'
                        }
                    ]
                }
            }
        ],
        cycleBridge: {
            eyebrow: 'Circulation note',
            title: '問いは記憶になり、また誰かの問いへ戻る。',
            text: 'Research Logに残した発見、自分史に預けた記憶、寺子屋で交わした学び。それらを地域LLMが少しずつ受け取り、次の人の言葉で返していく。葉桜ラボは、その巡りを一枚のページで育てる実験場です。'
        }
    },
    visionsGroup: {
        entryGuide: {
            eyebrow: 'Community interface seed',
            title: '問い、記憶、古い道具、地域の知恵を預ける入口',
            text: '将来のフォームでは、ただ送信欄を置くのではなく、地域の知恵が循環しやすい四つの預け方として受け取ります。',
            kinds: [
                {
                    kind: 'question',
                    label: '問い',
                    text: '学び直したいことや、誰かと考えたいテーマ。',
                    flow: 'Research Logへ移し、小さな実験の種にする。',
                    target: 'AI寺子屋',
                    fields: ['聞きたいこと', 'いまの状況', '一緒に考えたい相手']
                },
                {
                    kind: 'memory',
                    label: '記憶',
                    text: '残しておきたい風景、仕事、声、暮らしの手ざわり。',
                    flow: '自分史の断片として、次の世代へ渡せる形に整える。',
                    target: '自分史編纂',
                    fields: ['残したい場面', '関わった人', '次へ渡したい理由']
                },
                {
                    kind: 'object',
                    label: '古い道具',
                    text: 'AIともう一度めぐらせたいラジオ、写真、ガジェット。',
                    flow: '持ち主の物語と一緒に、再生ワークショップへつなぐ。',
                    target: 'レトロ・ガジェット再生',
                    fields: ['道具の名前', '使っていた場面', 'もう一度試したいこと']
                },
                {
                    kind: 'knowledge',
                    label: '地域の知恵',
                    text: '暮らしの工夫、昔の仕事、土地の言い回しや小さな手順。',
                    flow: '地域LLMの知恵棚へ置き、次の問いへ返せる断片にする。',
                    target: '地域LLM',
                    fields: ['知恵の由来', '使う場面', '次の人への問い']
                }
            ]
        },
        items: [
            {
                icon: '🏠',
                title: 'AI 寺子屋',
                jp: '道楽と循環',
                text: '子どもの学びを支え、シニアの経験を「教える側」の知恵として迎える、世代を越えた未来の学び舎。',
                entry: {
                    kind: 'question',
                    label: 'まず預けたい問い',
                    prompt: 'いま誰かに教えたいこと、もう一度学びたいことは何ですか？',
                    fields: ['学び直したいこと', '教えられる経験', '一緒に試したい相手'],
                    handoff: {
                        label: '預けたあとの巡り',
                        text: '問いをResearch Logへ仮置きし、寺子屋で試す小さな対話へ返す。'
                    }
                }
            },
            {
                icon: '📜',
                title: '自分史編纂',
                jp: '物語を紡ぐ',
                text: '人々の思い出を物語として紡ぎ、デジタルアーカイブ化。あなたの記憶が、次の世代への贈り物になる。',
                entry: {
                    kind: 'memory',
                    label: 'まず預けたい記憶',
                    prompt: 'いま誰かに残しておきたい風景、声、手ざわりは何ですか？',
                    fields: ['残したい場面', '関わった人', '次へ渡したい理由'],
                    handoff: {
                        label: '預けたあとの巡り',
                        text: '記憶を一場面ずつ自分史の断片に整え、地域LLMの知恵棚へ渡せる言葉にする。'
                    }
                }
            },
            {
                icon: '📻',
                title: 'レトロ・ガジェット再生',
                jp: '古いモノに魂を宿す',
                text: '眠っているラジオや古い道具にAIの小さな対話を重ね、思い出と機能をもう一度めぐらせるワークショップの記録。',
                entry: {
                    kind: 'object',
                    label: 'まず預けたい古い道具',
                    prompt: 'もう一度声を聞きたいラジオ、写真、ガジェットはありますか？',
                    fields: ['道具の名前', '使っていた場面', 'もう一度試したいこと']
                },
                tag: 'Workshop seed'
            },
            {
                icon: '🗺️',
                title: '地域LLM',
                jp: '知恵を巡らせる',
                text: 'Research Logや自分史、寺子屋の問いを少しずつ蓄え、地域の言葉で答えを返す小さな知恵の循環炉。',
                entry: {
                    kind: 'knowledge',
                    label: 'まず預けたい地域の知恵',
                    prompt: '暮らしの中で、次の人に渡したい工夫や言葉はありますか？',
                    fields: ['知恵の由来', '使う場面', '次の人への問い'],
                    handoff: {
                        label: '預けたあとの巡り',
                        text: '知恵を由来・場面・問いへ分け、必要な時に地域の言葉で返せる断片にする。'
                    }
                },
                tag: 'CMS seed'
            },
            {
                icon: '🧪',
                title: 'Research Log',
                jp: '研究記録',
                text: '「問い→実験→発見」のサイクルで記す、知的冒険の航海日誌。AIの思考プロセスから日常の哲学的驚き（thaumazein）まで。'
            },
            {
                icon: '✨',
                title: 'Magic Tools',
                jp: '魔法の道具',
                text: '「何ができるか」だけでなく、「なぜ作ったのか」と「どんな驚きがあったか」をセットにした、道具たちの物語。'
            }
        ]
    },
    projectsGroup: {
        lanes: [
            {
                label: 'Magic Tool',
                jp: '道具の棚',
                text: '作ったものと、その動機を残す場所。',
                filterText: '道具だけを見ると、葉桜ラボが「何を作ったか」より先に「なぜ作ったか」を追いやすくなります。'
            },
            {
                label: 'Research Log',
                jp: '問いの棚',
                text: '問い、実験、発見の小さな循環を残す場所。',
                filterText: '問いの棚では、完成物ではなく、考えが生まれて形を変える途中の温度を残します。'
            },
            {
                label: 'Story Seed',
                jp: '物語の棚',
                text: 'まだ形になる前の風景や構想を温める場所。',
                filterText: '物語の棚は、まだ道具や本になる前の風景を置き、次の実験へ戻すための余白です。'
            }
        ],
        overview: '道具、問い、物語を行き来しながら、AI万屋の小さな実験がどう循環しているかを眺められます。',
        actionGuide: [
            {
                type: 'external',
                icon: '↗',
                label: '外部サイト',
                text: '別タブで外の実験場へ移動します。'
            },
            {
                type: 'download',
                icon: '↓',
                label: '保存ファイル',
                text: 'ファイルを手元へ保存します。注意文を読んでから試してください。'
            },
            {
                type: 'status',
                icon: '・',
                label: '準備中',
                text: 'まだ外へ移動しない、構想や制作途中のカードです。'
            }
        ],
        items: [
            {
                lane: 'Magic Tool',
                type: 'Web Tool',
                title: 'Kindle EPUB Studio',
                image: './img/project-kindle-epub.png',
                alt: 'Kindle EPUB Studioで原稿、表紙、目次設定を並べてEPUB生成を確認している画面',
                href: 'https://kindle-epub-tool.pages.dev',
                action: 'Live',
                actionType: 'external',
                actionLabel: '外部',
                actionHint: 'ブラウザで開く',
                text: 'MarkdownからプロフェッショナルなKindle EPUBをブラウザ完結で生成するツール。ローカル処理、自動目次生成、GFMテーブル対応。',
                why: 'Kindle公開作業を、誰かのサーバーに預けず自分の手元で完結させたくて作ったもの。',
                origin: '出版の手順を「人に頼む工程」ではなく、自分で試して直せる小さな作業台へ戻すところから始まった。',
                surprise: '出版の工程は大きな仕組みでなくても、小さなブラウザ道具へ分解すると「自分で直せる知恵」になる。',
                nextStep: '原稿テンプレートや出版メモを足し、Library の問いへ戻せる道具に育てる。',
                tags: ['Markdown', 'EPUB', 'Kindle', 'クライアントサイド']
            },
            {
                lane: 'Magic Tool',
                type: 'Research Tool',
                title: 'arxiv_scout（試作メモ）',
                placeholderIcon: '🔍',
                placeholderText: 'arxiv scout',
                placeholderAlt: '虫眼鏡で未知の論文を探す arxiv_scout の仮サムネイル',
                status: 'Seed',
                statusHint: 'Research Logへ育成中',
                text: '未知の論文をただ集めるのではなく、問いの種、使えそうな概念、次に試す手順へ分けて読みほどくための小さな探索道具の構想。',
                why: 'AIの知性を、答えを出す機械ではなく「まだ知らない概念へ連れていく相棒」として扱いたくて置いた種。',
                origin: '検索結果を増やす前に、知らない言葉へ立ち止まる時間を道具側に持たせたくて置いた。',
                surprise: '論文タイトルの一覧も、問いと実験の型に通すと、Research Logへ戻せる発見の入口になる。',
                nextStep: '読んだ論文を1件だけ、問い・実験・発見の短いログへ返す。',
                returnLink: {
                    href: '#research-log-arxiv-scout',
                    label: 'Research Log 006',
                    text: '探索道具から問いへ戻す'
                },
                cycle: {
                    question: '未知の論文から、自分の次の問いをどう取り出すか。',
                    experiment: 'タイトル、要約、気になる概念を分け、Research Logへ移せる短い仮説に整える。',
                    finding: '探索道具は検索結果の量より、次に試せる問いの形まで戻せるかで価値が変わる。'
                },
                tags: ['arXiv', 'Research Scout', 'Magic Tool', 'Seed']
            },
            {
                lane: 'Magic Tool',
                type: 'Agent Seed',
                title: 'AI万屋 伝令エージェント（構想メモ）',
                placeholderIcon: '✉️',
                placeholderText: 'message agent',
                placeholderAlt: '相談を次の人へ届ける封筒の仮サムネイル',
                status: 'Seed',
                statusHint: '引き継ぎ型を設計中',
                text: '人の言葉、制作メモ、未整理の依頼を受け取り、次に動ける小さな手順へ翻訳するための伝令役エージェントの構想。',
                why: 'AI万屋の相談を、いきなり大きなシステムにせず、まず「何を預かり、誰へ渡すか」を整える相棒が必要だから。',
                origin: '相談をAIが抱え込むのではなく、人・ログ・地域の知恵へ渡す役割を先に分けるところから考えた。',
                surprise: 'エージェントを答える存在ではなく伝える存在として置くと、地域の知恵や制作メモが次の人へ巡りやすくなる。',
                nextStep: '相談メモを、困りごと・背景・次に聞くこと・渡す相手の型へ分ける。',
                cycle: {
                    question: '未整理の相談を、どうすれば次の一手へ渡せるか。',
                    experiment: '相談の本文を、困りごと、背景、追加で聞くこと、渡す相手の四つに分けて短い引き継ぎ文へ整える。',
                    finding: '伝令役は答えを独占せず、問いをほどいて人やResearch Logへ戻すことで、AI万屋の循環を助ける。'
                },
                tags: ['Agent', 'Magic Tool', 'AI万屋', 'Seed']
            },
            {
                lane: 'Research Log',
                type: 'Research Log',
                title: '情緒プロンプト実験ノート',
                placeholderIcon: '🧪',
                placeholderText: '問い → 実験 → 発見',
                placeholderAlt: '問いから実験と発見へ巡る Research Log の仮サムネイル',
                status: 'Seed',
                statusHint: '短いログを育成中',
                text: 'AIの返答を、ただ正しい説明ではなく「もう少し考えたくなる入口」に変えるための小さな記録。文章の温度、余白、問い返しを比べながら、葉桜ラボらしい対話の型を育てていきます。',
                why: 'Magic Toolsを道具単体で終わらせず、作る過程で見つけた驚きも同じ棚に残すための種。',
                surprise: '同じ情報でも、問いを先に置くだけで説明が「答え」から「続きを考える入口」に変わる。',
                nextStep: '同じ案内文を複数トーンで比べ、葉桜ラボらしい問い返しを1つ残す。',
                cycle: {
                    question: 'AIの答えに、読み手の気持ちが動く余白は作れるか。',
                    experiment: '同じ案内文を説明調、物語調、対話調に分けて、印象の差を比べる。',
                    finding: '情緒は装飾ではなく、問いの置き方と沈黙の残し方に宿る。'
                },
                tags: ['Research Log', 'Prompt', '理と情', 'Seed']
            },
            {
                lane: 'Story Seed',
                type: 'Knowledge Seed',
                title: '地域LLM 知恵棚（構想メモ）',
                placeholderIcon: '🗺️',
                placeholderText: 'local wisdom shelf',
                placeholderAlt: '地域の知恵を地図へ残す知恵棚の仮サムネイル',
                status: 'Seed',
                statusHint: '知恵棚の構想',
                text: '自分史、寺子屋、AI万屋の相談からこぼれた地域の言葉や手順を、次の問いへ返せる小さな知恵棚として残す構想。',
                why: '循環型CMSを「情報を保存する場所」ではなく、地域の言葉で返事を育てる器として考えるため。',
                surprise: '大きなモデルを先に作らなくても、預かった知恵を問い・背景・使いどころに分けるだけで、地域LLMの輪郭が見え始める。',
                nextStep: '預かった言葉を由来・場面・次に返す問いへ分け、Research Log に戻す。',
                returnLink: {
                    href: '#research-log-local-wisdom',
                    label: 'Research Log 004',
                    text: '知恵棚から問いへ戻す'
                },
                cycle: {
                    question: '地域の知恵を、どうすれば次の人の問いへ返せる形で残せるか。',
                    experiment: '預かった言葉を、由来、場面、次に使えそうな問いの三つに分けて短いカードへ整える。',
                    finding: '知恵棚は検索用データではなく、誰かの困りごとへ戻るための小さな橋として育てると読みやすい。'
                },
                tags: ['地域LLM', '循環型CMS', 'Story Seed', 'AI万屋']
            },
            {
                lane: 'Magic Tool',
                type: 'macOS App',
                title: 'Sakura Sky（実験作品）',
                placeholderIcon: '🌸',
                placeholderText: 'Sakura Sky（実験作品）',
                placeholderAlt: 'デスクトップに桜と葉桜の光を舞わせる Sakura Sky の仮サムネイル',
                href: 'downloads/SakuraSky.dmg',
                action: 'DMG',
                actionType: 'download',
                actionLabel: 'DL',
                actionHint: 'DMGを保存',
                download: true,
                text: 'デスクトップの上に、桜・葉桜・魔法の光がふわりと舞うmacOSアプリ。作業の邪魔をほんの少しだけする、葉桜ラボらしい実験的な遊び道具です。',
                why: '効率だけではない、少し余白のあるコンピュータ体験を試したくて作ったもの。',
                origin: '作業画面にも季節の気配を入れたら、効率とは別の使い心地を測れるのではないかという遊びから始まった。',
                surprise: '役に立たない揺らぎをあえて置くと、作業画面にも季節や気分の余白が生まれる。',
                nextStep: '署名や配布条件を整え、安心して試せる小さな案内へ分ける。',
                actionNote: {
                    label: '未署名版',
                    text: '環境によってはインストールや起動が止まったり、システムアラートが出る可能性があります。試す前に手元の設定とリスクを確認してください。'
                },
                tags: ['macOS 26+', 'Tauri|rust', '桜エフェクト', '未署名配布（公式審査する可能性もあり）']
            },
            {
                lane: 'Magic Tool',
                type: 'macOS App',
                title: 'Harunohi Monitor（仮）',
                placeholderIcon: '🌸',
                placeholderText: 'Harunohi Monitor（仮）',
                placeholderAlt: 'Macの状態を春の日の気配として眺める仮サムネイル',
                status: '開発中？',
                statusHint: 'Mac専用の試作中',
                text: 'ハルノヒのような、ポカポカした気分で動く常駐アプリ。少しだけ自分のMacのことを知るために、こういうの欲しいと作っております。できたら書きます。Mac専用。',
                why: '機械の状態を冷たい数値ではなく、暮らしの気配として受け取る形を探っているもの。',
                origin: 'CPUやメモリを監視する前に、Macが今どんな調子に見えるかを柔らかく受け取る入口がほしかった。',
                surprise: '監視ツールも、温度や余裕を感じる言葉に置き換えると、Macとの付き合い方まで少し変わる。',
                nextStep: 'CPUやメモリの数値を、疲れ・余白・休憩の言葉へ翻訳する試作を置く。',
                tags: ['macOS 26+', 'Swift?', '開発中']
            },
            {
                lane: 'Story Seed',
                type: '祝アニメ化？',
                title: 'オリジナルアニメ映画',
                image: './img/project_anime.png',
                alt: '夜明けの湖畔に桜と光が浮かぶ、オリジナルアニメ映画「葉桜」の構想ビジュアル',
                status: 'Concept',
                statusHint: '物語の棚で温め中',
                text: 'オリジナルアニメ映画「葉桜」。思いの中では、アニメ化してます。思いだけです。',
                why: '葉桜ラボの思想を、説明ではなく物語と風景で伝える入口として温めている構想。',
                surprise: 'まだ形のない構想でも、カードとして置くと次の制作やResearch Logへ戻る種になる。',
                nextStep: '風景から生まれる問いを、1シーンずつ Research Log へ戻す。',
                returnLink: {
                    href: '#research-log-hazakura-anime',
                    label: 'Research Log 005',
                    text: '物語の棚から問いへ戻す'
                },
                tags: ['アニメ']
            }
        ]
    }
};
