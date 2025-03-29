import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Router';
import './index.css';
import { WorkerDataProvider } from './context/WorkerDataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorkerDataProvider>
      <AppRouter />
    </WorkerDataProvider>
  </React.StrictMode>
);
