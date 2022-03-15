import { scrapePolicy } from './seiji';
import { scrapeStock } from './stock';
import { scrapeBiz } from './biz';
import { SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT } from '~/constants';
import { Express } from 'express';
import { verifyGcpOidcTokenForCloudScheduler } from '~/helpers/verifyGcpOidcTokenForCloudScheduler';

// export const scrapeMainichi = async () => {
//   await scrapePolicy();
//   await scrapeStock();
//   await scrapeBiz();
// };

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
