//　日本経済新聞 経済

import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://www.nikkei.com/economy/economic/';

export const scrapeKeizai = async () => {
  await scrape(url, NewsGenre.ECONOMY);
};
