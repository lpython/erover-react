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

import { AppContext } from './contexts.js';

import * as Back from './back/back.js';


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
        this.setState({ user }); 
        // if ()
        this.browserRouter.current.history.push('/user');
      })
  }


  appContextEvents = () => ({
    attemptSignIn: this.handleSignIn
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
            <Route path="/user" render={ () => (<UserDashboard  user={this.state.user} />) } exact/>
            <Route path="/femap154" component={FEMA_P154} />
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
