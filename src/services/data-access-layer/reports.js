import { cloneObject } from '../../utils/data-utils';
import { getAuthorName } from './users';
import { getNodeName } from './nodes';
import { getVerificationDetails } from './helpers';
import { getPublicationType } from './publication-types';

export function getDetailedResearchOutputs() {
  // return and array of research outpus objects with details
  return Promise
    .resolve(cloneObject(researchOutputs))
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
              output.author_id = output.author;
              output.author = author;
              output.type = type;
              output.node = node;
              output.proof_verified = verificationDetails;
              return output;
            })
        ))
    );
}

export function getBasicResearchOutputs() {
  return getDetailedResearchOutputs()
    .then(outputs => outputs
      .map((output) => {
        delete output.proof_link;
        delete output.proof_verified;
        return output;
      })
    );
}

export function postResearchOutput(data) {
  const _data = cloneObject(data);
  lastId++;
  _data.id = lastId;
  researchOutputs.push(_data);
  return Promise.resolve();
}

export function deleteResearchOutput(data) {
  const _data = cloneObject(data);
  const index = researchOutputs.findIndex(x => x.id === _data);
  // const index = researchOutputs.indexOf(data);
  if (index > -1) {
    researchOutputs.splice(index, 1);
  }
  // researchOutputs.push(_data);
  return Promise.resolve();
}

export function updateResearchOutput(data) {
  const _data = cloneObject(data);
  const index = researchOutputs.findIndex(x => x.id === _data.id);
  // const index = researchOutputs.indexOf(data);
  if (index > -1) {
    researchOutputs[index] = _data;
  }
  // researchOutputs.push(_data);
  return Promise.resolve();
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
  // returns report given id
  return getDetailedResearchOutputs()
    .then((reports) => {
      for (const report of reports) {
        if (report.id === id) {
          return report;
        }
      }
    });
}

export function getNormalizedReport(id) {
  // returns report given id
  return Promise.resolve(researchOutputs)
    .then((reports) => {
      for (const report of reports) {
        if (report.id === id) {
          return report;
        }
      }
    });
}

let lastId = 0;
export const researchOutputs = [
  {
    id: lastId++,
    title: 'Hello This is a Long Journal Entry Name for Testing Purposes That Goes over the Edge Perhaps',
    type: 0,
    publication_year: '2017',
    author: 1,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'www.proof.com',
    proof_verified: true,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'A Non-Classical Logical Foundation for Naturalised Realism',
    type: 3,
    publication_year: '1996',
    author: 2,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'None',
    proof_verified: false,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'What\'s in an Attribute? Consequences for the Least Common Subsumer',
    type: 1,
    publication_year: '2013',
    author: 0,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'None',
    proof_verified: false,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: ' UniMoK: A System for Combining Equational Unification Algorithms',
    type: 2,
    publication_year: '2010',
    author: 2,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'www.proof.com',
    proof_verified: true,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'Optimisation Techniques for Combining Constraint Solvers',
    type: 1,
    publication_year: '2004',
    author: 1,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'www.proof.com',
    proof_verified: true,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'UniMoK: A System for Combining Equational Unification Algorithms.',
    type: 0,
    publication_year: '1999',
    author: 2,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'None',
    proof_verified: false,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'Complexity of Terminological Reasoning Revisited',
    type: 1,
    publication_year: '2015',
    author: 3,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'www.proof.com',
    proof_verified: true,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'Reasoning with Concrete Domains',
    type: 1,
    publication_year: '2009',
    author: 0,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'None',
    proof_verified: false,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'A Suggestion for an n-ary Description Logic.',
    type: 3,
    publication_year: '2008',
    author: 2,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'None',
    proof_verified: false,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'A NExpTime-complete Description Logic Strictly Contained in C',
    type: 1,
    publication_year: '2014',
    author: 1,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: null,
    proof_verified: true,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'PSpace Algorithm for Graded Modal Logic',
    type: 2,
    publication_year: '2014',
    author: 2,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: null,
    proof_verified: true,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'On the Complexity of Counting in Description Logics',
    type: 1,
    publication_year: '2001',
    author: 0,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'www.proof.com',
    proof_verified: true,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'The WHILE Hierarchy of Program Schemes is Infinite',
    type: 1,
    publication_year: '2016',
    author: 2,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'www.proof.com',
    proof_verified: true,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'On the Complexity of Boolean Unification',
    type: 3,
    publication_year: '1993',
    author: 0,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'None',
    proof_verified: false,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'Matching in Description Logics: Preliminary Results',
    type: 0,
    publication_year: '1995',
    author: 2,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'www.proof.com',
    proof_verified: true,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'Computing the least common subsumer and the most specific concept in the presence of cyclic ALN-concept descriptions.',
    type: 1,
    publication_year: '2013',
    author: 2,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'None',
    proof_verified: false,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
  {
    id: lastId++,
    title: 'Least common subsumer computation w.r.t. cyclic ALN-terminologies',
    type: 2,
    publication_year: '2015',
    author: 3,
    coauthors: [],
    additional_info: 'Matching of concepts with variables (concept patterns) is a relatively new operation that has been introduced in the context of concept description languages (description logics), originally to help filter out unimportant aspects of large concepts appearing in industrial-strength knowledge bases. This paper proposes a new approach to performing matching, based on a concept-centered normal form, rather than the more standard structural subsumption normal form for concepts. As a result, matching can be performed (in polynomial time) using arbitrary concept patterns of a description language allowing for conjunction, value restriction, and atomic negation, thus removing restrictions on the form of the patterns from previous work. The paper also addresses the question of matching problems with additional side conditions, which were motivated by practical experience.',
    proof_link: 'None',
    proof_verified: false,
    pdf: 'http://www.cair.za.net/sites/default/files/outputs/Ruttkamp-Bloem-ea.pdf',
    text: '',
  },
];
