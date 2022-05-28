import { Express } from 'express';
import { SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT } from '~/constants';
import { verifyGcpOidcTokenForCloudScheduler } from '~/helpers/verifyGcpOidcTokenForCloudScheduler';
import { scrapeBiz } from './biz';
import { scrapePolicy } from './seiji';
import { scrapeStock } from './stock';

export const registerMainichi = (app: Express) => {
  app.get(
    `${SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT}/mainichi`,
    async (req, res) => {
      const authResult = await verifyGcpOidcTokenForCloudScheduler(req, res);

      if (authResult) {
        await scrapePolicy();
        await scrapeStock();
        await scrapeBiz();

        res.send();
      }
    }
  );
};
