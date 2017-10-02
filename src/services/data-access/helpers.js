import axios from 'axios';
// import { getUsers } from './users';
import { URL_PREFIX } from './constants';

function url(...parts) {
  return [URL_PREFIX || ''].concat(parts).join('/');
}

function requestError(error) {
  console.log(error);
  // throw error;
}

export function login(data) {
  // data is email and password
  // checks login details and return user or 0
  return axios
    .post(url('login'), {
      email: data.email,
      password: data.password })
    .catch(requestError)
    .then((response) => {
      // if (response.status === 400) {
      //   throw new Error('Invalid login');
      // }
      if (response.status === 400) {
        throw new Error('Invalid login');
      }
      return response.data;
    });
}

export function getVerificationDetails(report) {
  if (report.proof_verified === false) {
    return 'Not Verified';
  }
  return 'Verified';
}

export function getAccessLevel(accessLevel) {
  const level = (typeof accessLevel !== 'number') ? parseInt(String(accessLevel), 10) : accessLevel;
  if (level === 0) {
    return 'Author';
  } else if (level === 1) {
    return 'CAIR Member';
  } else if (level === 2) {
    return 'Node Administrator';
  } else if (level === 3) {
    return 'Global Administrator';
  }
}

