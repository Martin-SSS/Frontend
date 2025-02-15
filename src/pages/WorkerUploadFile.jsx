import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const WorkerUploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`File uploaded: ${selectedFile.name}`);
      setSelectedFile(null);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Upload Python File
      </Typography>
      <Typography variant="body1" mb={2}>
        Upload a Python file for this worker to process.
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <input
          type="file"
          accept=".py"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span" color="primary">
            Select File
          </Button>
        </label>
        {selectedFile && (
          <Typography variant="body2" color="textSecondary">
            {selectedFile.name}
          </Typography>
        )}
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default WorkerUploadFile;
