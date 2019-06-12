import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { 
  MuiThemeProvider, createMuiTheme, CssBaseline, withStyles,
  Grid, Paper
} from '@material-ui/core';
import { deepOrange, amber } from '@material-ui/core/colors';

import { BrowserRouter, Route, Switch } from 'react-router-dom';


import SignIn from './sign-in.jsx';
import CreateUser from './create-user.jsx';
import UserDashboard from './user-dashboard.jsx';
import FEMA_P154 from './femap154-form.jsx';


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
        <Routing />
      </MuiThemeProvider>
    );
  }
}

function Routing() {
  const err404 = () => ( <h6> Error: 404 </h6> );
 
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={SignIn} exact/>
        <Route path="/newUser" component={CreateUser} exact/>
        <Route path="/user" component={UserDashboard} exact/>
        <Route path="/femap154" component={FEMA_P154} exact/>
        <Route component={err404} />
      </Switch>
    </BrowserRouter>
  )
}

document.addEventListener('DOMContentLoaded', 
  () => ReactDOM.render( <App/> , document.querySelector('#app')));
