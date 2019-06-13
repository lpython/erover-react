import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import * as R from 'ramda';

import Facilites from './facilities.jsx';

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
  // static contextType = AppContext;
  state = {};

  componentDidMount() {
    try {
      const user = JSON.parse( localStorage.getItem('user') );
      this.setState({ user });
    } catch (error) {
      console.error(error);
    }
  }

  handleFEMAClick = facilityID => {
    this.props.history.push(this.props.match.url + '/femap154/' + facilityID);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Grid container className={classes.container}>
          <Grid item className={classes.item}>
            { R.path(['state','user','facilities'],this) && 
              <Facilites 
                data={this.state.user.facilities} 
                onFEMAClick={this.handleFEMAClick}
              />
            }
          </Grid>
        </Grid>
      </>
    );
  }
})


