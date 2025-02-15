import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const WorkerPrediction = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Prediction
      </Typography>
      <Typography variant="body1" mb={2}>
        Enter data below to predict worker performance.
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Parameter 1" variant="outlined" fullWidth />
        <TextField label="Parameter 2" variant="outlined" fullWidth />
        <TextField label="Parameter 3" variant="outlined" fullWidth />
        <Button variant="contained" color="primary">
          Predict
        </Button>
      </Box>
      <Box mt={3}>
        <Typography variant="h6" fontWeight="bold">
          Prediction Result:
        </Typography>
        <Box
          bgcolor="#f4f4f8"
          p={2}
          borderRadius="8px"
          mt={1}
        >
          <Typography>No prediction yet.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkerPrediction;
