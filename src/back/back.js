import * as R from 'ramda';

let { protocol, hostname, port } = window.location;

// local test 
port = 3000;

function fetchBack(endPoint) {
  const url = protocol + '//' + hostname + ':' + port + endPoint;
  return fetch(url);
}


export function SignIn({ email, password }) {
  const endPoint = '/crud/users?email=' + email;
  return fetchBack(endPoint)
    .then(res => res.json())
    .then(obj => {
      //verify one response 
      if (R.is(Array, obj) && obj.length == 1) {
        return obj[0];
      } else {
        const err = new Error('User not found.');
        err.userMessage = 'User not found.';
        throw err;
      }
    })
}