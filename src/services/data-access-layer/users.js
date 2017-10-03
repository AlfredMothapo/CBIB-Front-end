import { cloneObject } from '../../utils/data-utils';
import { getNodeName } from './nodes';

export function getUsers() {
  // returns an array of user objects
  return Promise.resolve(users);
}

export function getUsersWithNodes() {
  // returns an array of user objects
  return Promise      // axios
    .resolve(users)   //  .get('/api/users')
    .then(results =>
      Promise.all(
        results.map(result =>
          getNodeName(result.node_id)
            .then((node) => {
              result.nodeName = node;
              return result;
            }))
      ));
}

export function getAuthorName(id) {
  // returns an array of user objects
  return getUsers()
    .then((result) => {
      for (const user of result) {
        if (user.user_id === id) {
          return `${user.first_name} ${user.last_name}`;
        }
      }
    });
}

export function getCoAuthorsNames(...id) {
  // returns an array of user objects
  return getUsers()
    .then((result) => {
      let coauthorNamesString = '';
      for (let i = 0; i < id[0].length; i++) {
        for (const user of result) {
          if (user.user_id === id[0][i]) {
            coauthorNamesString += `${user.first_name} ${user.last_name} `;
          }
        }
      }
      return coauthorNamesString;
    });
}

export function postUser(data) {
  const _data = cloneObject(data);
  lastUserId++;
  _data.user_id = lastUserId;
  users.push(_data);
  return Promise.resolve();
}

export function deleteUser(data) {
  const _data = cloneObject(data);
  const index = users.findIndex(x => x.user_id === _data);
  // const index = researchOutputs.indexOf(data);
  if (index > -1) {
    users.splice(index, 1);
  }
  // researchOutputs.push(_data);
  return Promise.resolve();
}

export function getUser(id) {
  return Promise.resolve(users)
    .then((users) => {
      for (const user of users) {
        if (user.user_id === id) {
          return user;
        }
      }
    });
}

export function updateUser(data) {
  const _data = cloneObject(data);
  const index = users.findIndex(x => x.user_id === _data.user_id);
  // const index = researchOutputs.indexOf(data);
  if (index > -1) {
    users[index] = _data;
  }
  // researchOutputs.push(_data);
  return Promise.resolve();
}

export function newUser() {
  return {
    user_id: lastUserId++,
    first_name: '',
    last_name: '',
    email: null,
    password: '',
    access_id: '0',
    node_id: null,
  };
}
/* ****** USERS CONSTANT ****** */
let lastUserId = 0;
export const users = [
  {
    user_id: lastUserId++,
    first_name: 'Sean',
    last_name: 'Wood',
    email: '1',
    password: '1',
    access_id: 2,
    node_id: 1,
  },
  {
    user_id: lastUserId++,
    first_name: 'Emilie',
    last_name: 'Wood',
    email: 'emilie@anotherway.co.za',
    password: '1234',
    access_id: 2,
    node_id: null,
  },
  {
    user_id: lastUserId++,
    first_name: 'Clinton',
    last_name: 'Wood',
    email: 'clint@anotherway.co.za',
    password: '12345',
    access_id: 1,
    node_id: null,
  },
  {
    user_id: lastUserId++,
    first_name: 'Caitlin',
    last_name: 'Wood',
    email: 'cait@anotherway.co.za',
    password: '123',
    access_id: 0,
    node_id: null,
  },
];
