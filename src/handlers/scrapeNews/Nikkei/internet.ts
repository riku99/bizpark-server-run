// 日本経済新聞 ビジネス スタートアップ

import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://www.nikkei.com/business/internet/';

export const scrapeInternet = async () => {
  await scrape(url, NewsGenre.BUSINESS);
};
