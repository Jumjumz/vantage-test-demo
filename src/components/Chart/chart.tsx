import { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export default function Chart() {
  const [apiData, setApiData] = useState<StockData[]>([]);
  const VITE_API_KEY: string = import.meta.env.VITE_VANTAGE_KEY;
  const SYMBOL = "AMZN";
  const LABEL_NAME = "AMAZON";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${VITE_API_KEY}`
        );
        const dailyData = res.data["Time Series (Daily)"];
        const formattedData: StockData[] = [];
        for (let date in dailyData) {
          formattedData.push({
            date,
            open: parseFloat(dailyData[date]["1. open"]),
            high: parseFloat(dailyData[date]["2. high"]),
            low: parseFloat(dailyData[date]["3. low"]),
            close: parseFloat(dailyData[date]["4. close"]),
          });
          setApiData(formattedData);
        }
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };

    fetchData();
    console.log(apiData);
  }, []);
  return (
    <>
      <div className=" bg-slate-300 rounded-2xl overflow-clip">
        <h1 className=" font-sans text-2xl m-0 text-center bg-white pt-10">
          Stock Market Data for{" "}
          <em className=" not-italic font-bold">{LABEL_NAME}</em>
        </h1>
        {apiData.length > 0 && (
          <Plot
            data={[
              {
                x: apiData.map((data) => data.date),
                y: apiData.map((data) => data.open),
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
                name: "Open Price",
              },

              {
                x: apiData.map((data) => data.date),
                y: apiData.map((data) => data.high),
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "blue" },
                name: "High Price",
              },

              {
                x: apiData.map((data) => data.date),
                y: apiData.map((data) => data.low),
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "green" },
                name: "Low Price",
              },

              {
                x: apiData.map((data) => data.date),
                y: apiData.map((data) => data.close),
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "black" },
                name: "Close Price",
              },
            ]}
            layout={{ width: 800, height: 500 }}
          />
        )}
      </div>
    </>
  );
}
