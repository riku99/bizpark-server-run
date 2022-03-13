import { Express } from 'express';
import { registerJiji } from './Jiji';
import { registerMainichi } from './Mainichi';
import { scrapeNikkei } from './Nikkei';
import { scrapeReuters } from './Reuters';
import { SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT } from '~/constants';
import { verifyGcpOidcTokenForCloudScheduler } from '~/helpers/verifyGcpOidcTokenForCloudScheduler';

export const registerScrapeNews = (app: Express) => {
  registerJiji(app);
  registerMainichi(app);
  // app.get(`${SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT}`, async (req, res) => {
  //   try {
  //     const result = await verifyGcpOidcTokenForCloudScheduler(req, res);

  //     if (!result) {
  //       return;
  //     }

  //     await Promise.all([scrapeJiji(), scrapeMainichi()]);

  //     await Promise.all([scrapeNikkei(), scrapeReuters()]);

  //     res.send();
  //   } catch (e) {
  //     console.log('Scraping News Error');
  //     console.log(e);
  //   }
  // });
};
