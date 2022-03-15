import { Express } from 'express';
import { registerJiji } from './Jiji';
import { registerMainichi } from './Mainichi';
import { registerNikkei } from './Nikkei';
import { registerReuters } from './Reuters';

export const registerScrapeNews = (app: Express) => {
  registerJiji(app);
  registerMainichi(app);
  registerNikkei(app);
  registerReuters(app);
};
