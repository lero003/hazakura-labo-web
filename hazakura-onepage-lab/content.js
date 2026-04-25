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
            text: 'RFPの核にある「移ろい」「習合」「循環」を、スクロールで少しずつ体験へ変えていく層。'
        },
        {
            label: 'Works',
            title: '成果に触れる',
            text: '本、ツール、アプリ、実験作品を、単なる一覧ではなく制作動機と発見のログとして蓄積する層。'
        },
        {
            label: 'Motion',
            title: '空気が変わる',
            text: '昼、夕、夜、月、オーロラへ移ろう演出を、セクションやコンテンツ追加に追従できる層。'
        },
        {
            label: 'Community',
            title: '問いを預ける',
            text: 'AI寺子屋、自分史、AI万屋へつながる入口を、将来的にフォームやCMSへ接続する層。'
        }
    ],
    stats: [
        { target: 380, suffix: '+', label: 'ページの哲学', sub: '哲学冒険譚に詰め込まれた知恵' },
        { target: 4, suffix: '', label: '作+番外編', sub: '1作〜4作＋番外編の総集編' },
        { target: 365, suffix: '', label: '日の問い', sub: '1年、めくるめく探求の末' },
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
            text: '子どものためのコーチング学習と、シニアの「逆転の知恵」体験。世代を越えて知恵が巡る、未来の学び舎。'
        },
        {
            icon: '📜',
            title: '自分史編纂',
            jp: '物語を紡ぐ',
            text: '人々の思い出を物語として紡ぎ、デジタルアーカイブ化。あなたの記憶が、次の世代への贈り物になる。'
        }
    ],
    projects: [
        {
            type: 'Web Tool',
            title: 'Kindle EPUB Studio',
            image: './img/project-kindle-epub.png',
            alt: 'Kindle EPUB Studio のスクリーンショット',
            href: 'https://kindle-epub-tool.pages.dev',
            action: 'Live',
            actionType: 'external',
            actionLabel: '外部',
            text: 'MarkdownからプロフェッショナルなKindle EPUBをブラウザ完結で生成するツール。ローカル処理、自動目次生成、GFMテーブル対応。',
            why: 'Kindle公開作業を、誰かのサーバーに預けず自分の手元で完結させたくて作ったもの。',
            tags: ['Markdown', 'EPUB', 'Kindle', 'クライアントサイド']
        },
        {
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
            type: '祝アニメ化？',
            title: 'オリジナルアニメ映画',
            image: './img/project_anime.png',
            alt: 'プロジェクトAnimeのスクリーンショット',
            status: 'Concept',
            text: 'オリジナルアニメ映画「葉桜」。思いの中では、アニメ化してます。思いだけです。',
            why: '葉桜ラボの思想を、説明ではなく物語と風景で伝える入口として温めている構想。',
            tags: ['アニメ']
        }
    ]
};
