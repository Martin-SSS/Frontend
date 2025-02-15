import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const WorkerTerminal = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Terminal Output
      </Typography>
      <Typography variant="body1" mb={2}>
        This is where the terminal output for the worker is displayed.
      </Typography>
      <Box
        bgcolor="#1e1e1e"
        color="#fff"
        p={2}
        borderRadius="8px"
        height="300px"
        overflow="auto"
      >
        <pre>Loading terminal output...</pre>
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary">
          Refresh Output
        </Button>
      </Box>
    </Box>
  );
};

export default WorkerTerminal;
