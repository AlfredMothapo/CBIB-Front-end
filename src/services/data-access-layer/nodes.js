import { cloneObject } from '../../utils/data-utils';
import { getAuthorName } from './users';

export function postNode(data) {
  const _data = cloneObject(data);
  lastNodeId++;
  _data.id = lastNodeId;
  nodes.push(_data);
  return Promise.resolve();
}

export function getNodes() {
  // returns an array of user objects
  return Promise.resolve(nodes);
}

export function getNodesWithUsers() {
  return Promise      // axios
    .resolve(nodes)   // .get('/api/users')
    .then(results =>
      Promise.all(
        results.map(result =>
          getAuthorName(result.nodeAdmin)
            .then((user) => {
              result.adminName = user;
              return result;
            }))
      ));
}

export function getNodeName(id) {
  // returns an array of user objects
  if (id !== null || id === 0) {
    return getNodes()
      .then((result) => {
        for (const node of result) {
          if (node.id === id) {
            return node.name;
          }
        }
      });
  }
  return Promise.resolve('None');
}

export function getNode(id) {
  return Promise.resolve(nodes)
    .then((nodes) => {
      for (const node of nodes) {
        if (node.id === id) {
          return node;
        }
      }
    });
}

export function deleteNode(data) {
  const _data = cloneObject(data);
  const index = nodes.findIndex(x => x.id === _data);
  if (index > -1) {
    nodes.splice(index, 1);
  }
  return Promise.resolve();
}

export function updateNode(data) {
  const _data = cloneObject(data);
  const index = nodes.findIndex(x => x.id === _data.id);
  if (index > -1) {
    nodes[index] = _data;
  }
  return Promise.resolve();
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
