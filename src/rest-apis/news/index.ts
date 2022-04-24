import { Express } from 'express';
import { NewsGenre } from '@prisma/client';
import { prisma } from '~/lib/prisma';

type NewsBody = {
  title: string;
  link: string;
  articleCreatedAt: Date | undefined;
  image: string | undefined;
  genre: NewsGenre;
};

export const registerNewsEndpoint = (app: Express) => {
  app.post('/news', async (req, res) => {
    const body = req.body as NewsBody;

    try {
      await prisma.news.createMany({
        data: [body],
        skipDuplicates: true,
      });

      res.sendStatus(200);
    } catch (e) {
      console.log('Error when saving news');
      console.log(e);
      res.sendStatus(500);
    }
  });
};
