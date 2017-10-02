import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* --------IMPLEMENTED-------- */
    // unsuccessful-login-dialog
    unsuccessfulLogin: false,
    // clears report-create-form
    clearReport: false,
    // shows logged in state
    loggedIn: false,
    // defines access level (and hence detailed/not detailed views)
    accessLevel: 0,
    // current viewable report id - TODO: change to ReportContext
    reportContext: null, // { id: 123, state: 'update' }
    userContext: null, // { id: 123, state: 'update' }
    nodeContext: null, // { id: 123, state: 'update' }
    // currently showing modal dialog
    modalDialog: null,
    // toggles user-modify-dialog
    confirmationDialog: null,
    // toggles login-dialog
    logInDialog: true,
    // defines logged in user ID
    loggedInUserID: null,
    // state used to toggle display of detailed information based on accessLevel
    showDetails: false,
    buttonDetails: false,
    // search input from search bar
    searchInput: '',
    toolTip: 'Add Report',
  },
  getters: {
    unsuccessfulLogin: state => state.unsuccessfulLogin,
    clearReport: state => state.clearReport,
    loggedIn: state => state.loggedIn,
    accesslevel: state => state.accessLevel,
    reportContext: state => state.reportContext,
    userContext: state => state.userContext,
    nodeContext: state => state.nodeContext,
    modalDialog: state => state.modalDialog,
    userDialog: state => state.userContext,
    logInDialog: state => state.logInDialog,
    loggedInUserID: state => state.loggedInUserID,
    showDetails: state => state.showDetails,
    buttonDetails: state => state.buttonDetails,
    searchInput: state => state.searchInput,
    toolTip: state => state.toolTip,
  },
  mutations: {
    toggleClearReport: (state) => {
      state.clearReport = !state.clearReport;
    },
    toggleUnsuccessfulLogin: (state) => {
      state.unsuccessfulLogin = !state.unsuccessfulLogin;
    },
    changeLoggedIn: (state, boolean) => {
      state.loggedIn = boolean;
    },
    changeAccessLevel: (state, newValue) => {
      state.accessLevel = newValue;
    },
    changeReportContext: (state, newValue) => {
      state.reportContext = newValue;
    },
    changeUserContext: (state, newValue) => {
      state.userContext = newValue;
    },
    changeNodeContext: (state, newValue) => {
      state.nodeContext = newValue;
    },
    changeModalDialog: (state, newValue) => {
      state.modalDialog = newValue;
    },
    changeUserDialog: (state, newValue) => {
      state.userDialog = newValue;
    },
    changeLogInDialog: (state, boolean) => {
      state.logInDialog = boolean;
    },
    changeLoggedInUserID: (state, newValue) => {
      state.loggedInUserID = newValue;
    },
    changeShowDetails: (state, boolean) => {
      state.showDetails = boolean;
    },
    changeButtonDetails: (state, boolean) => {
      state.buttonDetails = boolean;
    },
    changeReportDialog: (state, name) => {
      state.reportDialog = name;
    },
    changeConfirmationDialog: (state, name) => {
      state.confirmationDialog = name;
    },
    changeSearchInput: (state, name) => {
      state.searchInput = name;
    },
    changeToolTip: (state, name) => {
      state.toolTip = name;
    },
  },
  actions: {
    toggleUnsuccessfulLogin: (context) => {
      context.commit('toggleUnsuccessfulLogin');
    },
    toggleClearReport: (context) => {
      context.commit('toggleClearReport');
    },
    changeLoggedIn: (context, boolean) => {
      context.commit('changeLoggedIn', boolean);
    },
    changeAccessLevel: (context, newValue) => {
      context.commit('changeAccessLevel', newValue);
      if (newValue > 1) {
        context.commit('changeShowDetails', true);
        context.commit('changeButtonDetails', true);
      } else if (newValue > 0) {
        context.commit('changeShowDetails', false);
        context.commit('changeButtonDetails', true);
      } else {
        context.commit('changeShowDetails', false);
        context.commit('changeButtonDetails', false);
      }
    },
    changeReportContext: (context, newValue) => {
      context.commit('changeReportContext', newValue);
    },
    changeUserContext: (context, newValue) => {
      context.commit('changeUserContext', newValue);
    },
    changeNodeContext: (context, newValue) => {
      context.commit('changeNodeContext', newValue);
    },
    changeModalDialog: (context, newValue) => {
      context.commit('changeModalDialog', newValue);
    },
    changeUserDialog: (context, newValue) => {
      context.commit('changeUserDialog', newValue);
    },
    changeLogInDialog: (context, newValue) => {
      context.commit('changeLogInDialog', newValue);
    },
    changeLoggedInUserID: (context, newValue) => {
      context.commit('changeLoggedInUserID', newValue);
    },
    changeSearchInput: (context, newValue) => {
      context.commit('changeSearchInput', newValue);
    },
    changeToolTip: (context, newValue) => {
      context.commit('changeToolTip', newValue);
    },
    changeConfirmationDialog: (context, newValue) => {
      context.commit('changeConfirmationDialog', newValue);
    },
  },
});
