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

export default function CheckboxList() {

  const [layer, setLayer] = useState(null);
  const labels = [
    "Bauentwicklung vor 1800",
    "Bauentwicklung 1800-1850",
  ];

  const createLayer = (data) => {
    console.log("createLayer!");
    if (data === labels[0]){
      console.log("skjdfkfhsjdh");
      const layer = new TileLayer({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {
            'LAYERS': 'bern:bern',
            'TILED': true
          },
          serverType: 'geoserver',
          visible: true
        })
      });
      setLayer(layer);
    }
  };  
  useEffect(() => {
    if (layer !== null) {
      console.log(layer);
      

    }
  }, [layer]);

  return (
    <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper'  }}>
       <ListItem disablePadding>
            <ListItemButton
              sx = {{py:0.01,px:2, '&:hover': {bgcolor:'action.hover'}, my:0.1, fontSize: '2px'}}>
              <ListItemIcon>
                <Checkbox onClick={() => {createLayer(labels[0])}}/>
              </ListItemIcon>
              <ListItemText id={labels[0]} primary={labels[0]}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton
              sx = {{py:0.02,px:2, '&:hover': {bgcolor:'action.hover'}, my:0.1, fontSize: '2px'}}>
              <ListItemIcon>
                <Checkbox />
              </ListItemIcon>
              <ListItemText id={labels[1]} primary={labels[1]} />
            </ListItemButton>
          </ListItem>
    </List>
  );
}
