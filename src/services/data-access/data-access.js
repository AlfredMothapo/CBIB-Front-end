// NOTE: Dummy file used during development - not used

import axios from 'axios';

export function getResearchOutputs() {
  // NB: contains hard-coded error data
  const post = {
    outputs: [
      {
        id: 0,
        title: 'Hello This is a Long Journal Entry Name for Testing Purposes That Goes over the Edge Perhaps',
        type: 'Journal',
        publication_year: '2017',
        Author_First_Name: 'Emilie',
        Author_Last_Name: 'Wood',
        additional_info: 'Just some hard-coded data that needs to probably be removed soon',
      },
      {
        id: 1,
        title: 'Hello',
        type: 'Journal',
        publication_year: '2017',
        Author_First_Name: 'Emilie',
        Author_Last_Name: 'Wood',
        additional_info: 'Just some hard-coded data that needs to probably be removed soon',
      },
    ],
  };
  return axios
    .get('http://localhost:3000/basic-research-outputs')
    .then(response => response.data)
    .catch(() => post);
}

export function postResearchOutput(data) {
  return axios
    .post('http://localhost:3000/outputs', {
      title: data.title,
      type: data.type,
      publication_year: data.publication_year,
      additional_info: data.additional_info,
      author: data.author,
      coauthors: data.coauthors,
      text: data.text,
    })
    .then(response => console.log(response.status))
    .catch(response => console.log(response));
}

export function updateResearchOutput(data) {
  // do nothing for now
  return data; // to get rid of errors
}

export function postUser(data) {
  // console.log('DEBUG: ', data);
  return axios
    .post('http://localhost:3000/create-account', {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      access_id: data.accessLevel,
      node_id: data.node,
    })
    .then(response => console.log(response.status))
    .catch(response => console.log(response, 'Post User Function Reached - Not Yet Implemented'));
}

export function getReport(id) {
  const post = [
    {
      id: 0,
      title: 'Hello',
      type: 'Journal',
      publication_year: '2017',
      Author_First_Name: 'Emilie',
      Author_Last_Name: 'Wood',
      additional_info: 'Just some hard-coded data that needs to probably be removed soon',
    },
  ];
  return axios
    .get(`http://localhost:3000/detailed_view/${id}`)
    .then(response => response.data)
    .catch(() => post);
}

export function deleteReport(data) {
  return axios
    .post('http://localhost:3000/delete-research-output', {
      id: data.id,
    })
    .then(response => response.data)
    .catch(() => 'DELETE: Not Implemented Yet');
}

export function postNode(data) {
  return axios
    .post('http://localhost:3000/create-node', {
      name: data.name,
      location: data.location,
      description: data.description,
      nodeAdmin: data.nodeAdmin,
    })
    .then(response => console.log(response.status))
    .catch(response => console.log(response, 'Post Node Function Reached - Not Yet Implemented'));
}

export function loginUser(username, password) {
  return axios
    .post('http://localhost:3000/login', {
      email: username,
      password,
    });
}

export function getUsers() {
  return axios
    .get('http://localhost:3000/get-users')
    .then(response => response.data)
    .catch(() => 'ERROR');
}

export function getAuthors() {
  return axios
    .get('http://localhost:3000/get-authors')
    .then(response => response.data)
    .catch(() => 'ERROR');
}
