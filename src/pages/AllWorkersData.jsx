import React from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { saveAs } from "file-saver";
import { useWorkerDataObject } from "../hooks/worker_data_object";

// 提取所有 activity 数据
const extractActivityRows = (workerData) => {
  const rows = [];

  const workers = workerData?.workers_param_dict || {};

  Object.entries(workers).forEach(([ip, workerInfo], index) => {
    const name = workerInfo?.name || "N/A";
    const activity = workerInfo?.setup?.activity || {};

    rows.push({
      id: `${ip}-${index}`,
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

  return Object.keys(rows[0])
    .filter(key => key !== 'id')
    .map((key) => ({
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
  const workerData = useWorkerDataObject();
  const rows = extractActivityRows(workerData);
  const columns = generateColumns(rows);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">All Workers Data</Typography>
        <Button
          variant="contained"
          onClick={() => exportToCSV(rows, columns)}
        >
          Export to CSV
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default AllWorkersData;
