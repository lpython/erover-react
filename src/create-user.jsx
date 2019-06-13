import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from './header.jsx';
import CreateUserForm from './create-user-form.jsx';


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
    marginTop: '4rem',
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }  
  }
});

export default withStyles(styles)(class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props)
    const { classes } = this.props;
    
    return (
      <>
        {/* <Header /> */}
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid item className={classes.item}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Create User</Typography>
              <CreateUserForm />
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
})
