import React, { SyntheticEvent, Component, useState } from "react";
import { Query, useQuery, useLazyQuery } from "react-apollo";
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

// type DataState = {
//   displayData: Data[];
// }

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

  const { loading, error, data } = useQuery(GetAllQuery);
  if(loading) {
    return (<div>Loading...</div>);
  }
  if(error || !data) {
    return (<div>Error...</div>);
  }
  displayData.push(data);

  const UpdateData = () => {
    const [lazy, {loading, data} ] = useLazyQuery(GetAllQuery);
    displayData.push(data);

    setDisplayData(displayData);
  }

  return (
    <div>
        <table>
            <tr>
              <th>Cases</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
            {displayData.map((r) => (
              
              <tr>
                <td>{r.getStats.total_cases}</td>
                <td>{r.getStats.date}</td>
                <td>{r.getNews.notes}</td>
              </tr>
            ))}
        </table>
        <button id="updateBtn" onClick={() => UpdateData()}>Update</button>
    </div>
  );
};

export default DataList;