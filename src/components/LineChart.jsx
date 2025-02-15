import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineChart = ({ data }) => {
  const formattedData = [
    {
      id: "Value",
      data: data.map((d) => ({ x: d.time, y: d.value })),
    },
  ];

  return (
    <div style={{ height: "300px" }}>
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
        axisBottom={{
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: "Value",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointBorderWidth={2}
        useMesh={true}
        colors={{ scheme: "category10" }}
        
      />
    </div>
  );
};

export default LineChart;
