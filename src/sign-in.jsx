import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import SignInForm from "./sign-in-form-2.jsx";

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
  container: {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px - 48px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 56px - 48px)'
    }
  },
  item: {
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }  
  }
});

export default withStyles(styles)(class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item className={classes.item}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Sign In</Typography>
            <SignInForm />
          </Paper>
        </Grid>
      </Grid>
    );
  }
})
