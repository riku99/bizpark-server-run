import { scrapeEco } from './eco';
import { scrapePol } from './pol';
import { Express } from 'express';
import { SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT } from '~/constants';

export const registerJiji = (app: Express) => {
  app.get(`${SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT}/jiji`, async (req, res) => {
    await scrapePol();
    await scrapeEco();

    res.send();
  });
};
