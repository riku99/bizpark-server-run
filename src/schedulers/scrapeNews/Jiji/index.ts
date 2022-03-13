import { scrapeEco } from './eco';
import { scrapePol } from './pol';
import { Express } from 'express';
import { SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT } from '~/constants';
import { verifyGcpOidcTokenForCloudScheduler } from '~/helpers/verifyGcpOidcTokenForCloudScheduler';

// export const scrapeJiji = async () => {
//   await scrapePol();
//   await scrapeEco();
// };

export const registerJiji = (app: Express) => {
  app.get(`${SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT}/jiji`, async (req, res) => {
    const result = await verifyGcpOidcTokenForCloudScheduler(req, res);

    if (result) {
      await scrapePol();
      await scrapeEco();

      res.send();
    }
  });
};
