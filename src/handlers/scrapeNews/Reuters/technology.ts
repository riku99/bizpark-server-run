import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://jp.reuters.com/news/technology';

export const scrapeTechnology = async () => {
  await scrape(url, NewsGenre.TECHNOLOGY);
};
