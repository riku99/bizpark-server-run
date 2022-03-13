import { Express } from 'express';
import { scrapeJiji } from './Jiji';
import { scrapeMainichi } from './Mainichi';
import { scrapeNikkei } from './Nikkei';
import { scrapeReuters } from './Reuters';
import { SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT } from '~/constants';
import { verifyGcpOidcTokenForCloudScheduler } from '~/helpers/verifyGcpOidcTokenForCloudScheduler';

export const registerScrapeNews = (app: Express) => {
  app.get(`${SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT}`, async (req, res) => {
    try {
      const result = await verifyGcpOidcTokenForCloudScheduler(req, res);

      if (!result) {
        return;
      }

      await Promise.all([scrapeJiji(), scrapeMainichi()]);

      await Promise.all([scrapeNikkei(), scrapeReuters()]);

      res.send();
    } catch (e) {
      console.log('Scraping News Error');
      console.log(e);
    }
  });
};
