import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import { firebaseInit } from './firebase';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';
import { context } from '~/context';
import { resolvers } from '~/resolvers';
import { createServer } from 'http';
import { registerAppStoreEvent } from '~/rest-apis/appStoreServerNotificatoin';
import { registerNewsEndpoint } from '~/rest-apis/news';

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
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema: schemaWithResolvers,
    context,
  });

  await server.start();

  server.applyMiddleware({
    app,
  });

  app.get('/health', (_, res) => {
    console.log('Check health💉');
    res.send('ok');
  });

  registerAppStoreEvent(app);
  registerNewsEndpoint(app);

  const port = process.env.PORT || 4000;

  httpServer.listen({ port }, () => {
    console.log('NODE_ENV is ' + process.env.NODE_ENV);
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

start().catch((e) => {
  console.log(e);
});
