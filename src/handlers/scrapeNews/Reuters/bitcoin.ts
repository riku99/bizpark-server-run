import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://jp.reuters.com/news/technology/bitcoin';

export const scrapeBitcoin = async () => {
  await scrape(url, NewsGenre.ECONOMY, 'section');
};

scrapeBitcoin();
