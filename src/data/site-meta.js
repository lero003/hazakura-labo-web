export const siteMeta = {
  title: '葉桜ラボ — AIと自然、思想と制作が循環する小さな実験庭園',
  description: '葉桜ラボは、AIと自然、思想と制作が循環する小さな実験庭園です。本、アプリ、Web、思索の断片をゆっくり育てています。',
  siteUrl: 'https://hazakura-labo-web.pages.dev/',
  imagePath: '/img/hero.png',
  imageAlt: '葉桜ラボ — AIと自然、思想と制作が循環する小さな実験庭園',
  ogType: 'website',
  twitterCard: 'summary_large_image'
};

export const siteSocialImageUrl = new URL(siteMeta.imagePath, siteMeta.siteUrl).toString();
