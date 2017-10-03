import axios from 'axios';

export function getPublicationTypes() {
  // returns a list of type objects
  return axios
    .get('http://localhost:3000/get-publication-types')
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function getPublicationType(id) {
  // returns a list of type objects
  return axios
    .get(`http://localhost:3000/get-publication-type/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}


export const publicationTypes = [
  {
    id: 0,
    name: 'Book',
  },
  {
    id: 1,
    name: 'Journal',
  },
  {
    id: 2,
    name: 'Book Chapter',
  },
  {
    id: 3,
    name: 'Paper',
  },
];
