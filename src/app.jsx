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
  },
  overrides: {
    MuiFormControlLabel: {
      root: {
        width: '100%'
      }
    }
  }
});

class App extends Component {
  state = {
    page: 'facilities'
  };

  render() {
    
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Body page={this.state.page}/>
      </MuiThemeProvider>
    );
  }
}

const styles = theme => ({
  
});

const Body = withStyles(styles)(function Body({ classes, page }) {
  return (
    <>
      <Header />
      <Main  />
      { page == 'signIn' && <Footer/> }  
    </>
  );
});

document.addEventListener('DOMContentLoaded', 
  () => ReactDOM.render( <App/> , document.querySelector('#app')));
