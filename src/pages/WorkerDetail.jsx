import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, TableSortLabel, TextField, Card, CardContent, Typography, Grid, Switch, FormControlLabel
} from '@mui/material';
import { useWorkerDataObject } from '../hooks/worker_data_object';
import { useWorkerData } from '../context/WorkerDataContext';


const WorkerDetail = () => {
  const { workerId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const validTabs = ['terminal', 'prediction', 'task-allocation', 'upload-file', 'worker-data'];
  const initialTab = validTabs.includes(tabParam) ? tabParam : 'terminal';
  const [activeTab, setActiveTab] = useState(initialTab);
  const workerData = useWorkerDataObject();

  // States for time filtering and sorting in Worker Data tab
  const [filterStart, setFilterStart] = useState('');
  const [filterEnd, setFilterEnd] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');


  // Update activeTab when URL query param or workerId changes
  useEffect(() => {
    const newTab = tabParam;
    if (newTab && validTabs.includes(newTab)) {
      setActiveTab(newTab);
    } else {
      setActiveTab('terminal');
    }
  }, [tabParam, workerId]);

  // Get worker details from live data (support lookup by IP or name)
  let workerDetail = null;
  if (workerData?.workers_param_dict) {
    // First try to find by IP
    workerDetail = workerData.workers_param_dict[workerId];

    // If not found by IP, try to find by name
    if (!workerDetail) {
      workerDetail = Object.values(workerData.workers_param_dict)
        .find(w => w.name === workerId);
    }
  }

  // If worker not found, show error message
  if (!workerDetail) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Worker Not Found</Typography>
        <Typography variant="body1" color="text.secondary">
          The worker "{workerId}" was not found in the system.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Available workers:
        </Typography>
        <Box component="ul" sx={{ mt: 1 }}>
          {workerData?.workers_param_dict ?
            Object.entries(workerData.workers_param_dict).map(([ip, worker]) => (
              <Typography component="li" key={ip}>
                {worker.name} ({ip})
              </Typography>
            ))
            : <Typography component="li">No workers available</Typography>
          }
        </Box>
      </Box>
    );
  }

  // Determine dataset key (if needed for other tabs or future use)
  const datasetKey = workerDetail.setup.data.dataset_name;
  // Only try to access scenarioData if datasetKey exists
  const scenarioData = datasetKey ? workerDetail[datasetKey] : null;

  // Define table columns (matching Excel example columns order and names)
  const columns = [
    { key: 'ip', label: 'ip', numeric: false },
    { key: 'worker_name', label: 'worker_name', numeric: false },
    { key: 'times', label: 'times', numeric: false },
    { key: 'time_processing_diff', label: 'time_processing_diff', numeric: true },
    { key: 'time_sent', label: 'time_sent', numeric: true },
    { key: 'time_received', label: 'time_received', numeric: true },
    { key: 'time_update_diff', label: 'time_update_diff', numeric: true },
    { key: 'time_decision', label: 'time_decision', numeric: true },
    { key: 'time_exec', label: 'time_exec', numeric: true },
    { key: 'time_allocation_diff', label: 'time_allocation_diff', numeric: true },
    { key: 'actual_label', label: 'actual_label', numeric: false },
    { key: 'actual_time_since_start', label: 'actual_time_since_start', numeric: false },
    { key: 'predicted_label', label: 'predicted_label', numeric: false },
    { key: 'predicted_label_distribution', label: 'predicted_label_distribution', numeric: false },
    { key: 'predicted_times', label: 'predicted_times', numeric: false },
    { key: 'allocated_task_type', label: 'allocated_task_type', numeric: false },
    { key: 'allocated_tasks', label: 'allocated_tasks', numeric: false },
    { key: 'QoS', label: 'QoS', numeric: true },
    { key: 'estimated_QoS', label: 'estimated_QoS', numeric: true },
    { key: 'lower_bound_QoS', label: 'lower_bound_QoS', numeric: true },
    { key: 'upper_bound_QoS', label: 'upper_bound_QoS', numeric: true },
    { key: 'time_allocation_diff_avg', label: 'time_allocation_diff_avg', numeric: true }
  ];

  // Prepare the worker's data row from worker_parameters_config.json
  const activity = workerDetail?.setup?.activity || {};
  // Identify IP (if workerId is name, find corresponding IP key)
  let ip = workerId;
  if (workerDetail.name === workerId) {
    const entry = Object.entries(workerData.workers_param_dict || {})
      .find(([key, val]) => val.name === workerId);
    if (entry) {
      ip = entry[0];
    }
  }
  const workerDataRows = [{
    ip: ip,
    worker_name: workerDetail.name,
    times: activity.times || [],
    time_processing_diff: activity.time_processing_diff || 0,
    time_sent: activity.time_sent || 0,
    time_received: activity.time_received || 0,
    time_update_diff: activity.time_update_diff || 0,
    time_decision: activity.time_decision || 0,
    time_exec: activity.time_exec || 0,
    time_allocation_diff: activity.time_allocation_diff || 0,
    actual_label: activity.actual?.label || undefined,
    actual_time_since_start: activity.actual?.time_since_start || undefined,
    predicted_label: activity.predicted?.label || undefined,
    predicted_label_distribution: activity.predicted?.label_distribution || undefined,
    predicted_times: activity.predicted?.times || undefined,
    allocated_task_type: activity.allocated?.task_type || undefined,
    allocated_tasks: activity.allocated?.tasks || undefined,
    QoS: activity.QoS || 0,
    estimated_QoS: activity.estimated_QoS || 0,
    lower_bound_QoS: activity.lower_bound_QoS || 0,
    upper_bound_QoS: activity.upper_bound_QoS || 0,
    time_allocation_diff_avg: activity.time_allocation_diff_avg || 0
  }];

  // Filter the data by time range if specified
  let displayedRows = workerDataRows;
  if (filterStart) {
    const startNum = parseFloat(filterStart);
    if (!isNaN(startNum)) {
      displayedRows = displayedRows.filter(row =>
        row.time_sent !== undefined && row.time_sent >= startNum
      );
    }
  }
  if (filterEnd) {
    const endNum = parseFloat(filterEnd);
    if (!isNaN(endNum)) {
      displayedRows = displayedRows.filter(row =>
        row.time_sent !== undefined && row.time_sent <= endNum
      );
    }
  }

  // Apply sorting if a sort column is selected
  if (sortConfig.key) {
    displayedRows = [...displayedRows].sort((a, b) => {
      const key = sortConfig.key;
      let aVal = a[key];
      let bVal = b[key];
      // Convert values to numbers for comparison when possible
      if (typeof aVal === 'string' && aVal !== 'N/A') {
        aVal = parseFloat(aVal);
      }
      if (typeof bVal === 'string' && bVal !== 'N/A') {
        bVal = parseFloat(bVal);
      }
      // Handle non-numeric or missing values by pushing them last in ascending order (or first in descending)
      if (aVal === 'N/A' || aVal === 'None' || aVal === undefined || isNaN(aVal)) {
        aVal = sortConfig.direction === 'asc' ? Infinity : -Infinity;
      }
      if (bVal === 'N/A' || bVal === 'None' || bVal === undefined || isNaN(bVal)) {
        bVal = sortConfig.direction === 'asc' ? Infinity : -Infinity;
      }
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
  const formatValueForDisplay = (key, value) => {
    if (value === 'N/A' || value === 'None' || value === undefined || value === null) {
      return 'N/A';
    }

    const byteFields = [
      'memory', 'disk_read_bytes_diff', 'disk_write_bytes_diff',
      'net_sent_diff', 'net_recv_diff', 'net_upload_rate', 'net_download_rate',
      // any other fields that represent bytes can be added here
    ];

    if (byteFields.includes(key)) {
      return (typeof value === 'number') ? value.toString() : value;
    }

    return value.toString();
  };



  // Export currently displayed rows to CSV
  const handleExportCSV = () => {
    let csvContent = columns.map(col => col.label).join(',') + '\n';
    displayedRows.forEach(row => {
      const rowValues = columns.map(col => {
        const rawVal = row[col.key];
        const displayVal = formatValueForDisplay(col.key, rawVal);
        // If value contains a comma, wrap it in quotes
        const cell = (typeof displayVal === 'string' && displayVal.includes(','))
          ? `"${displayVal}"`
          : displayVal;
        return cell;
      });
      csvContent += rowValues.join(',') + '\n';
    });
    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, `${workerDetail.name || workerId}_data.csv`);
    } else {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${workerDetail.name || workerId}_data.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    const { updateWorkerTable } = useWorkerData();

    useEffect(() => {
      if (workerDetail?.name && tableRows.length > 0) {
        updateWorkerTable(workerDetail.name, tableRows);
      }
    }, [workerDetail?.name, tableRows]);

  };

  return (
    <Box sx={{ p: 2 }}>
      <h2>Worker: {workerDetail.name}</h2>
      {/* Tabs for different sections */}
      <Tabs value={activeTab} onChange={(_, newTab) => {
        setActiveTab(newTab);
        setSearchParams({ tab: newTab });
      }} sx={{ mb: 2 }}
      >
        <Tab label="Terminal" value="terminal" />
        <Tab label="Prediction" value="prediction" />
        <Tab label="Task Allocation" value="task-allocation" />
        <Tab label="Upload File" value="upload-file" />
        <Tab label="Worker Data" value="worker-data" />
      </Tabs>

      {/* Content for each tab */}
      {activeTab === 'terminal' && (
        <Box sx={{ mt: 2, fontFamily: 'monospace', whiteSpace: 'pre-wrap', bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
          <h3>Terminal Output</h3>
          <code>
            <iframe src={`http://${ip}:7681`} width="100%" height="500px" />
          </code>
        </Box>
      )}
      {activeTab === 'prediction' && (
        <Box sx={{ mt: 2 }}>
          <h3>Prediction Results</h3>
          <Grid container spacing={2}>
            {[
              {
                id: 'pred1',
                model: 'Energy Forecasting Model',
                input: 'Temp: 28°C, Humidity: 65%',
                output: 'Predicted usage: 53.2 kWh'
              },
              {
                id: 'pred2',
                model: 'Traffic Flow Estimator',
                input: 'Sensor ID: 108, Count: 92 vehicles',
                output: 'Predicted congestion: Medium'
              },
              {
                id: 'pred3',
                model: 'Fault Detection Network',
                input: 'Voltage: 223V, Current: 5.2A',
                output: 'No anomaly detected'
              }
            ].map(pred => (
              <Grid item xs={12} md={6} key={pred.id}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {pred.model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Input:</strong> {pred.input}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Output:</strong> {pred.output}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 'task-allocation' && (
        <Box sx={{ mt: 2 }}>
          <h3>Task Allocation</h3>
          {[
            { id: 'task1', name: 'Task 1', description: 'Image classification pipeline' },
            { id: 'task2', name: 'Task 2', description: 'Sensor data processing' },
            { id: 'task3', name: 'Task 3', description: 'Edge device monitoring' },
            { id: 'task4', name: 'Task 4', description: 'Temperature prediction model' },
            { id: 'task5', name: 'Task 5', description: 'CSV data cleaning script' },
          ].map((task, index) => (
            <Box
              key={task.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              bgcolor="#f5f5f5"
              borderRadius={2}
              mb={2}
            >
              <Box>
                <strong>{task.name}</strong>
                <p style={{ margin: 0, color: '#666' }}>{task.description}</p>
              </Box>
              <FormControlLabel
                control={<Switch defaultChecked={index === 2} />}
                label=""
              />
            </Box>
          ))}
        </Box>
      )}

      {activeTab === 'upload-file' && (
        <Box>
          <Typography variant="h6" gutterBottom>Upload Python File</Typography>

          <Button variant="contained" component="label">
            Choose .py File
            <input
              type="file"
              accept=".py"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.name.endsWith('.py')) {
                  setSelectedFile(file);
                  setUploadMessage('');
                } else {
                  setUploadMessage('Please select a valid .py file.');
                }
              }}
            />
          </Button>

          {selectedFile && (
            <Typography sx={{ mt: 1 }}>Selected file: {selectedFile.name}</Typography>
          )}

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => {
              if (!selectedFile) {
                setUploadMessage('No file selected.');
                return;
              }
              const formData = new FormData();
              formData.append('file', selectedFile);

              // backend
              // fetch(`http://your-backend-api/upload?worker=${workerDetail.name}`, {
              //   method: 'POST',
              //   body: formData
              // })
              //   .then(res => res.json())
              //   .then(data => setUploadMessage('Upload successful!'))
              //   .catch(err => setUploadMessage('Upload failed.'));

              setTimeout(() => {
                setUploadMessage('Upload successful!');
              }, 1000);
            }}
          >
            Upload
          </Button>

          {uploadMessage && (
            <Typography sx={{ mt: 1, color: uploadMessage.includes('success') ? 'green' : 'red' }}>
              {uploadMessage}
            </Typography>
          )}
        </Box>
      )}

      {activeTab === 'worker-data' && (
        <Box>
          {/* Time range filter inputs and CSV export button */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Start Time"
              variant="outlined"
              size="small"
              value={filterStart}
              onChange={(e) => setFilterStart(e.target.value)}
              sx={{ mr: 2, width: '200px' }}
            />
            <TextField
              label="End Time"
              variant="outlined"
              size="small"
              value={filterEnd}
              onChange={(e) => setFilterEnd(e.target.value)}
              sx={{ mr: 2, width: '200px' }}
            />
            <Button variant="outlined" onClick={handleExportCSV}>Export CSV</Button>
          </Box>

          {/* Data table for this worker */}
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {columns.map(col => (
                    <TableCell key={col.key}>
                      {col.numeric ? (
                        <TableSortLabel
                          active={sortConfig.key === col.key}
                          direction={sortConfig.key === col.key ? sortConfig.direction : 'asc'}
                          onClick={() => {
                            if (sortConfig.key === col.key) {
                              // toggle direction
                              setSortConfig({ key: col.key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
                            } else {
                              // new sort column
                              setSortConfig({ key: col.key, direction: 'asc' });
                            }
                          }}
                        >
                          {col.label}
                        </TableSortLabel>
                      ) : (
                        col.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRows.map((row, idx) => (
                  <TableRow key={idx}>
                    {columns.map(col => (
                      <TableCell key={col.key}>
                        {formatValueForDisplay(col.key, row[col.key])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default WorkerDetail;
