import { Box, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState, useEffect } from "react";  // useEffect

// Worker 
const WorkerCard = ({ workerName, metrics }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      alignItems="center"
      bgcolor="#f4f4f8"
      p={2}
      borderRadius="8px"
      minWidth="250px"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Typography variant="h5" fontWeight="bold" color="#2b2b2b">
          <ComputerOutlinedIcon sx={{ mr: 1, fontSize: "32px" }} />
          {workerName}
        </Typography>
        <Box display="flex" gap={1}>
          <IconButton
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
              backgroundColor: isExpanded ? "#c3c6fd" : "#eaeaff",
              transition: "0.3s",
            }}
          >
            {isExpanded ? (
              <ExpandLessIcon fontSize="large" sx={{ color: "#6870fa" }} />
            ) : (
              <ExpandMoreIcon fontSize="large" sx={{ color: "#6870fa" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon fontSize="large" sx={{ color: "#4cceac" }} />
          </IconButton>
        </Box>
      </Box>

      {isExpanded && (
        <Box display="flex" flexDirection="column" gap={1} width="100%">
          {metrics.map((metric, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#eaeaff"
              p={1}
              borderRadius="4px"
              width="100%"
            >
              <Typography fontSize="18px" fontWeight="bold" color="#333">
                {metric.label}
              </Typography>
              <Typography fontSize="18px" fontWeight="bold" color="#666">
                {metric.value}
              </Typography>
              <IconButton size="small">
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

// Dashboard 
const Dashboard = () => {
  // store workers 
  const [workers, setWorkers] = useState([]);

  // use useEffect get JSON data
  useEffect(() => {
    fetch("worker_parameters_config.json")
      .then((res) => res.json())
      .then((data) => {
        const workersData = data.workers_param_dict;
        const workersList = [];
        for (const key in workersData) {
          if (Object.hasOwn(workersData, key)) {
            const workerInfo = workersData[key];
            // gain worker name
            const name = workerInfo.name || key;
            // gain data 
            const dataObj = workerInfo.setup?.data;
            const freq = dataObj?.FREQ ?? "N/A";
            const bw = dataObj?.BW ?? "N/A";
            const duration = dataObj?.data_DURATION ?? "N/A";
            // set metrics 
            const metrics = [
              { label: "CPU  (FREQ)", value: freq },
              { label: "BW", value: bw },
              { label: "data_DURATION", value: duration },
            ];
            workersList.push({ name: name, metrics: metrics });
          }
        }
        setWorkers(workersList);
      })
      .catch((error) => {
        console.error("load worker data fail:", error);
      });
  }, []);

  // workers 
  const half = Math.ceil(workers.length / 2);
  const leftWorkers = workers.slice(0, half);
  const rightWorkers = workers.slice(half);

  return (
    <Box display="flex" flexDirection="column" gap={3} p="20px">
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={2}
        color="#1f1f1f"
      >
        Monitor Dashboard
      </Typography>

      <Box display="flex" justifyContent="space-between" gap="20px">
        {/* left */}
        <Box flex={1} display="flex" flexDirection="column" gap={3}>
          {leftWorkers.map((worker) => (
            <WorkerCard
              key={worker.name}
              workerName={worker.name}
              metrics={worker.metrics}
            />
          ))}
        </Box>

        {/* right */}
        <Box flex={1} display="flex" flexDirection="column" gap={3}>
          {rightWorkers.map((worker) => (
            <WorkerCard
              key={worker.name}
              workerName={worker.name}
              metrics={worker.metrics}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
