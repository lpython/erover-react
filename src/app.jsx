import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { 
  MuiThemeProvider, createMuiTheme, CssBaseline, withStyles,
  Grid, Paper
} from '@material-ui/core';
import { deepOrange, amber } from '@material-ui/core/colors';

import Header from './header.jsx';
import Main from './main.jsx';
import Footer from './footer.jsx';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[300],
      light: deepOrange[200],
      dark: deepOrange[900]
    },
    secondary: {
      main: amber.A400,
      light: amber[200],
      dark: amber[700]
    } 
  }
});

class App extends Component {
  state = {
    
  };

  render() {
    
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Body />
      </MuiThemeProvider>
    );
  }
}

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
  }
});

const Body = withStyles(styles)(function Body({ classes }) {
  return (
    <>
      {/* <AppBar /> */}
      <Header />
      <Grid className={classes.container}>
        <Paper className={classes.paper}>
          <Main  />
        </Paper>
      </Grid>
      <Footer/>
    </>
  );
});

document.addEventListener('DOMContentLoaded', 
  () => ReactDOM.render( <App/> , document.querySelector('#app')));
