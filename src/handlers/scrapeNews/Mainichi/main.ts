import { scrapePolicy } from './seiji';
import { scrapeStock } from './stock';
import { scrapeBiz } from './biz';

const main = async () => {
  await scrapePolicy();
  await scrapeStock();
  await scrapeBiz();
};

main();
