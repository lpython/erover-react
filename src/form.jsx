import * as React from 'react';
import { render } from 'react-dom';

import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';



function App({values, errors, touched}) {
  return (
    <>
      <Form>
        <div>
          { touched.email && errors.email && <p>{ errors.email }</p> }
          <Field type="email" name="email" placeholder="Email" />
        </div>  

        <Field type="password" name="password" placeholder="Password" />
        <label>
          Remember Login
          <Field type="checkbox" name="maintainLogin" checked={values.maintainLogin} />
        </label>
        
        <button>Login</button>
      </Form>
    </>
  );
}

export default withFormik({
  mapPropsToValues({email, maintainLogin, plan}) {
    return {
      email: email || 'test text',
      password: '',
      maintainLogin: maintainLogin || false,
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(9).required()
  }),
  handleSubmit(values) {
    console.log(values);
  }
})(App);
