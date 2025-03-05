import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';  // 使用 MUI 的 Tabs 组件
import workerConfig from '../../public/worker_parameters_config.json';  // 导入 Worker 参数配置（根据实际路径调整）

const WorkerDetail = () => {
  // 通过路由参数获取当前 worker 的 ID
  const { workerId } = useParams();

  // 使用查询参数控制选项卡（如 ?tab=terminal 或 ?tab=prediction）
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const validTabs = ['terminal', 'prediction', 'task-allocation', 'upload-file'];
  const initialTab = validTabs.includes(tabParam) ? tabParam : 'terminal';  // 默认激活 "Terminal" 选项卡
  const [activeTab, setActiveTab] = useState(initialTab);

  // 每当路由参数或查询参数变化时，更新激活的选项卡
  useEffect(() => {
    const newTab = searchParams.get('tab');
    if (newTab && validTabs.includes(newTab)) {
      setActiveTab(newTab);
    } else {
      setActiveTab('terminal');
    }
  }, [workerId, searchParams]);

  // 从配置 JSON 中加载当前 worker 的详情数据
  const workerDetail = workerConfig.workers_param_dict[workerId];

  // 选项卡切换时的处理函数
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSearchParams({ tab: newValue });  // 将选项卡状态同步到 URL 查询参数
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 显示当前 Worker 标识 */}
      <h2>Worker: {workerId}</h2>

      {/* 选项卡导航 */}
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Terminal Output" value="terminal" />
        <Tab label="Prediction" value="prediction" />
        <Tab label="Task Allocation" value="task-allocation" />
        <Tab label="Upload Python File" value="upload-file" />
      </Tabs>

      {/* 各选项卡内容面板 */}
      {activeTab === 'terminal' && (
        <Box sx={{ mt: 2 }}>
          <h3>Terminal Output</h3>
          {/* 示例终端输出内容（实际可替换为真实日志） */}
          <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
            {/* 此处可以加载并显示该 worker 的终端输出日志 */}
            No terminal output available for this worker.
          </pre>
        </Box>
      )}

      {activeTab === 'prediction' && (
        <Box sx={{ mt: 2 }}>
          <h3>Prediction</h3>
          {/* 如果配置中存在预测结果，显示之，否则显示暂无数据 */}
          {workerDetail && (workerDetail.Label_ACF || workerDetail.Label_Spectral) ? (
            <div>
              {workerDetail.Label_ACF && <p>Label_ACF: {workerDetail.Label_ACF}</p>}
              {workerDetail.Label_Spectral && <p>Label_Spectral: {workerDetail.Label_Spectral}</p>}
            </div>
          ) : (
            <p>No prediction data available for this worker.</p>
          )}
        </Box>
      )}

      {activeTab === 'task-allocation' && (
        <Box sx={{ mt: 2 }}>
          <h3>Task Allocation</h3>
          {/* 任务分配内容占位（可根据需要展示该 worker 的任务信息） */}
          <p>Task allocation details for this worker will appear here.</p>
        </Box>
      )}

      {activeTab === 'upload-file' && (
        <Box sx={{ mt: 2 }}>
          <h3>Upload Python File</h3>
          {/* 文件上传表单示例 */}
          <input type="file" accept=".py" />
          <button>Upload</button>
        </Box>
      )}
    </Box>
  );
};

export default WorkerDetail;
