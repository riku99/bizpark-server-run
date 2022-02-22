// 読売新聞オンライン 政治
// https://www.yomiuri.co.jp/politics/

import puppeteer from 'puppeteer';
import { prisma } from '../../../lib/prisma';
import { NewsGenre } from '../../../generated/graphql';
import { newsProvider } from '../../../constants';
import { Prisma } from '@prisma/client';

const main = async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto('https://www.yomiuri.co.jp/');

  const seijiButton = await page.$x(
    '/html/body/div[5]/div[1]/div[1]/ul/li[3]/a'
  );
  await seijiButton[0].click();

  const firstSectionPath = '/html/body/div[7]/div[1]/div[1]/section/ul';
  const sectionElem = await page.waitForXPath(firstSectionPath);

  const data: Prisma.NewsCreateInput[] = [];

  if (sectionElem) {
    const listSelector = 'li.p-list-item ';

    await sectionElem.waitForSelector(listSelector);

    const items = await sectionElem.$$(listSelector);

    for (const item of items) {
      let articleCreatedAt: Date | undefined;
      const dateElem = await item.$('div.c-list-date time');
      if (dateElem) {
        try {
          const dateStr = await (
            await dateElem.getProperty('dateTime')
          ).jsonValue();
          if (typeof dateStr === 'string') {
            articleCreatedAt = new Date(dateStr);
          }
        } catch (e) {
          console.log(e);
        }
      }

      let title: string;
      const titleElem = await item.$('h3.c-list-title a');
      if (titleElem) {
        try {
          title = await (
            await titleElem.getProperty('textContent')
          ).jsonValue();
        } catch (e) {
          console.log(e);
        }
      }

      let link: string;
      const linkElem = await item.$('h3.c-list-title a');
      if (linkElem) {
        try {
          link = await (await linkElem.getProperty('href')).jsonValue();
        } catch (e) {
          console.log(e);
        }
      }

      let image: string | undefined;
      const imageElem = await item.$('div.c-list-thumb img');
      if (imageElem) {
        try {
          image = await (await imageElem.getProperty('currentSrc')).jsonValue();
        } catch (e) {
          console.log(e);
        }
      }

      if (typeof title! === 'string' && link!) {
        const d = {
          title,
          link,
          image,
          articleCreatedAt,
          genre: NewsGenre.Politics,
          provider: newsProvider.yomiuri,
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
  }

  await browser.close();
};

main();
