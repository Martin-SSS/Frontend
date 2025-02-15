import { Box, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState } from "react";

// Worker卡片组件
const WorkerCard = ({ workerName, metrics }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 控制展开/收起状态

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
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#2b2b2b"
        >
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

// Dashboard 页面
const Dashboard = () => (
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
      <Box flex={1} display="flex" flexDirection="column" gap={3}>
        <WorkerCard
          workerName="Worker 1"
          metrics={[
            { label: "CPU", value: "40%" },
            { label: "Disk", value: "50GB" },
            { label: "Net", value: "200mbps" },
            { label: "Mem", value: "8GB" },
          ]}
        />
        <WorkerCard
          workerName="Worker 3"
          metrics={[
            { label: "CPU", value: "35%" },
            { label: "Disk", value: "50GB" },
            { label: "Net", value: "200mbps" },
            { label: "Mem", value: "8GB" },
          ]}
        />
      </Box>

      <Box flex={1} display="flex" flexDirection="column" gap={3}>
        <WorkerCard
          workerName="Worker 2"
          metrics={[{ label: "CPU", value: "25%" },
            { label: "Disk", value: "50GB" },
            { label: "Net", value: "200mbps" },
            { label: "Mem", value: "8GB" },
          ]}
        />
        <WorkerCard
          workerName="Worker 4"
          metrics={[{ label: "CPU", value: "15%" },
            { label: "Disk", value: "50GB" },
            { label: "Net", value: "200mbps" },
            { label: "Mem", value: "8GB" },
          ]}
        />
      </Box>
    </Box>
  </Box>
);

export default Dashboard;
