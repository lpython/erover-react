import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import { 
  Paper, withStyles
} from '@material-ui/core';

import Form from './form.jsx';


const styles = theme => ({
  paper: { 
    // padding: 20, 
    // margin: 5, 
    // [theme.breakpoints.up('sm')]: {
    //   height: 'calc(100% - 10px)' 
    // },
    // [theme.breakpoints.down('xs')]: {
    //   height: '100%' 
    // },
    overflowY: 'auto'
  },
  '@global': {
    'html, body, #app': {
      height: '100%'
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
    [theme.breakpoints.down('xs')]: {
      height: '50%'
    }
  }
});


export default withStyles(styles)(function Main(props) {
  return (
    <div>
      <p>Main</p>
    </div>
  )
})