import puppeteer from 'puppeteer';
import { prisma } from '../../../lib/prisma';
import { newsProvider } from '../../../constants';
import { parse } from 'date-fns';
import { NewsGenre } from '@prisma/client';

export const scrape = async ({
  url,
  genre,
}: {
  url: string;
  genre: NewsGenre;
}) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  const page = await browser.newPage();
  await page.goto(url);

  const topLinkSelector = 'div.CategoryTopPhoto a';
  const topLinkElem = await page.waitForSelector(topLinkSelector);

  if (topLinkElem) {
    await topLinkElem.click();
    await page.waitForNavigation();

    let articleCreatedAt: Date | undefined;
    let title: string | undefined;
    let image: string | undefined;

    const dateElem = await page.$('p.ArticleTitleData');
    if (dateElem) {
      const dateStr = await (
        await dateElem.getProperty('textContent')
      ).jsonValue();

      if (typeof dateStr === 'string') {
        articleCreatedAt = parse(dateStr, 'yyyy年MM月dd日HH時mm分', new Date());
      }
    }

    const titleElem = await page.$('div.ArticleTitle h1');
    if (titleElem) {
      const titleStr = await (
        await titleElem.getProperty('textContent')
      ).jsonValue();

      if (typeof titleStr === 'string') {
        title = titleStr;
      }
    }

    const imageElem = await page.$('div.ArticleFigureWrapper img');
    if (imageElem) {
      const imageUrl = await (
        await imageElem.getProperty('currentSrc')
      ).jsonValue();

      if (typeof imageUrl === 'string') {
        image = imageUrl;
      }
    }

    const link = page.url();

    if (title && link) {
      try {
        await prisma.news.create({
          data: {
            title,
            link,
            articleCreatedAt,
            provider: newsProvider.jiji,
            image,
            genre,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  await browser.close();
};
