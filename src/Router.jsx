import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
} from "./scenes";
import WorkerDetail from './pages/WorkerDetail';
import SettingPage from "./pages/SettingPage";
import AllWorkersData from "./pages/AllWorkersData";
import { WorkerDataProvider } from './context/WorkerDataContext';

const AppRouter = () => {
  return (
    <Router>
      <WorkerDataProvider> {/*context */}
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/all-workers-data" element={<AllWorkersData />} />
            {/* Worker Pages */}
            <Route path="/:workerId" element={<WorkerDetail />} />

            {/* Setting Page */}
            <Route path="/settings" element={<SettingPage />} />
          </Route>
        </Routes>
      </WorkerDataProvider>
    </Router>
  );
};

export default AppRouter;
