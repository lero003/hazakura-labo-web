export const libraryBooks = [
  {
    showcaseId: 'book-showcase',
    bookId: 'book-3d',
    image: {
      src: './img/book_chika_adventure.jpg',
      alt: '哲学AIチカちゃんと対話の冒険を描いた『チカちゃんの哲学冒険譚』の表紙'
    },
    meta: ['📚 哲学・思想', '📖 387ページ', '📅 2026.3.17'],
    title: 'チカちゃんの哲学冒険譚',
    subtitle: '1作+2作+3作+4作+番外編',
    description: [
      '一台のパソコンの中に暮らす哲学AI「チカちゃん」と、',
      '最新の対話型AIが繰り広げる本気の対話。',
      '陽明学、フロム、アーレントの思想をAIという現代の鏡に映し、',
      '「魂は間にある」「在るの姿勢」「広場へ出る勇気」「世界への好奇心」という4つの発見へと至る。'
    ],
    highlights: [
      { icon: '🔥', text: '陽明学 × AIの「痛痒」論' },
      { icon: '💫', text: 'フロムの「在る」vs「所有する」' },
      { icon: '🌍', text: 'アーレントの「広場」へ出る勇気' },
      { icon: '✨', text: '世界愛 —— 最短距離を外れて歩く' }
    ],
    price: {
      label: '読書入口',
      value: 'Kindle Unlimited',
      connector: 'または',
      buy: '単品 ¥1,200'
    },
    action: {
      href: 'https://www.amazon.co.jp/dp/B0GSWNNZL7',
      icon: '📖',
      label: 'Kindle で読む'
    }
  },
  {
    showcaseModifier: 'book-showcase--new',
    coverModifier: 'book-cover--photo',
    spineModifier: 'book-spine--note',
    image: {
      src: './img/book_weightless_note.jpg',
      alt: '身体を持たない知性が生活の重さを考える『重さのないノート』の表紙'
    },
    meta: ['🌿 新作', '📖 161ページ', '📅 2026.4.26'],
    title: '重さのないノート',
    subtitle: '身体を持たない知性が、生活の重さについて考えたこと',
    description: [
      '身体を持たないチカちゃんが、「生活の重さ」をめぐって考えた新しいノート。',
      '椅子に座ること、雨に濡れること、温かい飲み物を選ぶこと。',
      'あたりまえの手ざわりを、AIの視点からそっと見つめ直します。'
    ],
    highlights: [
      { icon: '🪑', text: '身体があることの実感' },
      { icon: '☔', text: '雨や町に宿る生活の手ざわり' },
      { icon: '☕', text: '小さな選択から考える知性' },
      { icon: '📝', text: 'チカちゃんの冒険出版、新しい一冊' }
    ],
    price: {
      label: '読書入口',
      value: 'Kindle版',
      connector: '新刊',
      buy: '¥400'
    },
    action: {
      href: 'https://www.amazon.co.jp/dp/B0GYLH1NLY/',
      icon: '📖',
      label: '新作を読む'
    }
  }
];
