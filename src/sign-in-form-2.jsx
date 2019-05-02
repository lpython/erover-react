import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Formik } from "formik";
import * as Yup from "yup";

import { Debug } from './formik-debug.jsx';

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .required("Enter your password")  
});

const initialValues = { name: "", email: "", password: "" };    

export default function SignInForm() {
  return (
    <Formik
      render={props => (
        <>
          <Form {...props} />
          {/* <Debug /> */}
        </>
      )}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(e) => {
        e.prevendDefault();
        alert('OK!!!')
      }}
    />
  )
}

function Form(props) {
  const {
    values: { email, password },
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = props;

  console.log(props);
  const margin = {marginTop: '5px', marginBottom: '5px'};

  return (
    <form onSubmit={() => {}}>
      <TextField
        id="email"
        name="email"
        label="Email"
        value={email}
        error={touched.email && errors.email}
        helperText={errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
        style={margin}
        fullWidth
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        value={password}
        error={touched.password && errors.password}
        helperText={errors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        style={margin}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{marginTop: '1rem'}}
        onClick={handleSubmit}
        fullWidth
      >
        Submit
      </Button>
    </form>
  );
};