// 時事通信社　政治

import { NewsGenre } from '@prisma/client';
import { scrape } from './scrape';

const url = 'https://www.jiji.com/jc/c?g=eco';

export const scrapeEco = async () => {
  await scrape({ url, genre: NewsGenre.ECONOMY });
};
