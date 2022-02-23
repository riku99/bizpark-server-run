// 時事通信社　政治

import { NewsGenre } from '@prisma/client';
import { scrape } from './scrape';

const url = 'https://www.jiji.com/jc/c?g=pol';

export const scrapePol = async () => {
  await scrape({ url, genre: NewsGenre.POLITICS });
};
