// import express from "express";
// import { server } from "./server";
// import { graphqlUploadExpress } from "graphql-upload";
// import { firebaseInit } from "./firebase";

// const start = async () => {
//   firebaseInit();

//   await server.start();

//   const app = express();

//   app.use(graphqlUploadExpress());

//   server.applyMiddleware({
//     app,
//   });

//   app.listen({ port: 4001 }, () =>
//     console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
//   );
// };

// start().catch((e) => {
//   console.log(e);
// });
