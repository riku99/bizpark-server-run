// 日本経済　ビジネス　サービス、食品

import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://www.nikkei.com/business/services/';

export const scrapeServices = async () => {
  await scrape(url, NewsGenre.BUSINESS);
};
