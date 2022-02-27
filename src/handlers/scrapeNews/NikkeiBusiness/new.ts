// 日経ビジネス 新着
// https://business.nikkei.com/latest/
// 日付単位でセクションが更新されるのでその日の朝とかにフェッチするのがいいかも

import puppeteer from 'puppeteer';
import { prisma } from '../../../lib/prisma';
import { NewsGenre } from '../../../generated/graphql';
import { newsProvider } from '../../../constants';
import { parse } from 'date-fns';

const main = async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto('https://business.nikkei.com/');
  const newButton = await page.$x('//*[@id="wrapper"]/div[2]/ul/li[2]/a');
  await newButton[0].click();

  // 2022年02月18日（金）などのセクション別に別れておりその中の最新のセクションを取得
  const sectionPath = '//*[@id="main"]/article/div/section[1]';
  const sectionElem = await page.waitForXPath(sectionPath);

  if (sectionElem) {
    const dateSelector = 'h2.c-titleLvTwo';
    const dateElem = await sectionElem.waitForSelector(dateSelector);

    let articleCreatedAt: Date;
    if (dateElem) {
      const dateStr = await (
        await dateElem.getProperty('textContent')
      ).jsonValue();

      if (typeof dateStr === 'string') {
        const dateWithoutDay = dateStr.split('（')[0];
        articleCreatedAt = parse(dateWithoutDay, 'yyyy年MM月dd日', new Date());
      }
    }

    const listSelector = 'li.p-articleList_item';

    await sectionElem.waitForSelector(listSelector);

    const items = await sectionElem.$$(listSelector);

    const data: {
      title: string;
      link: string;
      image?: string;
      genre: NewsGenre;
      provider: string;
      articleCreatedAt?: Date;
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
          articleCreatedAt: articleCreatedAt!,
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
