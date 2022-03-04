import { scrapeBusiness } from './business';
import { scrapeTechnology } from './technology';
import { scrapeGlobalEconomy } from './global-economy';
import { scrapePolitics } from './politics';
import { scrapeBitcoin } from './bitcoin';
import { Express } from 'express';
import { SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT } from '~/constants';

export const registerReuters = (app: Express) => {
  app.get(`${SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT}/jiji`, async (req, res) => {
    await scrapeBusiness();
    await scrapeTechnology();
    await scrapeGlobalEconomy();
    await scrapePolitics();
    await scrapeBitcoin();

    res.send();
  });
};
