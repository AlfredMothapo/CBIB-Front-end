
import store from './store';

export const contextState = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  VIEW: 'VIEW',
  DELETE: 'DELETE',
  ERROR: 'ERROR',
  CONFIRMREPORT: 'CONFIRMREPORT',
  CONFIRMREPORTCLEAR: 'CONFIRMREPORTCLEAR',
  ERRORREPORT: 'ERRORREPORT',
  CONFIRMUSER: 'CONFIRMUSER',
  CONFIRMUSERCLEAR: 'CONFIRMUSERCLEAR',
  ERRORUSER: 'ERRORUSER',
  CONFIRMNODE: 'CONFIRMNODE',
  CONFIRMNODECLEAR: 'CONFIRMNODECLEAR',
  ERRORNODE: 'ERRORNODE',
};

export const modalState = {
  NONE: null,
  MODIFYREPORT: 'MODIFYREPORT',
  MODIFYUSER: 'MODIFYUSER',
  MODIFYNODE: 'MODIFYNODE',
  DELETEREPORT: 'DELETEREPORT',
  DELETENODE: 'DELETENODE',
  DELETEUSER: 'DELETEUSER',
  CREATEUSER: 'CREATEUSER',
  CREATEREPORT: 'CREATEREPORT',
  CREATENODE: 'CREATENODE',
};

// watch for store changes to modify report state
store.watch(
  state => state.reportContext,
  (reportContext) => {
    if (reportContext) {
      if (reportContext.state === contextState.UPDATE || reportContext.state === contextState.CREATE) {
        store.commit('changeModalDialog', modalState.MODIFYREPORT);
      } else if (reportContext.state === contextState.DELETE) {
        store.commit('changeModalDialog', modalState.DELETEREPORT);
      }
    } else {
      // no context so...
      store.commit('changeModalDialog', modalState.NONE);
      store.commit('changeConfirmationDialog', modalState.NONE);
    }
  }
);

// watch for store changes to modify user state
store.watch(
  state => state.userContext,
  (userContext) => {
    if (userContext) {
      if (userContext.state === contextState.UPDATE || userContext.state === contextState.CREATE) {
        store.commit('changeModalDialog', modalState.MODIFYUSER);
      } else if (userContext.state === contextState.DELETE) {
        store.commit('changeModalDialog', modalState.DELETEUSER);
      }
    } else {
      // no context so...
      store.commit('changeModalDialog', modalState.NONE);
      store.commit('changeConfirmationDialog', modalState.NONE);
    }
  }
);

// watch for store changes to modify node state
store.watch(
  state => state.nodeContext,
  (nodeContext) => {
    if (nodeContext) {
      if (nodeContext.state === contextState.UPDATE || nodeContext.state === contextState.CREATE) {
        store.commit('changeModalDialog', modalState.MODIFYNODE);
      } else if (nodeContext.state === contextState.DELETE) {
        store.commit('changeModalDialog', modalState.DELETENODE);
      }
    } else {
      // no context so...
      store.commit('changeModalDialog', modalState.NONE);
      store.commit('changeConfirmationDialog', modalState.NONE);
    }
  }
);
