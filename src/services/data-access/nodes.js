import axios from 'axios';
import { cloneObject } from '../../utils/data-utils';
import { getAuthorName } from './users';

export function postNode(data) {
  return axios
    .post('http://localhost:3000/create-node', {
      name: data.name,
      location: data.location,
      description: data.description,
      nodeAdmin: data.nodeAdmin,
    })
    .then(response => response.status)
    .catch(error => console.log(error));
}

export function getNodes() {
  return axios
    .get('http://localhost:3000/get-nodes')
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function getNodesWithUsers() {
  return axios
    .get('http://localhost:3000/get-nodes')
    .then(response =>
      Promise.all(
        response.map(result =>
          getAuthorName(result.nodeAdmin)
            .then((user) => {
              result.adminName = user;
              return result;
            }))
      ))
    .catch(error => console.log(error));
}

export function getNodeName(id) {
  // returns an array of user objects
  return axios
    .get(`http://localhost:3000/get-node/${id}`)
    .then(response => response.data.name)
    .catch(error => console.log(error));
}

export function getNode(id) {
  return axios
    .get(`http://localhost:3000/get-node/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function deleteNode(id) {
  return axios
    .delete(`http://localhost:3000/delete-node/${id}`)
    .then(response => response.status)
    .catch(error => console.log(error));
}

export function updateNode(id) {
  return axios
    .post(`http://localhost:3000/update-node/${id}`)
    .then(response => response.status)
    .catch(error => console.log(error));
}

export function newNode() {
  return {
    id: lastNodeId++,
    name: '',
    description: '',
    location: '',
    nodeAdmin: null,
  };
}

let lastNodeId = 0;
export const nodes = [
  {
    id: lastNodeId++,
    name: 'UCT',
    description: 'Center for AI.',
    location: 'Cape Town',
    nodeAdmin: 2,
  },
  {
    id: lastNodeId++,
    name: 'Wits',
    description: 'Center for AI in Human Robotics',
    location: 'Pretoria',
    nodeAdmin: 2,
  },
  {
    id: lastNodeId++,
    name: 'Stellenbosch',
    description: 'Research Institute of AI',
    location: 'Western Cape',
    nodeAdmin: 1,
  },
  {
    id: lastNodeId++,
    name: 'UJ',
    description: 'Partners of Stellenbosch Node',
    location: 'Johannesburg',
    nodeAdmin: 0,
  },
];