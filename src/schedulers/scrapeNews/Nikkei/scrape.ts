import puppeteer from 'puppeteer';
import { prisma } from '../../../lib/prisma';
import { newsProvider } from '../../../constants';
import { parse } from 'date-fns';
import { Prisma, NewsGenre } from '@prisma/client';

export const scrape = async (url: string, genre: NewsGenre) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  const data: Prisma.NewsCreateInput[] = [];

  const page = await browser.newPage();
  await page.goto(url);

  const linkSelector = 'h3.m-miM09_title a';

  for (let i = 0; i < 5; i++) {
    await page.waitForSelector(linkSelector);
    const links = await page.$$(linkSelector);

    if (links[i]) {
      // タイトルがViewに表示されてないとエラーになるのでスクロール
      await page.evaluate((element) => {
        element.scrollIntoView();
      }, links[i]);

      // サムネは一覧画面でしか表示されないのでここで取得
      let image: string | undefined;

      const imageElems = await page.$$('div.m-miM09_thumb img');

      if (imageElems[i]) {
        try {
          const _image = await (
            await imageElems[i].getProperty('currentSrc')
          ).jsonValue();

          if (typeof _image === 'string') {
            image = _image;
          }
        } catch (e) {
          console.log(e);
        }
      }
      //

      await links[i].click();
      await page.waitForNavigation();

      await page.waitForTimeout(500);
      const lockElem = await page.$('div.container_crh26hg');

      // 会員限定の記事でない場合のみ実行
      if (!lockElem) {
        const getArticleCreatedAt = async (): Promise<Date | void> => {
          const dateSelector = 'div.TimeStamp_t1ja1yd3 time';
          const dateElem = await page.waitForSelector(dateSelector);
          if (dateElem) {
            try {
              // dateTimeだと表示されている日付と違うのでtextContentで取得
              const dateStr = await (
                await dateElem.getProperty('textContent')
              ).jsonValue();

              if (typeof dateStr === 'string') {
                // dateStr は 2022年2月22日 14:43 こんな感じ
                const _date = parse(
                  dateStr,
                  'yyyy年MM月dd日 HH:mm',
                  new Date()
                );

                return _date;
              }
            } catch (e) {
              console.log(e);
            }
          }
        };

        const getTitle = async (): Promise<string | void> => {
          const titleElem = await page.waitForSelector('h1.title_tp0qjrp');
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

        const link = page.url();

        const [articleCreatedAt, title] = await Promise.all([
          getArticleCreatedAt(),
          getTitle(),
        ]);

        if (title && link) {
          const d = {
            title,
            link,
            image,
            articleCreatedAt: articleCreatedAt ?? undefined,
            genre,
            provider: newsProvider.nikkei,
          };

          data.unshift(d);
        }
      }

      await page.goBack();
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
