import { scrapeKeizai } from './keizai';
import { scrapeKeizaiKinyu } from './keizai-kinyu';

const main = async () => {
  await Promise.all([scrapeKeizaiKinyu(), scrapeKeizai()]);
};

main();
