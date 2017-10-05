import axios from 'axios';
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
  // checks login details and return user error message
  return axios
    .post(url('login'), {
      email: data.email,
      password: data.password })
    .catch(requestError)
    .then((response) => {
      if (response.data === 'Wrong login details') {
        throw new Error('Invalid login');
      }
      return response.data;
    });
}

export function getVerificationDetails(report) {
  // checks verification details passed from backend, converts to UI friendly version
  if (report.proof_verified === 0 || report.proof_verified === 1) {
    if (report.proof_verified === 0) {
      return 'Not Verified';
    }
    return 'Verified';
  }
}

export function getAccessLevel(accessLevel) {
  // returns UI friendly version of the access level using the id
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

