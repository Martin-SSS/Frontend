import React from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { saveAs } from "file-saver";
import workerJson from "../worker_parameters_config.json";

// 提取所有 activity 数据
const extractActivityRows = () => {
  const rows = [];

  const workers = workerJson?.workers_param_dict || {};

  Object.entries(workers).forEach(([ip, workerInfo]) => {
    const name = workerInfo?.name || "N/A";
    const activity = workerInfo?.setup?.activity || {};

    rows.push({
      ip,
      worker_name: name,
      ...activity,
    });
  });

  return rows;
};


// 动态生成列
const generateColumns = (rows) => {
  if (!rows.length) return [];

  return Object.keys(rows[0]).map((key) => ({
    field: key,
    headerName: key,
    width: 180,
    sortable: true,
    valueGetter: (params) => {
      const value = params.row[key];
      if (Array.isArray(value)) return JSON.stringify(value);
      if (typeof value === "object" && value !== null)
        return JSON.stringify(value);
      return value !== undefined ? value : "N/A";
    },
  }));
};

// CSV 导出函数
const exportToCSV = (rows, columns) => {
  const headers = columns.map((col) => col.field).join(",");
  const csvRows = rows.map((row) =>
    columns.map((col) => {
      const val = row[col.field];
      if (Array.isArray(val)) return `"${val.join(";")}"`;
      if (typeof val === "object" && val !== null)
        return `"${JSON.stringify(val)}"`;
      return val !== undefined ? `"${val}"` : "N/A";
    }).join(",")
  );

  const csvContent = [headers, ...csvRows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "all_worker_activity.csv");
};

const AllWorkersData = () => {
  const rows = extractActivityRows(workerJson);
  const columns = generateColumns(rows);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        All Workers Data
      </Typography>

      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={() => exportToCSV(rows, columns)}>
          Export CSV
        </Button>
      </Box>

      <Box height={600}>
        <DataGrid
          rows={rows.map((row, idx) => ({ id: idx, ...row }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default AllWorkersData;
