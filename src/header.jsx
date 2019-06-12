import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export default ({ }) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" style={{flex: 1}}>
            eRover
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

