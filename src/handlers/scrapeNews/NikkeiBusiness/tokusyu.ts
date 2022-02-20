// 日経ビジネス 特集
// https://business.nikkei.com/tag/?tag=C0490%E7%89%B9%E9%9B%86

import puppeteer from 'puppeteer';
import { prisma } from '../../../lib/prisma';
import { NewsGenre } from '../../../generated/graphql';
import { newsProvider } from '~/constants';

const main = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
  });

  const page = await browser.newPage();
  await page.goto('https://business.nikkei.com/');
  const elems = await page.$x('//*[@id="wrapper"]/div[2]/ul/li[1]/a');
  await elems[0].click();

  const listSelector = 'li.p-articleList_item';
  await page.waitForSelector(listSelector);

  const items = await page.$$(listSelector);

  const data: {
    title: string;
    link: string;
    image?: string;
    genre: NewsGenre;
    provider: string;
  }[] = [];

  for (const item of items) {
    let title: string;
    const titleElm = await item.$('h3.p-articleList_item_title');
    if (titleElm) {
      try {
        title = await (await titleElm.getProperty('textContent')).jsonValue();
      } catch (e) {
        console.log(e);
      }
    }

    let link: string;
    const linkElem = await item.$('a.p-articleList_item_link');
    if (linkElem) {
      try {
        link = await (await linkElem.getProperty('href')).jsonValue();
      } catch (e) {
        console.log(e);
      }
    }

    let image: string;
    const imageElm = await item.$('div.p-articleList_item_image img');
    if (imageElm) {
      try {
        image = await (await imageElm.getProperty('currentSrc')).jsonValue();
      } catch (e) {
        console.log(e);
      }
    }

    if (typeof title! === 'string' && link!) {
      const d = {
        title,
        link,
        image: image!,
        genre: NewsGenre.Business,
        provider: newsProvider.nikkeiBusiness,
      };

      data.unshift(d);
    }
  }

  try {
    await prisma.news.createMany({
      data,
      skipDuplicates: true,
    });
  } catch (e) {
    console.log(e);
  }

  await browser.close();
};

main();
