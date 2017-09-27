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
    // currently showing modal dialog
    modalDialog: null,
    // toggles user-create-dialog
    confirmationDialog: null,
    // toggles login-dialog
    logInDialog: true,
    // defines logged in user ID
    loggedInUserID: 0,
    // state used to toggle display of detailed information based on accessLevel
    showDetails: false,
    // search input from search bar
    searchInput: '',
  },
  getters: {
    unsuccessfulLogin: state => state.unsuccessfulLogin,
    clearReport: state => state.clearReport,
    loggedIn: state => state.loggedIn,
    accesslevel: state => state.accessLevel,
    reportContext: state => state.reportContext,
    addAuthorDialog: state => state.addAuthorDialog,
    logInDialog: state => state.logInDialog,
    loggedInUserID: state => state.loggedInUserID,
    showDetails: state => state.showDetails,
    searchInput: state => state.searchInput,
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
    changeAddAuthorDialog: (state) => {
      state.addAuthorDialog = !state.addAuthorDialog;
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
    changeModalDialog: (state, name) => {
      state.modalDialog = name;
    },
    changeConfirmationDialog: (state, name) => {
      state.confirmationDialog = name;
    },
    changeSearchInput: (state, name) => {
      state.searchInput = name;
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
      if (newValue > 0) {
        context.commit('changeShowDetails', true);
      } else {
        context.commit('changeShowDetails', false);
      }
    },
    changeReportContext: (context, newValue) => {
      context.commit('changeReportContext', newValue);
    },
    changeAddAuthorDialog: (context) => {
      context.commit('changeAddAuthorDialog');
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
    changeConfirmationDialog: (context, newValue) => {
      context.commit('changeConfirmationDialog', newValue);
    },
  },
});
