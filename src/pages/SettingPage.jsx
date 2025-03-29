import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SettingPage = () => {
  const [formData, setFormData] = useState({
    taskInterval: "",
    maxTasksPerWorker: "",
    cpuThreshold: "",
    memoryThreshold: "",
    timezone: "",
    enableLogging: false,
    predictionModel: "",
    predictionWindow: "",
  });

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage("");

    /* Backend API part, need to change */
    try {
      const response = await fetch("http://localhost:5000/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings.");
      }

      const result = await response.json();
      setSaveMessage("Settings saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      setSaveMessage(" Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2}>Settings</Typography>

      {/* Task Scheduling Configuration */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Task Scheduling Configuration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            label="Task Interval (sec)"
            type="number"
            margin="dense"
            value={formData.taskInterval}
            onChange={(e) => handleChange("taskInterval", e.target.value)}
          />
          <TextField
            fullWidth
            label="Max Tasks Per Worker"
            type="number"
            margin="dense"
            value={formData.maxTasksPerWorker}
            onChange={(e) => handleChange("maxTasksPerWorker", e.target.value)}
          />
        </AccordionDetails>
      </Accordion>

      {/* Resource Allocation Rules */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Resource Allocation Rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            label="CPU Usage Threshold (%)"
            type="number"
            margin="dense"
            value={formData.cpuThreshold}
            onChange={(e) => handleChange("cpuThreshold", e.target.value)}
          />
          <TextField
            fullWidth
            label="Memory Usage Threshold (%)"
            type="number"
            margin="dense"
            value={formData.memoryThreshold}
            onChange={(e) => handleChange("memoryThreshold", e.target.value)}
          />
        </AccordionDetails>
      </Accordion>

      {/* System-Wide Settings */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">System-Wide Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            label="Timezone"
            margin="dense"
            value={formData.timezone}
            onChange={(e) => handleChange("timezone", e.target.value)}
          />
          <Box display="flex" alignItems="center" mt={1}>
            <Switch
              checked={formData.enableLogging}
              onChange={(e) => handleChange("enableLogging", e.target.checked)}
            />
            <Typography ml={1}>Enable System Logging</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Predictive Configuration */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Predictive Configuration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            label="Prediction Model"
            margin="dense"
            value={formData.predictionModel}
            onChange={(e) => handleChange("predictionModel", e.target.value)}
          />
          <TextField
            fullWidth
            label="Prediction Window (minutes)"
            type="number"
            margin="dense"
            value={formData.predictionWindow}
            onChange={(e) => handleChange("predictionWindow", e.target.value)}
          />
        </AccordionDetails>
      </Accordion>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Settings"}
      </Button>

      {saveMessage && (
        <Typography mt={2} color={saveMessage.includes("successfully") ? "green" : "red"}>
          {saveMessage}
        </Typography>
      )}
    </Box>
  );
};

export default SettingPage;
