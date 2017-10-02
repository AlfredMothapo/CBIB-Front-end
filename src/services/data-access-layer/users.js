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
          getNodeName(result.node)
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
        if (user.id === id) {
          return `${user.first_name} ${user.last_name}`;
        }
      }
    });
}

export function postUser(data) {
  const _data = cloneObject(data);
  lastUserId++;
  _data.id = lastUserId;
  users.push(_data);
  return Promise.resolve();
}

export function deleteUser(data) {
  const _data = cloneObject(data);
  const index = users.findIndex(x => x.id === _data);
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
        if (user.id === id) {
          return user;
        }
      }
    });
}

export function updateUser(data) {
  const _data = cloneObject(data);
  const index = users.findIndex(x => x.id === _data.id);
  // const index = researchOutputs.indexOf(data);
  if (index > -1) {
    users[index] = _data;
  }
  // researchOutputs.push(_data);
  return Promise.resolve();
}

export function newUser() {
  return {
    id: lastUserId++,
    first_name: '',
    last_name: '',
    email: null,
    password: '',
    accessLevel: '0',
    node: null,
  };
}
/* ****** USERS CONSTANT ****** */
let lastUserId = 0;
export const users = [
  {
    id: lastUserId++,
    first_name: 'Sean',
    last_name: 'Wood',
    email: '1',
    password: '1',
    accessLevel: 2,
    node: 1,
  },
  {
    id: lastUserId++,
    first_name: 'Emilie',
    last_name: 'Wood',
    email: 'emilie@anotherway.co.za',
    password: '1234',
    accessLevel: 2,
    node: null,
  },
  {
    id: lastUserId++,
    first_name: 'Clinton',
    last_name: 'Wood',
    email: 'clint@anotherway.co.za',
    password: '12345',
    accessLevel: 1,
    node: null,
  },
  {
    id: lastUserId++,
    first_name: 'Caitlin',
    last_name: 'Wood',
    email: 'cait@anotherway.co.za',
    password: '123',
    accessLevel: 0,
    node: null,
  },
];
