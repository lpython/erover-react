import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import withStyles from "@material-ui/core/styles/withStyles";


export default withStyles( theme => ({
  items: {
    '&>*': {
      marginLeft: theme.spacing.unit,
    }
  }
}))(function ({ classes, children }) {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            eRover
          </Typography>

          <div className={classes.items}>
            {children}
          </div>

        </Toolbar>
      </AppBar>
    </div>
  )
})

