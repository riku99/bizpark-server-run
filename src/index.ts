import express from "express";
// import { server } from "./server";
import { graphqlUploadExpress } from "graphql-upload";
import { firebaseInit } from "./firebase";
import { ApolloServer } from "apollo-server-express";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { context } from "~/context";
import { resolvers } from "~/resolvers";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { createServer } from "http";
import { prisma } from "~/lib/prisma";

const schema = loadSchemaSync(join(__dirname, "../schema.graphql"), {
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
      onConnect: () => {
        return {
          prisma,
        };
      },
    },
    {
      server: httpServer,
      path: "/graphql",
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

  httpServer.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
};

start().catch((e) => {
  console.log(e);
});
