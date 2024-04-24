import axios from "axios";

const VITE_API_KEY: string = import.meta.env.VITE_VANTAGE_KEY;

const fetchApi = async(symbol:string) => {
    const fetchData = async () => {
        try {
          const res = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${VITE_API_KEY}`
          );
          const dailyData = res.data["Time Series (Daily)"];
          const formattedData= [];
          for (let date in dailyData) {
            formattedData.push({
              date,
              open: parseFloat(dailyData[date]["1. open"]),
              high: parseFloat(dailyData[date]["2. high"]),
              low: parseFloat(dailyData[date]["3. low"]),
              close: parseFloat(dailyData[date]["4. close"]),
            });
          }
        return formattedData;
        } catch (error) {
          console.error("Error Fetching Data", error);
        }
      };
  
    return fetchData();
}

export default fetchApi;