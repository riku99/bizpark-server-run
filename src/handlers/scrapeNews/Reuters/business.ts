import { NewsGenre } from '@prisma/client';
import { scrape } from './scrape';

const url = 'https://jp.reuters.com/news/business';

export const scrapeBusiness = async () => {
  await scrape(url, NewsGenre.BUSINESS);
};

scrapeBusiness();
