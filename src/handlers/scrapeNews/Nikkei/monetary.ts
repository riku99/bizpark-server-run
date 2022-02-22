// 日本経済新聞 ビジネス　金融　金融機関

import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://www.nikkei.com/financial/monetary/';

export const scrapeMonetary = async () => {
  await scrape(url, NewsGenre.ECONOMY);
};
