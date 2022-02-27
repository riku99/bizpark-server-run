import { scrapeKeizai } from './keizai';
import { scrapeKeizaiKinyu } from './keizai-kinyu';
import { scrapeSeiji } from './seiji';
import { scrapeStartups } from './startups';
import { scrapeInternet } from './internet';
import { scrapeServices } from './services';
import { scrapeMonetary } from './monetary';
import { scrapeFintech } from './fintech';
import { scrapeDriverless } from './driverless';
import { scrapeAI } from './ai';

// Promise.allだとブラウザの関係(?)でエラー出る時あるので順に実行
const main = async () => {
  await scrapeKeizaiKinyu();
  await scrapeKeizai();
  await scrapeStartups();
  await scrapeSeiji();
  await scrapeInternet();
  await scrapeServices();
  await scrapeMonetary();
  await scrapeFintech();
  await scrapeDriverless();
  await scrapeAI();
};

main();
