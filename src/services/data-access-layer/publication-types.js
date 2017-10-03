export function getPublicationTypes() {
  // returns a list of type objects
  return Promise.resolve(publicationTypes);
}

export function getPublicationType(id) {
  // returns a list of type objects
  return getPublicationTypes()
    .then((result) => {
      for (const pub of result) {
        if (pub.type_id === id) {
          return pub.name;
        }
      }
    });
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
