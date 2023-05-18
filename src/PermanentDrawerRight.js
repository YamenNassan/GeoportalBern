import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Grid from '@mui/material/Grid';

import Bern from './StadtBern';
import CheckboxList from './CheckboxList';
import { Typography } from '@mui/material';

const drawerWidthRight = 350;

function PermanentDrawerRight(props) {
  

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidthRight,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidthRight,
            boxSizing: 'border-box',
            borderRadius: '10px',
            backgroundColor:'rgba(255, 255, 255)',

          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Bern />
        <Divider />
        <List >
          {props.isVisible? (
            <ListItem>
            <Box sx={{border:'1px solid grey',
                      borderRadius:'2px', 
                      bgcolor: 'rgb(211,211,211)',
                      height: 200,
                      width: '100%',
                      overflow: 'auto' }}>
              <CheckboxList /> 
            </Box>
          </ListItem>
          ):(
            <ListItem>
              <Typography variant="body1" sx={{bgcolor:'rgba(70,50,10,0.1)', 
                          textAlign:'center', fontFamily:'sans-serif', 
                          fontSize:'20px', fontStyle:'#808000'}}>
                Die Entwicklung der Städte ist von 
                vielen Faktoren abhängt, wie z.B. der geografischen Lage, 
                der Verfügbarkeit von Ressourcen, der Technologie, 
                der Politik und der Wirtschaft.
                Die Stadt wurde im 12. Jahrhundert gegründet und 
                liegt an einer strategischen Stelle am Zusammenfluss 
                von Aare und Zihl. Mittelalter war Bern eine wichtige 
                Handelsstadt und hatte Kontakte zu anderen wichtigen 
                Städten Europas wie Florenz, Venedig und Paris. 
              </Typography>
            </ListItem>
          )}
        </List>
        <Divider />
        <List >
          
        </List>
      </Drawer>
    </Box>
  );
}

export default PermanentDrawerRight;