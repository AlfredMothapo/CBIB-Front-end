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
          return pub.type;
        }
      }
    });
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
