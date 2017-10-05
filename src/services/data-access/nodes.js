import axios from 'axios';
import { getAuthorName } from './users';

export function postNode(data) {
  // posts node to create-node
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
  // gets a list of all nodes with all node data
  return axios
    .get('http://localhost:3000/get-nodes')
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function getNodesWithUsers() {
  // gets nodes with admin names instead of ids
  return axios
    .get('http://localhost:3000/get-nodes')
    .then(response =>
      Promise.all(
        response.data.map(result =>
          getAuthorName(result.nodeAdmin)
            .then((user) => {
              result.adminName = user;
              return result;
            }))
      ))
    .catch(error => console.log(error));
}

export function getNodeName(id) {
  // get the name of a node given the id
  return axios
    .get(`http://localhost:3000/get-node/${id}`)
    .then(response => response.data.name)
    .catch(error => console.log(error));
}

export function getNode(id) {
  // returns a node's information given the id
  return axios
    .get(`http://localhost:3000/get-node/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function deleteNode(id) {
  // deletes the node corresponding to the id
  return axios
    .delete(`http://localhost:3000/delete-node/${id}`)
    .then(response => response.status)
    .catch(error => console.log(error));
}

export function updateNode(data) {
  // updates a node corresponding to the id
  const id = data.node_id;
  return axios
    .post(`http://localhost:3000/update-node/${id}`,
      {
        node_id: data.node_id,
        name: data.name,
        description: data.description,
        location: data.location,
        nodeAdmin: data.nodeAdmin,
      })
    .then(response => response.status)
    .catch(error => console.log(error));
}

export function newNode() {
  // returns the default new node
  return {
    name: '',
    description: '',
    location: '',
    nodeAdmin: null,
  };
}
