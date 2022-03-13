// 読売新聞オンライン 政治
// https://www.yomiuri.co.jp/politics/

// TODO: 鍵付き除外

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
      const getArticleCreatedAt = async (): Promise<Date | void> => {
        const dateElem = await item.$('div.c-list-date time');
        if (dateElem) {
          try {
            const dateStr = await (
              await dateElem.getProperty('dateTime')
            ).jsonValue();
            if (typeof dateStr === 'string') {
              const _articleCreatedAt = new Date(dateStr);
              return _articleCreatedAt;
            }
          } catch (e) {
            console.log(e);
          }
        }
      };

      const getTitle = async (): Promise<string | void> => {
        const titleElem = await item.$('h3.c-list-title a');
        if (titleElem) {
          try {
            const title = await (
              await titleElem.getProperty('textContent')
            ).jsonValue();

            if (typeof title === 'string') {
              return title;
            }
          } catch (e) {
            console.log(e);
          }
        }
      };

      const getLink = async (): Promise<string | void> => {
        const linkElem = await item.$('h3.c-list-title a');
        if (linkElem) {
          try {
            const link = await (await linkElem.getProperty('href')).jsonValue();

            if (typeof link === 'string') {
              return link;
            }
          } catch (e) {
            console.log(e);
          }
        }
      };

      const getImage = async (): Promise<string | void> => {
        const imageElem = await item.$('div.c-list-thumb img');
        if (imageElem) {
          try {
            const image = await (
              await imageElem.getProperty('currentSrc')
            ).jsonValue();

            if (typeof image === 'string') {
              return image;
            }
          } catch (e) {
            console.log(e);
          }
        }
      };

      const [articleCreatedAt, title, link, image] = await Promise.all([
        getArticleCreatedAt(),
        getTitle(),
        getLink(),
        getImage(),
      ]);

      if (typeof title! === 'string' && link!) {
        const d = {
          title,
          link,
          image: image ?? undefined,
          articleCreatedAt: articleCreatedAt ?? undefined,
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
