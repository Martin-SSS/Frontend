import React, { useState, useContext } from "react";
import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  Typography,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  NotificationsOutlined,
  SettingsOutlined,
  PersonOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { ColorModeContext } from "../../../theme";
import { ToggledContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import workerJson from "../../../worker_parameters_config.json"; 

const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { toggled, setToggled } = useContext(ToggledContext);
  const isXsDevices = window.innerWidth <= 600;

  const [searchTerm, setSearchTerm] = useState("");
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  // 获取所有 worker 名称
  const workerNameList = Object.values(workerJson?.workers_param_dict || {}).map(
    (info) => info.name
  );

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed === "") return;

    if (workerNameList.includes(trimmed)) {
      navigate(`/${trimmed}`);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{ display: `${isXsDevices ? "none" : "flex"}` }}
      >
        <Box
          display="flex"
          alignItems="center"
          bgcolor={theme.palette.primary[400]}
          borderRadius="3px"
        >
          <InputBase
            placeholder="Search"
            sx={{ ml: 2, flex: 1 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
            <SearchOutlined />
          </IconButton>
        </Box>
        {notFound && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 0.5, ml: 1 }}
          >
            Worker not found
          </Typography>
        )}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
