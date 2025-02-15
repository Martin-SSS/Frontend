import React, { useState } from "react";
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material";

const WorkerTaskAllocation = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Task Allocation
      </Typography>
      <Typography variant="body1" mb={2}>
        Assign tasks to this worker.
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="New Task"
          variant="outlined"
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task
        </Button>
      </Box>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Assigned Tasks:
      </Typography>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText primary={task} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WorkerTaskAllocation;
