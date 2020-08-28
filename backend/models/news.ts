import { News } from "../data/news";
import axios from 'axios';

export const getNews = async (state: String): Promise<News> => {
  let newsData: News = {
    notes: ""
  };

  try {
    let newsEndpoint: string = "https://api.covidtracking.com/v1/states/info.json";

    const apiNewsResult = await axios.get(newsEndpoint);

    let stateData: any = apiNewsResult.data.filter(function(item: any) {
      return item.state == state;
    });
    let _notes: string = stateData[0].notes;

    newsData.notes = _notes;

    return newsData;  
  } catch (error) {
    console.log(error);
    return newsData; 
  }
};