import { scrapeKeizai } from './keizai';
import { scrapeKeizaiKinyu } from './keizai-kinyu';
import { scrapeSeiji } from './seiji';
import { scrapeStartups } from './startups';
import { scrapeInternet } from './internet';
import { scrapeServices } from './services';
import { scrapeMonetary } from './monetary';
import { scrapeFintech } from './fintech';
import { scrapeDriverless } from './driverless';
import { scrapeAI } from './ai';
import { Express } from 'express';
import { SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT } from '~/constants';

export const registerNikkei = (app: Express) => {
  app.get(
    `${SCRAPING_NEWS_SCHEDULER_BASE_ENDPOINT}/nikkei`,
    async (req, res) => {
      // Promise.allだとブラウザの関係(?)でエラー出る時あるので順に実行
      await scrapeKeizaiKinyu();
      await scrapeKeizai();
      await scrapeStartups();
      await scrapeSeiji();
      await scrapeInternet();
      await scrapeServices();
      await scrapeMonetary();
      await scrapeFintech();
      await scrapeDriverless();
      await scrapeAI();

      res.send();
    }
  );
};
