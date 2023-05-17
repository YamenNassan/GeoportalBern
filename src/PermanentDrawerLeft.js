import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { List } from '@mui/material';


//import Icon
import Bern from './StadtBern';


const drawerWidth = 350;

function PermanentDrawerLeft(props) {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          height: '100%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'contetnt flex',
            borderRadius: '15px',
            backgroundColor:'rgba(255, 255, 255)',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Bern flip={true}/>
        <Divider />
        <List style={{ padding: '50px 0', marginLeft: '50px'}}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <>
                <Button 
                  variant="text" 
                  size="large" 
                  color='secondary'
                  onClick = {() =>{props.handleDrawerOpen()}}
                >
                  Archäologie
                </Button>
              </>
            </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary" paddingRight={5}>
              Die Historische Entwicklung der Stadt Bern
            </Typography>
          </Grid>
          </Grid>
        </List>
        <Divider />
        <List style={{ padding: '75px 0', marginLeft: '50px' }}>
        <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button 
                variant="text" 
                size="large" 
                color='secondary'
              >
                Tourismus
              </Button>
            </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Sekundärer Text hier
            </Typography>
          </Grid>
          </Grid>
        </List>
        <Divider style={{ padding: '10px 0'}} />
      </Drawer>
    </Box>
  );
}

export default PermanentDrawerLeft;
