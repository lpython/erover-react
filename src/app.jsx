import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { deepOrange, amber } from '@material-ui/core/colors';

import Header from './header.jsx';
import Footer from './footer.jsx';

import Form from './form.jsx';

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
        {/* <CssBaseline /> */}
        <Body />
      </MuiThemeProvider>
    );
  }
}

function Body() {
  return (
    <>
      {/* <AppBar /> */}

      <Header />
      <Main  />
      <Footer />
    </>
  );
}

function Main() {
  return (
    <div>
      <div style={{textAlign: 'center'}} >
        <Form />
      </div>
    </div>
  );
}

document.addEventListener('DOMContentLoaded', 
  () => ReactDOM.render( <App/> , document.querySelector('#app')));
