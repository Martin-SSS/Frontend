import React, { useState } from "react";
import { Box, Typography, TextField, Button, Switch, FormControlLabel } from "@mui/material";

const SettingPage = () => {
  // 状态管理
  const [username, setUsername] = useState("User123");
  const [email, setEmail] = useState("user@example.com");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // 保存设置
  const handleSave = () => {
    alert("Settings saved successfully!");
    // 可在此添加保存逻辑，如发送 API 请求
  };

  return (
    <Box p="20px">
      {/* 页面标题 */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Settings
      </Typography>

      {/* 用户名设置 */}
      <Box mb={3}>
        <Typography variant="h6" mb={1}>
          Username
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>

      {/* 邮箱设置 */}
      <Box mb={3}>
        <Typography variant="h6" mb={1}>
          Email
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      {/* 通知设置 */}
      <Box mb={3}>
        <Typography variant="h6" mb={1}>
          Notifications
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
            />
          }
          label={notificationsEnabled ? "Enabled" : "Disabled"}
        />
      </Box>

      {/* 保存按钮 */}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </Box>
  );
};

export default SettingPage;
