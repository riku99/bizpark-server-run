import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://www.nikkei.com/politics/politics/';

export const scrapeSeiji = async () => {
  await scrape(url, NewsGenre.POLITICS);
};
