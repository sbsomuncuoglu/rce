import gql from "graphql-tag";

export const schema = gql`
  type Query {
    getStats(state: String): Stats
    getNews(state: String): News
  }

  type Stats {
    total_cases: Int
    date: Int
  }

  type News {
    notes: String
  }
`;