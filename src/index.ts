import express from "express";
import { server } from "./server";

const start = async () => {
  await server.start();

  const app = express();

  server.applyMiddleware({
    app,
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

start().catch((e) => {
  console.log(e);
});
