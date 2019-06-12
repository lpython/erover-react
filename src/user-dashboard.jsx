import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from './header.jsx';
import Facilites from './facilities.jsx';

import exampleFacilites from './example-data/facilities.json';

const styles = theme => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px - 48px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 56px - 48px)'
    }
  },
  item: {
    padding: '20px',
    margin: '5px',
    width: '100%'
  }
});

export default withStyles(styles)(class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <Grid container className={classes.container}>
          <Grid item className={classes.item}>
            <Facilites data={exampleFacilites} />
          </Grid>
        </Grid>
      </>
    );
  }
})


