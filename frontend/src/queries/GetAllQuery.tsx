
import gql from "graphql-tag";

export const GetAllQuery = gql`
  {
    getStats(state: "ny") {
      total_cases
      date
    },
    getNews(state: "NY") {
      notes
    }
  }
`;