import { scrapeBusiness } from './business';
import { scrapeTechnology } from './technology';
import { scrapeGlobalEconomy } from './global-economy';
import { scrapePolitics } from './politics';
import { scrapeBitcoin } from './bitcoin';

const main = async () => {
  await scrapeBusiness();
  await scrapeTechnology();
  await scrapeGlobalEconomy();
  await scrapePolitics();
  await scrapeBitcoin();
};

main();
