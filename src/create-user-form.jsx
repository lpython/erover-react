import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { Formik, Field, Form } from "formik";
import { TextField } from 'formik-material-ui';
import * as Yup from "yup";

import { Debug } from './formik-debug.jsx';


const validationSchema = Yup.object({
  name: Yup.string("Enter your name").required("Must enter a name"),
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .required("Enter your password")  ,
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const initialValues = { 
  name: "", 
  email: "", 
  password: "",
  passwordConfirmation: ""
};    

export default function CreateUserForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(e) => { }}
    >
     { (props) => {
              
        console.log(props);
        const margin = {marginTop: '5px', marginBottom: '5px'};
      
        return (
          <Form>
            <Field
              name="name"
              type="text"
              label="Name"
              component={TextField}
              fullWidth
            />
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
            <Field
              name="passwordConfirmation"
              type="password"
              label="Confirm password"
              component={TextField}
              fullWidth
            />
            <Grid container justify="center" style={{ marginTop: '1rem'}}>
              <Grid item >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
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
