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
            text: 'RFPの核にある「移ろい」「習合」「循環」を、スクロールで少しずつ体験へ変えていく層。'
        },
        {
            label: 'Works',
            title: '成果に触れる',
            cadence: '制作物と発見を足す',
            text: '本、ツール、アプリ、実験作品を、単なる一覧ではなく制作動機と発見のログとして蓄積する層。'
        },
        {
            label: 'Motion',
            title: '空気が変わる',
            cadence: '読みに沿って移ろう',
            text: '昼、夕、夜、月、オーロラへ移ろう演出を、セクションやコンテンツ追加に追従できる層。'
        },
        {
            label: 'Community',
            title: '問いを預ける',
            cadence: '知恵を入口へ戻す',
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
            title: '問い、記憶、古い道具を預ける入口',
            text: '将来のフォームでは、ただ送信欄を置くのではなく、地域の知恵が循環しやすい三つの預け方として受け取ります。',
            kinds: [
                {
                    kind: 'question',
                    label: '問い',
                    text: '学び直したいことや、誰かと考えたいテーマ。',
                    flow: 'Research Logへ移し、小さな実験の種にする。',
                    target: 'AI寺子屋'
                },
                {
                    kind: 'memory',
                    label: '記憶',
                    text: '残しておきたい風景、仕事、声、暮らしの手ざわり。',
                    flow: '自分史の断片として、次の世代へ渡せる形に整える。',
                    target: '自分史編纂'
                },
                {
                    kind: 'object',
                    label: '古い道具',
                    text: 'AIともう一度めぐらせたいラジオ、写真、ガジェット。',
                    flow: '持ち主の物語と一緒に、再生ワークショップへつなぐ。',
                    target: 'レトロ・ガジェット再生'
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
                    prompt: 'いま誰かに教えたいこと、もう一度学びたいことは何ですか？'
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
                    prompt: 'いま誰かに残しておきたい風景、声、手ざわりは何ですか？'
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
                    prompt: 'もう一度声を聞きたいラジオ、写真、ガジェットはありますか？'
                },
                tag: 'Workshop seed'
            },
            {
                icon: '🗺️',
                title: '地域LLM',
                jp: '知恵を巡らせる',
                text: 'Research Logや自分史、寺子屋の問いを少しずつ蓄え、地域の言葉で答えを返す小さな知恵の循環炉。',
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
                surprise: '出版の工程は大きな仕組みでなくても、小さなブラウザ道具へ分解すると「自分で直せる知恵」になる。',
                tags: ['Markdown', 'EPUB', 'Kindle', 'クライアントサイド']
            },
            {
                lane: 'Magic Tool',
                type: 'Research Tool',
                title: 'arxiv_scout（試作メモ）',
                placeholderIcon: '🔍',
                placeholderText: 'arxiv scout',
                status: 'Seed',
                text: '未知の論文をただ集めるのではなく、問いの種、使えそうな概念、次に試す手順へ分けて読みほどくための小さな探索道具の構想。',
                why: 'AIの知性を、答えを出す機械ではなく「まだ知らない概念へ連れていく相棒」として扱いたくて置いた種。',
                surprise: '論文タイトルの一覧も、問いと実験の型に通すと、Research Logへ戻せる発見の入口になる。',
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
                status: 'Seed',
                text: '人の言葉、制作メモ、未整理の依頼を受け取り、次に動ける小さな手順へ翻訳するための伝令役エージェントの構想。',
                why: 'AI万屋の相談を、いきなり大きなシステムにせず、まず「何を預かり、誰へ渡すか」を整える相棒が必要だから。',
                surprise: 'エージェントを答える存在ではなく伝える存在として置くと、地域の知恵や制作メモが次の人へ巡りやすくなる。',
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
                status: 'Seed',
                text: 'AIの返答を、ただ正しい説明ではなく「もう少し考えたくなる入口」に変えるための小さな記録。文章の温度、余白、問い返しを比べながら、葉桜ラボらしい対話の型を育てていきます。',
                why: 'Magic Toolsを道具単体で終わらせず、作る過程で見つけた驚きも同じ棚に残すための種。',
                surprise: '同じ情報でも、問いを先に置くだけで説明が「答え」から「続きを考える入口」に変わる。',
                cycle: {
                    question: 'AIの答えに、読み手の気持ちが動く余白は作れるか。',
                    experiment: '同じ案内文を説明調、物語調、対話調に分けて、印象の差を比べる。',
                    finding: '情緒は装飾ではなく、問いの置き方と沈黙の残し方に宿る。'
                },
                tags: ['Research Log', 'Prompt', '理と情', 'Seed']
            },
            {
                lane: 'Magic Tool',
                type: 'macOS App',
                title: 'Sakura Sky（実験作品）',
                placeholderIcon: '🌸',
                placeholderText: 'Sakura Sky（実験作品）',
                href: 'downloads/SakuraSky.dmg',
                action: 'DMG',
                actionType: 'download',
                actionLabel: 'DL',
                actionHint: 'DMGを保存',
                download: true,
                text: 'デスクトップの上に、桜・葉桜・魔法の光がふわりと舞うmacOSアプリ。作業の邪魔をほんの少しだけする、葉桜ラボらしい実験的な遊び道具です。',
                why: '効率だけではない、少し余白のあるコンピュータ体験を試したくて作ったもの。',
                surprise: '役に立たない揺らぎをあえて置くと、作業画面にも季節や気分の余白が生まれる。',
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
                status: '開発中？',
                text: 'ハルノヒのような、ポカポカした気分で動く常駐アプリ。少しだけ自分のMacのことを知るために、こういうの欲しいと作っております。できたら書きます。Mac専用。',
                why: '機械の状態を冷たい数値ではなく、暮らしの気配として受け取る形を探っているもの。',
                surprise: '監視ツールも、温度や余裕を感じる言葉に置き換えると、Macとの付き合い方まで少し変わる。',
                tags: ['macOS 26+', 'Swift?', '開発中']
            },
            {
                lane: 'Story Seed',
                type: '祝アニメ化？',
                title: 'オリジナルアニメ映画',
                image: './img/project_anime.png',
                alt: '夜明けの湖畔に桜と光が浮かぶ、オリジナルアニメ映画「葉桜」の構想ビジュアル',
                status: 'Concept',
                text: 'オリジナルアニメ映画「葉桜」。思いの中では、アニメ化してます。思いだけです。',
                why: '葉桜ラボの思想を、説明ではなく物語と風景で伝える入口として温めている構想。',
                surprise: 'まだ形のない構想でも、カードとして置くと次の制作やResearch Logへ戻る種になる。',
                tags: ['アニメ']
            }
        ]
    }
};
