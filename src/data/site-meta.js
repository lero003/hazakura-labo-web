export const siteMeta = {
  title: '葉桜ラボ — AIと、語ろう。自然と、遊ぼう。',
  description: 'AIと、語ろう。自然と、遊ぼう。——変化を楽しむ研究所、葉桜ラボへようこそ。',
  siteUrl: 'https://hazakura-labo-web.pages.dev/',
  imagePath: '/img/hero.png',
  imageAlt: '満開を過ぎた桜の木の下で、少女がAIの光と対話している葉桜ラボのメインビジュアル',
  ogType: 'website',
  twitterCard: 'summary_large_image'
};

export const siteSocialImageUrl = new URL(siteMeta.imagePath, siteMeta.siteUrl).toString();
