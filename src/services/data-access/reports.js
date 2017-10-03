import axios from 'axios';
import store from '../../store';
import { cloneObject } from '../../utils/data-utils';
import { getAuthorName } from './users';
import { getNodeName } from './nodes';
import { getVerificationDetails } from './helpers';
import { getPublicationType } from './publication-types';

export function getDetailedResearchOutputs() {
  // return and array of research outpus objects with details
  return axios
    .get('http://localhost:3000/detailed-research-outputs')
    .then(outputs => Promise.all(
      outputs
        .map(output =>
          Promise.all([
            getAuthorName(output.author),
            getPublicationType(output.type),
            getVerificationDetails(output),
          ])
            .then(([author, type, verificationDetails]) => {
              output.author = author;
              output.type = type;
              output.proof_verified = verificationDetails;
              return output;
            })
        ))
    )
    .catch(error => console.log(error));
}

export function getBasicResearchOutputs() {
  return axios
    .get('http://localhost:3000/basic-research-outputs')
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function postResearchOutput(data) {
  return axios
    .post('http://localhost:3000/outputs',
      {
        title: data.title,
        type: data.type,
        publication_year: data.publication_year,
        author: data.author,
        coauthors: data.coauthors,
        additional_info: data.additional_info,
        proof_link: data.proof_link,
        proof_verified: data.proof_verified,
        pdf_link: data.pdf_link,
        text: data.text,
      })
    .then(response => console.log(response.status))
    .catch(response => console.log(response));
}

export function deleteResearchOutput(data) {
  return axios
    .delete(`http://localhost:3000/delete-research-output/${data}`)
    .then(response => console.log(response.status))
    .catch(error => console.log(error));
}

export function updateResearchOutput(data) {
  const id = data.id;
  return axios
    .post(`http://localhost:3000/update-research-output/${id}`, {
      id: data.id,
      title: data.title,
      type: data.type,
      publication_year: data.publication_year,
      additional_info: data.additional_info,
      author: data.author,
      coauthors: data.coauthors,
      proof_verified: data.proof_verified,
      proof_link: data.proof_link,
      pdf_link: data.pdf_link,
      text: data.text,
    })
    .then(response => response.status)
    .catch(error => console.log(error));
}

export function getResearchOutputsSearch(search) {
  // returns a list of research outputs based on search
  // NB: Doesn't work yet
  return getDetailedResearchOutputs()
    .then((reports) => {
      const result = [];
      for (const report of reports) {
        for (const key of Object.keys(report)) {
          if (report[key] === search) {
            result.push(report);
          }
        }
      }
      if (result.length > 0) {
        return result;
      }
      return [];
    });
}

export function newReport() {
  return {
    // dialog: false,
    title: '',
    type: null,
    publication_year: null,
    author: null,
    coauthors: [],
    additional_info: '',
    proof_verified: false,
    proof_link: '',
    pdf_link: '',
    text: '',
  };
}

export function getReport(id) {
  return axios
    .get(`http://localhost:3000/detailed-research-output/${id}`)
    .then(output =>
      Promise.all([
        getAuthorName(output.author),
        getPublicationType(output.type),
        getVerificationDetails(output),
      ])
        .then(([author, type, verificationDetails]) => {
          output.author = author;
          output.type = type;
          output.proof_verified = verificationDetails;
          return output;
        }))
    .catch(error => console.log(error));
}

//   return axios
//     .get(`http://localhost:3000/basic-research-output/${id}`)
//     .then(output =>
//       Promise.all([
//         getAuthorName(output.author),
//         getPublicationType(output.type),
//       ])
//         .then(([author, type]) => {
//           output.author = author;
//           output.type = type;
//           return output;
//         }))
//     .catch(error => console.log(error));
// }

export function getDetailedReport(id) {
  return axios
    .get(`http://localhost:3000/detailed-research-output/${id}`)
    .then(output =>
      Promise.all([
        getAuthorName(output.author),
        getPublicationType(output.type),
        getNodeName(output.node),
        getVerificationDetails(output),
      ])
        .then(([author, type, node, verificationDetails]) => {
          output.author = author;
          output.type = type;
          output.node = node;
          output.proof_verified = verificationDetails;
          return output;
        }))
    .catch(error => console.log(error));
}

export function getNormalizedReport(id) {
  // returns report given id
  return axios
    .get(`http://localhost:3000/detailed-research-output/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}
