import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useWorkerDataObject } from '../../../hooks/worker_data_object';

const SidebarItem = ({ title, to, icon, children, open = false, onClick }) => {
  return (
    <>
      <ListItem disablePadding>
        {to ? (
          <ListItemButton component={Link} to={to} onClick={onClick}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={title} />
            {children && (open ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </ListItemButton>
        ) : (
          <ListItemButton onClick={onClick}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={title} />
            {children && (open ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </ListItemButton>
        )}
      </ListItem>
      {children && open && (
        <List component="div" disablePadding sx={{ pl: 4 }}>
          {children}
        </List>
      )}
    </>
  );
};

const SideBar = () => {
  const [workerMenuOpen, setWorkerMenuOpen] = useState(false);
  const workerData = useWorkerDataObject();
  const workers = Object.values(workerData.workers_param_dict).map((worker) => worker.name);

  return (
    <Box component="nav" sx={{ width: 250, flexShrink: 0 }}>
      <List>
        {/* Overview  */}
        <SidebarItem 
          title="Overview" 
          to="/" 
          icon={<HomeOutlinedIcon />} 
        />
        {/* Worker */}
        <SidebarItem
          title="Worker"
          icon={<ComputerOutlinedIcon />}
          open={workerMenuOpen}
          onClick={() => setWorkerMenuOpen(!workerMenuOpen)}
        >
          {/* small worker */}
          {workers.map((workerName) => (
            <SidebarItem 
              key={workerName} 
              title={workerName} 
              to={`/${workerName}`} 
            />
          ))}
        </SidebarItem>
        {/* Setting  */}
        <SidebarItem 
          title="Setting" 
          to="/settings" 
          icon={<SettingsOutlinedIcon />} 
        />
        <SidebarItem 
          title="All worker data" 
          to="/all-workers-data" 
           
        />
        
      </List>
    </Box>
  );
};

export default SideBar;
