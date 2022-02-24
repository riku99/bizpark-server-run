import { NewsGenre } from '@prisma/client';
import { scrape } from './scrape';

const url = 'https://mainichi.jp/seiji/';

export const scrapePolicy = async () => {
  await scrape({ url, genre: NewsGenre.POLITICS });
};
