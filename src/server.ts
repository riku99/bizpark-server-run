import { ApolloServer } from "apollo-server-express";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { context } from "~/context";
import { resolvers } from "~/resolvers";

const schema = loadSchemaSync(join(__dirname, "../schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

export const server = new ApolloServer({
  schema: schemaWithResolvers,
  context,
});
