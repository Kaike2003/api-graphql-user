import { ApolloServer } from "apollo-server";
import { dataSources } from "./config/dataSource/dataSource";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { join } from "node:path";
import { formatError } from "./config/formatError/formatError";

const allTypeDefs = loadFilesSync(join(__dirname, "graphql", "**", "*.gql"));
const allResolvers = loadFilesSync(join(__dirname, "graphql", "**", "resolvers.ts"));

const typeDefs = mergeTypeDefs(allTypeDefs);
const resolvers = mergeResolvers(allResolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  formatError,
});

server
  .listen()
  .then(({ url }) => console.log(url))
  .catch((error) => console.log(error));
