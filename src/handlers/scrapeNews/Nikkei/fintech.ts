// 日本経済新聞 金融 フィンテック

import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://www.nikkei.com/financial/fintech/';

export const scrapeFintech = async () => {
  await scrape(url, NewsGenre.ECONOMY);
};
