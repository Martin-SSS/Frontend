
# 🚀 Edge Worker Monitoring & Task Platform

A centralized, modular front-end platform for managing data collection, task scheduling, resource allocation, and predictive analysis of multiple edge devices (Workers). The system is based on React and Material UI, with a user-friendly interface and complete functions, supporting data display, script upload, terminal log viewing, prediction result browsing, system configuration, and other functions.
---

## 📦 Dependencies

Please make sure you have installed the following dependencies:

### Core
- `react`
- `react-dom`
- `react-router-dom`
- `@mui/material`
- `@mui/icons-material`
- `@mui/x-data-grid`
- `file-saver`

### Dev Tools
- `vite`

---

## 🛠️ Project Setup

```bash
# clone
git clone https://github.com/Martin-SSS/Frontend
cd your-repo

# Install Dependencies through cmd in the project directory
npm install

# Start the development environment through cmd in the project directory
npm run dev

# Access address
http://localhost:5173

---

## 🌐 Project Structure

```bash
src/
├── App.jsx                 # Main frame, layout and theme switching
├── main.jsx                # Start Entry
├── Router.jsx              # All page routing configuration
├── theme.js                # MUI theme configuration
├── context/
│   └── WorkerDataContext.jsx  #Global worker data sharing
    └── object-client.jsx
└── hooks/
    └── worker_data_object.jsx
├── pages/
│   ├── WorkerDetail.jsx    # Multi-tabbed page for a single worker
│   ├── AllWorkersData.jsx  # General table page (all workers data)
│   └── SettingPage.jsx     # Settings page (scheduling, resources, forecasting, etc.)
    └── ObjectCLientPlayground.jsx
    └── ObjecrPlayground.jsx
    └── Update client playground.jsx
└── scenes/
    ├── Dashboard/
    └── layout/
        └── navbar/
        └── sidebar/
```

---

## 💡 Main Features

### ✅ Worker Detail Page Features
- **Terminal Output**: Simulate terminal output log
- **Prediction**: Mission performance prediction based on historical data
- **Task Allocation**: Display the task switch to control task delivery
- **Upload Python File**: Upload local `.py` files to worker
- **Worker Data**: Display all performance monitoring data of the worker (CSV export)

### ✅ All Worker Data
- Centrally display monitoring data of all workers
- Sort, filter by field, and export to CSV

### ✅ Settings
- Task scheduling parameter settings
- Resource allocation threshold settings (CPU, memory, etc.)
- System behavior settings (logs, time zone, etc.)
- Prediction parameter settings (model type, window size, etc.)
- Configuration saved to backend API

### ✅ Search Jump
- The top search bar supports quick jump by worker name

## 🙌 Author

Made with Oliver Dantzer, Maximo Lesperance-Spack, Junyi Shi, Ziguang Liu

Edge Worker Monitoring & Task Platform - 2025
