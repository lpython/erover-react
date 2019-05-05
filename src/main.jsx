import React, { Component } from 'react'

import { 
  withStyles
} from '@material-ui/core';

import SignIn from './sign-in.jsx';
import UserDashboard from './user-dashboard.jsx';
import FEMA_P154 from './femap154-form.jsx';

const styles = theme => ({
  '@global': {
    'html, body, #app': {
      height: '99%',
    }
  }
});

export default withStyles(styles)(function Main({ classes }) {
  return (
    // <SignIn />
    // <UserDashboard />
    <FEMA_P154 />
  )
})