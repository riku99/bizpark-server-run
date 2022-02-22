// 日本経済新聞 テック　自動運転

import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://www.nikkei.com/technology/driverless/';

export const scrapeDriverless = async () => {
  await scrape(url, NewsGenre.TECHNOLOGY);
};
