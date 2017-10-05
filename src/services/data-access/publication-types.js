import axios from 'axios';

export function getPublicationTypes() {
  // returns a list of type objects
  return axios
    .get('http://localhost:3000/get-publication-types')
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function getPublicationType(id) {
  // returns a publication type given the id
  console.log(id);
  return axios
    .get(`http://localhost:3000/get-publication-type/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}
