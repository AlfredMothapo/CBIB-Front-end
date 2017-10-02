/* eslint no-undef: 0 */
/* Print Services for Generating Reports */
import 'print.js/dist/print.min';
import { getBasicResearchOutputs, getDetailedResearchOutputs } from '../services/data-access';

export function printJSON(json, ...props) {
  // transform into require json
  printJS({
    printable: json,
    properties: props,
    type: 'json',
  });
}

function printBasic() {
  getBasicResearchOutputs()
    .then((result) => {
      console.log(result);
      printJS({
        printable: result,
        properties: ['title', 'author', 'publication_year', 'type'],
        type: 'json',
      });
    });
}

function printDetailed() {
  getDetailedResearchOutputs()
    .then((result) => {
      printJS({
        printable: result,
        properties: ['title', 'author', 'publication_year', 'type', 'proof_verified', 'proof_link'],
        type: 'json',
      });
    });
}

export function printOutputs(access) {
  // transform into require json
  if (access > 1) {
    printDetailed();
  } else {
    printBasic();
  }
}
