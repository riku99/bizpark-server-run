// 日本経済新聞 テック AI

import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://www.nikkei.com/technology/ai/';

export const scrapeAI = async () => {
  await scrape(url, NewsGenre.TECHNOLOGY);
};
