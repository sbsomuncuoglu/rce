import React, { SyntheticEvent, Component } from "react";
import { Query } from "react-apollo";
import { GetAllQuery } from "./queries/GetAllQuery";
import "./DataList.css";

interface DataState {
 
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

const DataList = () => {

  let displayData: JSX.Element[] = [];

  let getInitialState = function() {
    var initialDisplayData = localStorage.getItem( 'displayData' ) || [];

    return initialDisplayData;
  }

  let persistData = function(_data: any) {
      localStorage.setItem( 'displayData', _data );
  }

  return (
    <div className="DataList">
      <h2>NY Covid Data</h2>

      <button onClick={() => {
         displayData.push(
          <p>
            <b>Total Cases:</b>
            <br></br>
            <b>Date:</b> 
            <br></br>
            <b>News:</b>
          </p>);
        }}>
        Update
      </button>

      <Query<Data> query={GetAllQuery}>
        {({ loading, error, data }) => {
          if (loading) return (<div>Loading...</div>);
          if (error || !data) return (<div>Error...</div>);

          console.log(displayData);

          {
            displayData.push(
              <p>
                <b>Total Cases:</b> {data.getStats.total_cases  }
                <br></br>
                <b>Date:</b> {data.getStats.date  }
                <br></br>
                <b>News:</b> {data.getNews.notes  }
              </p>
            )
          };

          return (
            <div id="display-data-container">
              {displayData}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default DataList;