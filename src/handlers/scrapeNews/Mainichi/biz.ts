import { NewsGenre } from '@prisma/client';
import { scrape } from './scrape';

const url = 'https://mainichi.jp/enterprise/';

export const scrapeBiz = async () => {
  await scrape({ url, genre: NewsGenre.BUSINESS });
};
