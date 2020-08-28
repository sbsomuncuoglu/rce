import { Stats } from "../data/stats";
import axios from 'axios';

export const getStats = async (state: String): Promise<Stats> => {
  let statsData: Stats = {
    total_cases: -1,
    date: -1
  };

  try {
    let statsEndpoint: string = "https://api.covidtracking.com/v1/states/" + state + "/current.json?state=" + state;

    const apiStatsResult = await axios.get(statsEndpoint);
    let _total_cases: number = apiStatsResult.data.positive;
    let _date: number = apiStatsResult.data.date;

    statsData.total_cases = _total_cases;
    statsData.date = _date;

    return statsData;  
  } catch (error) {
    console.log(error);
    return statsData; 
  }
};