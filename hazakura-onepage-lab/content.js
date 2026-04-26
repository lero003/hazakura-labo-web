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
    researchLogs: [
        {
            eyebrow: 'Research Log 001',
            title: 'AIの答えに、情緒は宿るのか',
            question: '正しさだけでなく、読み手の気持ちが少し動く返答はどう作れるのか。',
            experiment: 'RFPの「理と情の融合」を軸に、同じ案内文を説明調・物語調・対話調で書き分けて比べる。',
            finding: '情緒は飾りではなく、問いの置き方と余白の残し方から生まれる。葉桜ラボでは、答えより先に驚きの入口を置く。'
        }
    ],
    visions: [
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
        },
        {
            icon: '🏠',
            title: 'AI 寺子屋',
            jp: '道楽と循環',
            text: '子どもの学びを支え、シニアの経験を「教える側」の知恵として迎える、世代を越えた未来の学び舎。',
            entryQuestion: 'まず預けたい問い：いま誰かに教えたいこと、もう一度学びたいことは何ですか？'
        },
        {
            icon: '📜',
            title: '自分史編纂',
            jp: '物語を紡ぐ',
            text: '人々の思い出を物語として紡ぎ、デジタルアーカイブ化。あなたの記憶が、次の世代への贈り物になる。',
            entryQuestion: 'まず預けたい記憶：いま誰かに残しておきたい風景、声、手ざわりは何ですか？'
        },
        {
            icon: '🗺️',
            title: '地域LLM',
            jp: '知恵を巡らせる',
            text: 'Research Logや自分史、寺子屋の問いを少しずつ蓄え、地域の言葉で答えを返す小さな知恵の循環炉。',
            tag: 'CMS seed'
        },
        {
            icon: '📻',
            title: 'レトロ・ガジェット再生',
            jp: '古いモノに魂を宿す',
            text: '眠っているラジオや古い道具にAIの小さな対話を重ね、思い出と機能をもう一度めぐらせるワークショップの記録。',
            tag: 'Workshop seed'
        }
    ],
    cycleBridge: {
        eyebrow: 'Circulation note',
        title: '問いは記憶になり、また誰かの問いへ戻る。',
        text: 'Research Logに残した発見、自分史に預けた記憶、寺子屋で交わした学び。それらを地域LLMが少しずつ受け取り、次の人の言葉で返していく。葉桜ラボは、その巡りを一枚のページで育てる実験場です。'
    },
    projects: [
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
            text: 'MarkdownからプロフェッショナルなKindle EPUBをブラウザ完結で生成するツール。ローカル処理、自動目次生成、GFMテーブル対応。',
            why: 'Kindle公開作業を、誰かのサーバーに預けず自分の手元で完結させたくて作ったもの。',
            tags: ['Markdown', 'EPUB', 'Kindle', 'クライアントサイド']
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
            download: true,
            text: 'デスクトップの上に、桜・葉桜・魔法の光がふわりと舞うmacOSアプリ。作業の邪魔をほんの少しだけする、葉桜ラボらしい実験的な遊び道具です。未署名版です。環境によってはインストール・起動ができない場合や、システムアラートが出る可能性があります。自己責任で！',
            why: '効率だけではない、少し余白のあるコンピュータ体験を試したくて作ったもの。',
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
            tags: ['アニメ']
        }
    ]
};
