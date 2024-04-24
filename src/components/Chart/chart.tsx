import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import fetchApi from "../Utils/fetchapi";

interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export default function Chart() {
  const [apiData, setApiData] = useState<StockData[]>([]);
  const SYMBOL = "AMZN";
  const LABEL_NAME = "AMAZON";

  useEffect(() => {
    fetchApi(SYMBOL).then((data: StockData[] = []) => {
      setApiData(data);
    });
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
