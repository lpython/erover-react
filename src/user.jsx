import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import withStyles from "@material-ui/core/styles/withStyles";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './header.jsx';

import UserDashboard from './user-dashboard.jsx';
import FEMA_P154 from './femap154-form.jsx';

export default withStyles(theme => ({

}))(function User({ match }) {
  return (
    <>
      <Header >
        <Button color="inherit">Account</Button>
        <Button color="inherit">Logout</Button>
      </Header>
      <BrowserRouter >
        <Switch>
          <Route path={match.path} component={UserDashboard} exact/>
          <Route path={match.path + "/femap154/:id"} component={FEMA_P154} />
          <Route component={() => <h6>Not found</h6>} />
        </Switch>
      </BrowserRouter>
    </>
  );
})


