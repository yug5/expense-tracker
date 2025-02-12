import React from "react";
import BarGraph from "./charts/barGraph";
import PieChart from "./charts/pieChart";
export default function Graph() {
  return (
    <div className="overflow-auto h-auto w-full md:w-[40rem] shadow-sm rounded-lg hover:shadow-md">
      <div className="m-14 hover:shadow-xl transition-all duration-75">
        <PieChart />
      </div>
      <div className="m-14 hover:shadow-xl transition-all duration-75">
        <BarGraph />
      </div>
    </div>
  );
}
