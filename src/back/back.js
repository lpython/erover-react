import * as R from 'ramda';

let { protocol, hostname, port } = window.location;

// local test 
port = 3000;

const backend = protocol + '//' + hostname + ':' + port;


export function SignIn({ email, password }) {
  const endPoint = '/crud/users?email=' + email;
  return fetch(backend + endPoint)
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

export function SaveUser(user) {
  const id = user.id;
  if (!id) { throw new Error('Missing user id'); }
  const endPoint = '/crud/users/' + id;
  return fetch(backend + endPoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(obj => {
      //verify one response 
      if (R.is(Object, obj)) {
        return obj;
      } else {
        const err = new Error('Failed to save user');
        err.userMessage = 'Failed to save user';
        throw err;
      }
    })
} 

export function Score_FEMA_P154(form) {
  const endPoint = '/api/scoring';
  return fetch(backend + endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  })
    .then(res => res.json())
    .then(obj => {
      //verify one response 
      if (R.is(Object, obj) && obj.result) {
        return obj.result;
      } else {
        const err = new Error('Scoring failed');
        err.userMessage = 'Scoring failed';
        throw err;
      }
    })
}


export function Classify_Soil_FEMA_P154(form) {
  const endPoint = '/api/classify_soil';
  return fetch(backend + endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  })
    .then(res => res.json())
    .then(obj => {
      //verify one response 
      if (R.is(Object, obj) && obj.result && R.is(String, obj.result)) {
        return obj.result;
      } else {
        const err = new Error('Classify soil failed');
        err.userMessage = 'Classify soil failed';
        throw err;
      }
    })
}