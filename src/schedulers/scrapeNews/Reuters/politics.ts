import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://jp.reuters.com/news/politics';

export const scrapePolitics = async () => {
  await scrape(url, NewsGenre.POLITICS, 'section');
};
