import React, { SyntheticEvent } from "react";
import { Query } from "react-apollo";
import { GetAllQuery } from "./queries/GetAllQuery";
import "./CharacterList.css";

interface Props {
  
}

export interface Stats {
  total_cases: number;
  date: number;
}

export interface News {
  notes: string;
}

interface Data {
  getStats: Stats;
  getNews: News;
}

const DataList: React.FC<Props> = () => {
  return (
    <div className="CharacterList">
      <h2>NY Covid Data</h2>
      <Query<Data> query={GetAllQuery}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..." as Element;
          if (error || !data) return `Error!`;

          return (
            <ul>
              
            </ul>
          );
        }}
      </Query>
    </div>
  );
};

export default DataList;