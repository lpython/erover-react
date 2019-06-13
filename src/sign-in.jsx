import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from './header.jsx';
import SignInForm from './sign-in-form.jsx';

import { AppContext } from './contexts.js'



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

export default withStyles(styles)(class SignIn extends Component {
  static contextType = AppContext;

  queue = [];

  state = {
    open: false,
    messageInfo: {},
  };


  addMessage = message => {
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  handleAttemptSignIn = credientials => {
    console.log('[SignIn] handleAttemptSignIn():', credientials);
    this.context.attemptSignIn(credientials)
      .then(() => {
        console.warn('Should be navigating away.')
      })
      .catch(error => {
        console.error(error); 
        if (error.userMessage) { this.addMessage(error.userMessage); }
      });
  }

  render() {
    const { classes } = this.props;
    const { messageInfo } = this.state;

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
              <Typography variant="h5">Sign In</Typography>
              <SignInForm onSubmit={this.handleAttemptSignIn} />
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{messageInfo.message}</span>}
          // action={[
          //   <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
          //     UNDO
          //   </Button>,
          //   <IconButton
          //     key="close"
          //     aria-label="Close"
          //     color="inherit"
          //     className={classes.close}
          //     onClick={this.handleClose}
          //   >
          //     <CloseIcon />
          //   </IconButton>,
          // ]}
        />
      </>
    );
  }
})
