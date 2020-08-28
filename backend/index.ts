import { ApolloServer } from "apollo-server";
import * as statsModel from "./models/stats";
import * as newsModel from "./models/news";
import { resolvers } from "./resolvers";
import { schema } from "./schema";

export interface Context {
  models: {
    stats: typeof statsModel;
    news: typeof newsModel;
  };
}

const context: Context = {
  models: {
    stats: statsModel,
    news: newsModel
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context
});

server.listen().then(({ url }) => {
  console.log(`Serving at ${url}`);
});