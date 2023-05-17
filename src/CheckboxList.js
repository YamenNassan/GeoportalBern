import * as React from 'react';
import { useState, useEffect } from 'react';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from "ol/layer/Tile";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxList(props) {

  const [checked, setChecked] = useState([false]);

  const handleChange = (index) => (event) => {
    const newValue = event.target.checked;
    const newChecked = [...checked];
    newChecked[index] = newValue;
    setChecked(newChecked);
  };
  
  const labels = [
    "Bauentwicklung vor 1800",
    "Bauentwicklung 1800-1850",
  ];
  useEffect(() => {
    const { label } = props;
    const layer = new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {
          'LAYERS': label === "Bauentwicklung vor 1800" ? 'bern' : 'bern',
          'TILED': true
        },
        serverType: 'geoserver',
        visible: true
      })
    });

    return () => {
      // Aufräumarbeiten bei Bedarf
    };
  }, [props]);

  return (
    <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper'  }}>
       <ListItem disablePadding>
            <ListItemButton
              sx = {{py:0.02,px:2, '&:hover': {bgcolor:'action.hover'}, my:0.1, fontSize: '2px'}}>
              <ListItemIcon>
              <Checkbox
              key="1"
              checked={checked[0]}
              onChange={handleChange(0)}
              value="1"
              inputProps={{ 'aria-label': 'Checkbox' }}/>
              </ListItemIcon>
              <ListItemText sx={{ fontSize: '2px' }} id={labels[0]} primary={labels[0]} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton
              sx = {{py:0.02,px:2, '&:hover': {bgcolor:'action.hover'}, my:0.1, fontSize: '2px'}}>
              <ListItemIcon>
              <Checkbox
              key="2"
              checked={checked[1]}
              onChange={handleChange(1)}
              value="2"
              inputProps={{ 'aria-label': 'Checkbox' }}/>
              </ListItemIcon>
              <ListItemText sx={{ fontSize: '2px' }} id={labels[1]} primary={labels[1]} />
            </ListItemButton>
          </ListItem>
    </List>
  );
}
