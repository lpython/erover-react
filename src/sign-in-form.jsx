import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";

import { Formik, Field, Form } from "formik";
import { TextField } from 'formik-material-ui';
import * as Yup from "yup";

import { Link } from 'react-router-dom';

import { Debug } from './formik-debug.jsx';

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .required("Enter your password")  
});

const initialValues = { name: "", email: "", password: "" };    

export default function SignInForm({ onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
     { (props) => {
              
        const margin = {marginTop: '5px', marginBottom: '5px'};
      
        return (
          <Form>
            <Field
              name="email"
              type="email"
              label="Email"
              component={TextField}
              fullWidth
            />
             <Field
              name="password"
              type="password"
              label="Password"
              component={TextField}
              fullWidth
            />
            <Grid container justify="space-between" style={{ marginTop: '1rem'}}>
              <Grid item >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
              <Grid item >
                <Button
                  component={Link}
                  variant="outlined"
                  to="/newUser"
                >
                  Create User
                </Button>
              </Grid>
            </Grid>

            <Debug />
          </Form>
        );
      }}
    
    </Formik>
  )
}
