import axios from 'axios';
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
            getNodeName(output.node),
            getVerificationDetails(output),
          ])
            .then(([author, type, node, verificationDetails]) => {
              output.author = author;
              output.type = type;
              output.node = node;
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
    .post('http://localhost:3000/outputs', data)
    .then(response => console.log(response.status))
    .catch(response => console.log(response));
}

export function deleteResearchOutput(data) {
  return axios
    .post(`http://localhost:3000/delete_research/${data}`)
    .then(response => console.log(response.status))
    .catch(error => console.log(error));
}

export function updateResearchOutput(data) {
  // Backend??
  console.log(data);
  // const _data = cloneObject(data);
  // const index = researchOutputs.findIndex(x => x.id === _data.id);
  // // const index = researchOutputs.indexOf(data);
  // if (index > -1) {
  //   researchOutputs[index] = _data;
  // }
  // // researchOutputs.push(_data);
  // return Promise.resolve();
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
  };
}

export function getReport(id) {
  // TODO: Change back to basic
  // returns report given id
  return axios
    .get(`http://localhost:3000/basic-research-output/${id}`)
    .then(output =>
      Promise.all([
        getAuthorName(output.author),
        getPublicationType(output.type),
      ])
        .then(([author, type]) => {
          output.author = author;
          output.type = type;
          return output;
        }))
    .catch(error => console.log(error));
}

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
