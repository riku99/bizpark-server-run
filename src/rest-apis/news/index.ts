import { Express } from 'express';
import { NewsGenre } from '@prisma/client';
import { prisma } from '~/lib/prisma';
import Crypto from 'crypto';

type NewsBody = {
  title: string;
  link: string;
  articleCreatedAt: Date | undefined;
  image: string | undefined;
  genre: NewsGenre;
};

export const registerNewsEndpoint = (app: Express) => {
  app.post('/news', async (req, res) => {
    const accessToken = req.headers.authorization?.replace(/^Bearer /, '');

    if (!accessToken) {
      res.status(403).send('Not Include authorization');
      return;
    }

    const hashedAccessToken = await prisma.newsEndpointAccessToken.findFirst();

    if (!hashedAccessToken) {
      const newHashedAccessToken = Crypto.createHash('sha256')
        .update(accessToken)
        .digest('hex');

      await prisma.newsEndpointAccessToken.create({
        data: {
          value: newHashedAccessToken,
        },
      });

      res.status(200).send();
      return;
    }

    const isValidAccessToken =
      hashedAccessToken.value ===
      Crypto.createHash('sha256').update(accessToken).digest('hex');

    if (!isValidAccessToken) {
      res.status(401).send('Invalid token');
      return;
    }

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
