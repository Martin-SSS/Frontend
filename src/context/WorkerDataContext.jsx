import React, { createContext, useContext, useState } from 'react';

const WorkerDataContext = createContext();

export const WorkerDataProvider = ({ children }) => {
  const [workerTables, setWorkerTables] = useState({});

  const updateWorkerTable = (workerName, rows) => {
    setWorkerTables((prev) => ({
      ...prev,
      [workerName]: rows,
    }));
  };

  return (
    <WorkerDataContext.Provider value={{ workerTables, updateWorkerTable }}>
      {children}
    </WorkerDataContext.Provider>
  );
};

export const useWorkerData = () => useContext(WorkerDataContext);
