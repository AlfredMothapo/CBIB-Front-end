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
  // returns an array of user objects with mapped node names
  return axios
    .get('http://localhost:3000/get-users')
    .then(results =>
      Promise.all(
        results.data.map(result =>
          getNodeName(result.node_id)
            .then((node) => {
              result.nodeName = node;
              return result;
            }))
      ));
}

export function getAuthorName(id) {
  // returns the concatenated name of a user based on id
  return axios
    .get(`http://localhost:3000/get-user/${id}`)
    .then((result) => {
      if (!result.data) {
        return 'None';
      }
      return `${result.data.first_name} ${result.data.last_name}`;
    });
}

export function getCoAuthorNames(id) {
  // returns the concatenated string of all names of a users based on ids
  if (id) {
    const array = id.split(',');
    return getUsers()
      .then((result) => {
        let coauthorNamesString = '';
        for (let i = 1; i < array.length; i++) {
          for (const user of result) {
            if (user.user_id === parseInt(array[i], 10)) {
              coauthorNamesString += `${user.first_name} ${user.last_name} `;
            }
          }
        }
        return coauthorNamesString;
      });
  }
  return '';
}

export function postUser(data) {
  // posts a new user
  return axios
    .post('http://localhost:3000/create-user', {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      access_id: data.access_id,
      node_id: data.node_id,
    })
    .then((response) => {
      console.log(response.data);
      switch (response.data) {
        case 'success':
          return true;
        case 'A user with the email address already exists':
          throw new Error('Email Address already exists');
        default:
          throw new Error(`Unhandled login error: ${response.data}`);
      }
    })
    .catch(error => console.log(error));
}

export function deleteUser(data) {
  // deletes a user
  // NOTE: not implemented for DEMO
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
  // returns a normalised user by id
  return axios
    .get(`http://localhost:3000/get-user/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function updateUser(data) {
  // updates a user by id
  const id = data.user_id;
  return axios
    .post(`http://localhost:3000/update-user/${id}`,
      {
        user_id: data.user_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        access_id: data.access_id,
        node_id: data.node_id,
      })
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export function newUser() {
  // returns default blank new user
  return {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    access_id: 0,
    node_id: 0,
  };
}
