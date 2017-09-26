const users = [
  {
    id: 0,
    name: 'Emilie Wood',
    email: '1',
    password: '1',
    accessLevel: 2,
  },
  {
    id: 1,
    name: 'Emilie Wood',
    email: 'emilie@anotherway.co.za',
    password: '1234',
    accessLevel: 2,
  },
  {
    id: 2,
    name: 'Clinton Wood',
    email: 'clint@anotherway.co.za',
    password: '12345',
    accessLevel: 1,
  },
  {
    id: 3,
    name: 'Caitlin Wood',
    email: 'cait@anotherway.co.za',
    password: '123',
    accessLevel: 0,
  },
];

let lastId = 0;
const researchOutputs = [
  {
    id: lastId++,
    title: 'Hello This is a Long Journal Entry Name for Testing Purposes That Goes over the Edge Perhaps',
    type: 'Journal',
    publication_year: '2017',
    author: 'Emilie Wood',
    additional_info: 'Just some hard-coded data that needs to probably be removed soon',
    proof_link: 'www.proof.com',
    proof_verified: 1,
  },
  {
    id: lastId++,
    title: 'Hello',
    type: 'Book',
    publication_year: '2017',
    author: 'Clinton Wood',
    additional_info: 'Just some hard-coded data that needs to probably be removed soon',
    proof_link: null,
    proof_verified: 0,
  },
];

export function getUsers() {
  // returns an array of user objects
  return Promise.resolve(users);
}

export function getDetailedResearchOutputs() {
  // return and array of research outpus objects with details
  // NB: detailed logic is implemented in front-end using states
  return Promise.resolve(researchOutputs);
}

export function postResearchOutput(data) {
  lastId++;
  data.id = lastId;
  researchOutputs.push(data);
  console.log(data);
  console.log(researchOutputs);
  return Promise.resolve();
}

export function getResearchOutputsSearchX(search) {
  // returns a list of research outputs based on search
  // NB: Doesn't work yet
  const reports = getDetailedResearchOutputs();
  const result = [];
  for (const report of reports) {
    for (const key of Object.keys(report)) {
      if (report[key] === search) {
        console.log(report[key]);
        result.push(report);
      }
    }
  }
  if (result.length > 0) {
    console.log('got here');
    return result;
  }
  return [];
}

export function getResearchOutputsSearch(search) {
  return Promise.resolve(getResearchOutputsSearchX(search));
}

export function getReportX(id) {
  return Promise.resolve(getReport(id));
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
  const reports = getDetailedResearchOutputs();
  for (const report of reports) {
    if (report.id === id) {
      return report;
    }
  }
}

export function getPublicationTypes() {
  // returns a list of type objects
  return [
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
  ];
}

export function login(data) { // data is email and password
  // checks login details and return user or 0
  return getUsers()
    .then((result) => {
      for (const user of result) {
        if (user.email === data.email && user.password === data.password) {
          return user;
        }
      }
    });
}
