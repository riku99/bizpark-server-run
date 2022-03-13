import { NewsGenre } from '@prisma/client';
import { scrape } from './scrape';

const url = 'https://mainichi.jp/stock/';

export const scrapeStock = async () => {
  await scrape({ url, genre: NewsGenre.ECONOMY });
};
