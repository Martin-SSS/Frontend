import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
} from "./scenes";
import Worker1Page from "./pages/Worker1Page";
import Worker2Page from "./pages/Worker2Page";
import Worker3Page from "./pages/Worker3Page";
import Worker4Page from "./pages/Worker4Page";
import SettingPage from "./pages/SettingPage";
import WorkerTerminal from "./pages/WorkerTerminal";
import WorkerPrediction from "./pages/WorkerPrediction";
import WorkerTaskAllocation from "./pages/WorkerTaskAllocation";
import WorkerUploadFile from "./pages/WorkerUploadFile";
import { UpdateClientPlayground } from "./pages/UpdateClientPlayground";
import { ObjectClientPlayground } from "./pages/ObjectClientPlayground";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            path="/update-client-playground"
            element={<UpdateClientPlayground />}
          />
          <Route
            path="/object-client-playground"
            element={<ObjectClientPlayground />}
          />
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/geography" element={<Geography />} />

          {/* Worker Pages */}
          <Route path="/worker1" element={<Worker1Page />} />
          <Route path="/worker2" element={<Worker2Page />} />
          <Route path="/worker3" element={<Worker3Page />} />
          <Route path="/worker4" element={<Worker4Page />} />

          {/* Setting Page */}
          <Route path="/settings" element={<SettingPage />} />

          {/* Worker Submenu Routes */}
          <Route path="/worker1/terminal" element={<WorkerTerminal />} />
          <Route path="/worker1/prediction" element={<WorkerPrediction />} />
          <Route
            path="/worker1/task-allocation"
            element={<WorkerTaskAllocation />}
          />
          <Route path="/worker1/upload-file" element={<WorkerUploadFile />} />

          <Route path="/worker2/terminal" element={<WorkerTerminal />} />
          <Route path="/worker2/prediction" element={<WorkerPrediction />} />
          <Route
            path="/worker2/task-allocation"
            element={<WorkerTaskAllocation />}
          />
          <Route path="/worker2/upload-file" element={<WorkerUploadFile />} />

          <Route path="/worker3/terminal" element={<WorkerTerminal />} />
          <Route path="/worker3/prediction" element={<WorkerPrediction />} />
          <Route
            path="/worker3/task-allocation"
            element={<WorkerTaskAllocation />}
          />
          <Route path="/worker3/upload-file" element={<WorkerUploadFile />} />

          <Route path="/worker4/terminal" element={<WorkerTerminal />} />
          <Route path="/worker4/prediction" element={<WorkerPrediction />} />
          <Route
            path="/worker4/task-allocation"
            element={<WorkerTaskAllocation />}
          />
          <Route path="/worker4/upload-file" element={<WorkerUploadFile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
