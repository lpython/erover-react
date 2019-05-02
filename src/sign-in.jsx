import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

import { Formik } from "formik";
import * as Yup from "yup";

import { SignInForm } from "./sign-in-form-2.jsx";
import { Debug } from './formik-debug.jsx';


const validationSchema = Yup.object({
  name: Yup.string("Enter a name").required("Name is required"),
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password")  
});

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const classes = this.props;
    const values = { name: "", email: "", password: "" };    
    
    return (
      <>
        <Typography variant="h5">Sign In</Typography>
        <Formik
            render={props => (
              <>
                <SignInForm {...props} />
                <Debug />
              </>
            )}
            initialValues={values}
            validationSchema={validationSchema}
            // component={SignInForm}
        />
      </>
    );
  }
}

export default InputForm;