import React, { useState, useCallback } from "react";
import { useQuery } from "react-apollo";
import { GetAllQuery } from "./queries/GetAllQuery";
import "./DataList.css";

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
  // let getInitialState = function() {
  //   var initialDisplayData = localStorage.getItem( 'displayData' ) || [];

  //   return initialDisplayData;
  // }

  // let persistData = function(_data: any) {
  //     localStorage.setItem( 'displayData', _data );
  // }

  let ddata : Data[] = [];
  const [displayData, setDisplayData] = useState(ddata);

  const { loading, error, data , fetchMore } = useQuery(GetAllQuery);

  const fetchReq = async () => {
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(fetchMoreResult);
        setDisplayData(oldArray => [...oldArray, fetchMoreResult]);
      }
    });
  }

  if(loading) {
    return (<div>Loading...</div>);
  }
  if(error || !data) {
    return (<div>Error...</div>);
  }
  if(displayData.length == 0) { // Initial load
    displayData.push(data);
  }

  return (
    <div>
        <table>
            <thead>
              <tr>
                <th> Cases</th>
                <th> Date </th>
                <th> Notes </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((r, i) => (
                <tr key={i}>
                  <td>{r.getStats.total_cases}</td>
                  <td>{r.getStats.date}</td>
                  <td>{r.getNews.notes}</td>
                </tr>
              ))}
            </tbody>
        </table>
        <button id="updateBtn" onClick={fetchReq}>Update</button>
    </div>
  );
};

export default DataList;