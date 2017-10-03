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
    type_id: 0,
    type: 'Book',
  },
  {
    type_id: 1,
    type: 'Journal',
  },
  {
    type_id: 2,
    type: 'Book Chapter',
  },
  {
    type_id: 3,
    type: 'Paper',
  },
];
