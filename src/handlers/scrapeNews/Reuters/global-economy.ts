import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://jp.reuters.com/news/global-economy';

export const scrapeGlobalEconomy = async () => {
  await scrape(url, NewsGenre.ECONOMY);
};
