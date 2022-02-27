//　日本経済新聞 経済 金融政策

import { scrape } from './scrape';
import { NewsGenre } from '@prisma/client';

const url = 'https://www.nikkei.com/financial/monetary-policy/';

export const scrapeKeizaiKinyu = async () => {
  await scrape(url, NewsGenre.ECONOMY);
};
