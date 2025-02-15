import { Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SignupDialog from "../../../dialogs/SignupDialog";
import LoginDialog from "../../../dialogs/LoginDialog";
import LogoutDialog from "../../../dialogs/LogoutDialog";

// Sidebar Item组件
const SidebarItem = ({ title, path, icon, selected, setSelected, onClick }) => (
  <Link
    to={path}
    style={{ textDecoration: "none" }}
    onClick={(e) => {
      if (onClick) {
        e.preventDefault(); // 阻止跳转
        onClick(); // 触发自定义点击事件
      } else {
        setSelected(path); // 正常设置选中状态
      }
    }}
  >
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      p="15px 20px"
      bgcolor={selected === path ? "#6870fa" : "transparent"}
      borderRadius="8px"
      sx={{
        "&:hover": {
          bgcolor: "#c3c6fd",
          cursor: "pointer",
        },
      }}
    >
      <IconButton sx={{ color: "#ffffff" }}>{icon}</IconButton>
      <Typography variant="h5" fontWeight="bold" color="#ffffff">
        {title}
      </Typography>
    </Box>
  </Link>
);


// Worker项组件
const WorkerItem = ({ workerName, pathPrefix, selected, setSelected }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 控制展开/收起状态

  return (
    <Box>
      {/* 顶级 Worker 项 */}
      <Link to={pathPrefix} style={{ textDecoration: "none" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p="15px 20px"
          borderRadius="8px"
          sx={{
            "&:hover": {
              bgcolor: "#c3c6fd",
              cursor: "pointer",
            },
          }}
          onClick={() => setSelected(pathPrefix)}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton sx={{ color: "#ffffff" }}>
              <ComputerOutlinedIcon />
            </IconButton>
            <Typography variant="h5" fontWeight="bold" color="#ffffff">
              {workerName}
            </Typography>
          </Box>
          <IconButton
            onClick={(e) => {
              e.preventDefault(); // 防止跳转时同时触发展开
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ExpandLessIcon sx={{ color: "#ffffff" }} />
            ) : (
              <ExpandMoreIcon sx={{ color: "#ffffff" }} />
            )}
          </IconButton>
        </Box>
      </Link>

      {/* 子菜单 */}
      {isExpanded && (
        <Box pl="40px" mt="10px">
          <SidebarItem
            title="Terminal Output"
            path={`${pathPrefix}/terminal`}
            icon={<DashboardOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Prediction"
            path={`${pathPrefix}/prediction`}
            icon={<DashboardOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Task Allocation"
            path={`${pathPrefix}/task-allocation`}
            icon={<DashboardOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Upload Python File"
            path={`${pathPrefix}/upload-file`}
            icon={<DashboardOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      )}
    </Box>
  );
};

// Sidebar组件
const SideBar = () => {
  const [selected, setSelected] = useState("/");
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "300px",
        bgcolor: "#1f2937",
        color: "#ffffff",
        display: "flex",
        flexDirection:"column",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      {/* Logo and Title */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold" color="#ffffff" mb="30px">
          Monitor Dashboard
        </Typography>

        {/* Sidebar Items */}
        <SidebarItem
          title="Overview"
          path="/"
          icon={<DashboardOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <WorkerItem
          workerName="Worker 1"
          pathPrefix="/worker1"
          selected={selected}
          setSelected={setSelected}
        />
        <WorkerItem
          workerName="Worker 2"
          pathPrefix="/worker2"
          selected={selected}
          setSelected={setSelected}
        />
        <WorkerItem
          workerName="Worker 3"
          pathPrefix="/worker3"
          selected={selected}
          setSelected={setSelected}
        />
        <WorkerItem
          workerName="Worker 4"
          pathPrefix="/worker4"
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Setting"
          path="/settings"
          icon={<SettingsOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Box>

      {/* Footer Links */}
      <Box>
        <SidebarItem
          title="Signup"
          icon={<PersonAddOutlinedIcon />}
          onClick={() => setSignupOpen(true)} // 显示 Signup 弹窗
        />
        <SidebarItem
          title="Login"
          icon={<LoginOutlinedIcon />}
          onClick={() => setLoginOpen(true)} // 显示 Login 弹窗
        />
        <SidebarItem
          title="Logout"
          icon={<LogoutOutlinedIcon />}
          onClick={() => setLogoutOpen(true)} // 显示 Logout 弹窗
        />
      </Box>

      {/* 弹窗组件 */}
      <SignupDialog open={signupOpen} handleClose={() => setSignupOpen(false)} />
      <LoginDialog open={loginOpen} handleClose={() => setLoginOpen(false)} />
      <LogoutDialog open={logoutOpen} handleClose={() => setLogoutOpen(false)} />
    </Box>
  );
};

export default SideBar;
