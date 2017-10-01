import axios from 'axios';
import { cloneObject } from '../../utils/data-utils';
import { getNodeName } from './nodes';

export function getUsers() {
  // returns an array of user objects
  return axios
    .get('http://localhost:3000/get-users')
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function getUsersWithNodes() {
  // returns an array of user objects
  return axios
    .get('http://localhost:3000/get-users')
    .then(results =>
      Promise.all(
        results.map(result =>
          getNodeName(result.node)
            .then((node) => {
              result.nodeName = node;
              return result;
            }))
      ));
}

export function getAuthorName(id) {
  // returns an array of user objects
  return axios
    .get('http://localhost:3000/get-users')
    .then((result) => {
      for (const user of result) {
        if (user.id === id) {
          return `${user.first_name} ${user.last_name}`;
        }
      }
    });
}

export function postUser(data) {
  return axios
    .post('http://localhost:3000/create-account', {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      access_id: data.accessLevel,
      node_id: data.node,
    })
    .then(response => console.log(response.status))
    .catch(error => console.log(error));
}

export function deleteUser(data) {
  console.log(data);
  // const _data = cloneObject(data);
  // const index = users.findIndex(x => x.id === _data);
  // // const index = researchOutputs.indexOf(data);
  // if (index > -1) {
  //   users.splice(index, 1);
  // }
  // // researchOutputs.push(_data);
  // return Promise.resolve();
}

export function getUser(id) {
  return axios
    .get(`http://localhost:3000/account-details/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function updateUser(data) {
  const id = data.id;
  return axios
    .post(`http://localhost:3000/edit-account/${id}`, data)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export function newUser() {
  return {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    accessLevel: 0,
    node: null,
  };
}
