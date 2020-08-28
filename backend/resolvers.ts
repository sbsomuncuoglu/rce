import { Context } from "./";

type ResolverFn = (parent: any, args: any, ctx: Context) => any;

type ResolverMap = {
  [field: string]: ResolverFn;
}

type Resolvers = {
  Query: ResolverMap;
}

export const resolvers: Resolvers = {
  Query: {
    getStats: (root, args: { state: string }, ctx) => {
      return ctx.models.stats.getStats(args.state);
    },
    getNews: (root, args: { state: string }, ctx) => {
      return ctx.models.news.getNews(args.state);
    }
  }
}