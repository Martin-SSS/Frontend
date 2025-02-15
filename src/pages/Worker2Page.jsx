import React from "react";
import { Box, Typography } from "@mui/material";
import LineChart from "../components/LineChart";  // 引入 LineChart 组件

const Worker2Page = ({ workerName }) => {
  // 示例数据
  const data = {
    CPU: [
      { time: "2023-01", value: 40 },
      { time: "2023-02", value: 45 },
      { time: "2023-03", value: 50 },
    ],
    Disk: [
      { time: "2023-01", value: 100 },
      { time: "2023-02", value: 110 },
      { time: "2023-03", value: 120 },
    ],
    Net: [
      { time: "2023-01", value: 200 },
      { time: "2023-02", value: 220 },
      { time: "2023-03", value: 230 },
    ],
    Mem: [
      { time: "2023-01", value: 8 },
      { time: "2023-02", value: 9 },
      { time: "2023-03", value: 10 },
    ],
  };

  return (
    <Box p="20px">
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {workerName} Performance Overview
      </Typography>

      {/* CPU Line Chart */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold">
          CPU Usage
        </Typography>
        <LineChart data={data.CPU} />
      </Box>

      {/* Disk Line Chart */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold">
          Disk Usage
        </Typography>
        <LineChart data={data.Disk} />
      </Box>

      {/* Net Line Chart */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold">
          Network Speed
        </Typography>
        <LineChart data={data.Net} />
      </Box>

      {/* Memory Line Chart */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold">
          Memory Usage
        </Typography>
        <LineChart data={data.Mem} />
      </Box>
    </Box>
  );
};

export default Worker2Page;
