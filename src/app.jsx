import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { 
  MuiThemeProvider, createMuiTheme, CssBaseline, withStyles,
  Grid, Paper
} from '@material-ui/core';
import { deepOrange, amber } from '@material-ui/core/colors';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as R from 'ramda';

import SignIn from './sign-in.jsx';
import CreateUser from './create-user.jsx';
import User from './user.jsx';


import { AppContext } from './contexts.js';

import * as Back from './back/back.js';
import facilities from './facilities.jsx';


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
  browserRouter = React.createRef();

  state = {
    user: null
  };

  handleSignIn = credientials => {
    return Back.SignIn(credientials)
      .then(user => { 
        localStorage.setItem('user', JSON.stringify(user));
        this.browserRouter.current.history.push('/user');
      })
  }

  handleFormRetrieval = facilityID => {
    const user = JSON.parse(localStorage.getItem('user'));
    const facilities = user.facilities;
    const index = facilities.findIndex(f => f.id == facilityID);    

    if (!R.is(Object, facilities[index].femap154)) {
      facilities[index].femap154 = {};
      localStorage.setItem('user', JSON.stringify(user));
    }

    return facilities[index].femap154;
  }

  appContextEvents = () => ({
    attemptSignIn: this.handleSignIn,
    retrieveForm: this.handleFormRetrieval
  })

  componentDidMount() {
    console.log(this.browserRouter)

  }

  render() {
    return (
      <AppContext.Provider value={this.appContextEvents()} >
        <BrowserRouter ref={this.browserRouter}>
          <Switch>
            <Route path="/" component={SignIn} exact/>
            <Route path="/newUser" component={CreateUser} exact/>
            <Route path="/user" component={User} />
            <Route component={() => <h6>Not found</h6>} />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}



document.addEventListener('DOMContentLoaded', 
  () => ReactDOM.render((
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  )
  , document.querySelector('#app'))
);
