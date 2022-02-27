import { scrapeEco } from './eco';
import { scrapePol } from './pol';

const main = async () => {
  await scrapePol();
  await scrapeEco();
};

main();
