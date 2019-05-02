import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const SignInForm = (props) => {
  const {
    values: { name, email, password },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched
  } = props;

  return (
   <form onSubmit={() => {}}>
     <TextField
       id="name"
       name="name"
       label="Name"
       value={name}
       onChange={handleChange}
       fullWidth
     />
     <TextField
       id="email"
       name="email"
       label="Email"
       value={email}
       onChange={handleChange}
       fullWidth
     />
     <TextField
       id="password"
       name="password"
       label="Password"
       type="password"
       value={password}
       onChange={handleChange}
       fullWidth
     />
     <Button
       type="submit"
       variant="contained"
       color="primary"
       fullWidth
       style={{marginTop: '1rem'}}
     >
       Submit
     </Button>
   </form>
  );
};