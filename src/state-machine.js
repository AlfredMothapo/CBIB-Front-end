
import store from './store';

const NONE = null;
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';

const MODIFY = 'MODIFY';

store.watch(
  state => state.reportContext,
  (reportContext) => {
    if (reportContext) {
      if (reportContext.state === UPDATE || reportContext.state === CREATE) {
        store.commit('changeModalDialog', MODIFY);
      }
    } else {
      // no context so...
      store.commit('changeModalDialog', NONE);
    }
  }
);

export const contextState = {
  CREATE,
  UPDATE,
};

export const modalState = {
  NONE,
  MODIFY,
};
