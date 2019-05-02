import React from 'react';

import AppBar from '@material-ui/core/AppBar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles, Typography } from '@material-ui/core';

export default  ({ classes }) => {
    
  return (
    <>
      <AppBar position="fixed" color="primary" style={{top: 'auto', bottom: 0}}>
        <Toolbar >
          <Typography variant="subtitle2" color="inherit" style={{flex: 1}}>
            Version 2019-alpha | eROVER version: xxx | Copyright © 2019
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};