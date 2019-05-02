import React, { Component } from 'react'

import { 
  Grid, Paper, withStyles
} from '@material-ui/core';

import SignIn from './sign-in.jsx';

const styles = theme => ({
  paper: { 
    padding: 20, 
    margin: 5, 
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% )' 
    },
    [theme.breakpoints.down('xs')]: {
      height: '100%' 
    },
    overflowY: 'auto'
  },
  '@global': {
    'html, body, #app': {
      height: '99%',
    }
  },
  container: {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px - 48px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 56px - 48px)'
    }
  },
  item: {
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }  
  }
});


export default withStyles(styles)(function Main({ classes }) {
  return (
    <Grid 
      container 
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item className={classes.item}>
        <Paper className={classes.paper}>
          <SignIn />
        </Paper>
      </Grid>
    </Grid>
  )
})