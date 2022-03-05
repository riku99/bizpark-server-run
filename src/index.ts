import express from 'express';
// import { server } from "./server";
import { graphqlUploadExpress } from 'graphql-upload';
import { firebaseInit } from './firebase';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';
import { context } from '~/context';
import { resolvers } from '~/resolvers';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { prisma } from '~/lib/prisma';
import { verifyIdToken } from '~/auth/verifyIdToken';
import { registerScrapeNews } from '~/controllers/scrapeNews';
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';

interface GoogleOIDCToken {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
}

const client = jwksClient({
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
});

function getKey(header: any, callback: any): void {
  client.getSigningKey(header.kid, (err: any, key: any) => {
    if (err !== null) return callback(err);
    const signingKey = key.publicKey ?? key.rsaPublicKey;
    callback(null, signingKey);
  });
}

async function verifyToken(token: string): Promise<GoogleOIDCToken> {
  return await new Promise((resolve, reject) => {
    // Notice here we're using the `getKey` function defined above
    jwt.verify(token, getKey, (err, decoded) => {
      if (err !== null) return reject(err);
      return resolve(decoded as GoogleOIDCToken);
    });
  });
}

const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const start = async () => {
  firebaseInit();

  const app = express();

  app.use(graphqlUploadExpress());

  const httpServer = createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    {
      schema: schemaWithResolvers,
      execute,
      subscribe,
      onConnect: async (connectionParams: any) => {
        let requestUser;
        const token = connectionParams.authToken?.replace(/^Bearer /, '');
        const session = await verifyIdToken(token);
        if (!session) {
          requestUser = null;
        } else {
          requestUser = await prisma.user.findUnique({
            where: {
              uid: session.uid,
            },
          });
        }
        return {
          prisma,
          requestUser,
        };
      },
    },
    {
      server: httpServer,
      path: '/graphql',
    }
  );

  const server = new ApolloServer({
    schema: schemaWithResolvers,
    context,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
  });

  app.get('/health', (_, res) => {
    console.log('Check health💉');
    res.send('ok');
  });

  app.get('/scheduler', async (req, res) => {
    console.log(req.headers);
    console.log('scheduler⏰');

    if (!req.headers.authorization) {
      return res.status(403).send('Not Include authorization');
    }

    if (req.headers['user-agent'] !== 'Google-Cloud-Scheduler') {
      return res.status(403).send('Invalid user agent');
    }

    try {
      const token = await verifyToken(req.headers.authorization.split(' ')[1]);

      console.log(token);

      if (token.iss !== 'https://accounts.google.com') {
        return res.status(403).send('Invalid issuer');
      }

      if (token.aud !== `https://${req.headers.host}/scheduler`) {
        return res.status(403).send('Invalid audience');
      }

      return res.send('scheduler ok');
    } catch (e) {
      console.log(e);
      return res.status(403).send('Invalid OIDC token');
    }
  });

  // registerScrapeNews(app);

  const port = process.env.PORT || 4000;

  httpServer.listen({ port }, () => {
    console.log('env is ' + process.env.NODE_ENV);
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

start().catch((e) => {
  console.log(e);
});
