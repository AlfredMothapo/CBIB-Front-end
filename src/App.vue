<!-- App-->

<template>
  <v-app toolbar footer>

    <!-- Navigation Drawer -->
    <v-navigation-drawer persistent class="pb-0" absolute disable-route-watcher height="100%" clipped fluid v-model="show">
      <app-nav-drawer-list ></app-nav-drawer-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-toolbar dark class="primary blue-grey darken-2" v-show="!this.$store.getters.logInDialog">
      <v-toolbar-side-icon class="white-icon" @click.stop="show=!show"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{ this.$route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field solo label="Search" append-icon="search" v-on:keyup.enter="searchOnEnter" v-model="searchInputLocal"></v-text-field>

      <!-- Side Menu -->
      <v-menu clipped bottom right offset-y>
        <v-btn icon slot="activator" dark>
          <v-icon class="white-icon">more_vert</v-icon>
        </v-btn>
        <app-side-menu-list @logout="show = false"></app-side-menu-list>
      </v-menu>
    </v-toolbar>

    <!-- Page View -->
    <main>
      <v-container fluid>
        <report-modify-dialog></report-modify-dialog>
        <report-delete-dialog></report-delete-dialog>
        <unsuccessful-login-dialog></unsuccessful-login-dialog>
        <login-dialog v-show="!this.$store.getters.unsuccessfulLoginDialog"></login-dialog>
        <router-view v-show="!this.$store.getters.logInDialog"></router-view>
        <v-btn v-show="!this.$store.getters.logInDialog && this.$store.getters.showDetails" class="deep-orange darken-4 ma-4" v-tooltip:top="{ html: `${toolTip}` }" dark fixed bottom right fab @click.native="add">
          <v-icon class="white-icon">add</v-icon>
        </v-btn>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import appSideMenuList from './components/app-components/app-side-menu-list.vue';
import appNavDrawerList from './components/app-components/app-nav-drawer-list.vue';
import reportModifyDialog from './components/pop-up-dialogs/report-modify-dialog.vue';
import reportDeleteDialog from './components/pop-up-dialogs/report-delete-dialog.vue';
import loginDialog from './components/pop-up-dialogs/login-dialog.vue';
import unsuccessfulLoginDialog from './components/pop-up-dialogs/unsuccessful-login-dialog.vue';
import { contextState } from './state-machine';

export default {
  name: 'app',
  data: () => ({
    search: false,
    icon: 'search',
    show: false,
    searchInputLocal: '',
  }),
  components: {

    appSideMenuList,
    appNavDrawerList,
    loginDialog,
    reportModifyDialog,
    reportDeleteDialog,
    unsuccessfulLoginDialog,
  },
  computed: {
    ...mapState({
      toolTip: state => state.toolTip,
      searchInput: state => state.searchInput,
    }),
  },
  watch: {
    searchInput(state) {
      this.searchInputLocal = state;
    },
  },
  methods: {
    changeReportContext() {
      // toggle report-create0dialog
      this.$store.dispatch('changeReportContext', { id: null, state: contextState.CREATE });
    },
    changeUserContext(state) {
      // toggle report-create0dialog
      this.$store.dispatch('changeUserContext', {id: null, state });
    },
    changeNodeContext(state) {
      // toggle report-create0dialog
      this.$store.dispatch('changeNodeContext', { id: null, state });
    },
    searchOnEnter() {
      this.$store.dispatch('changeSearchInput', this.searchInputLocal);
      this.$router.push('/search');
    },
    add() {
      if (this.$route.path === '/' || this.$route.path === '/search' || this.$route.path === '/report') {
        this.changeReportContext();
      } else if (this.$route.path === '/manage-users') {
        this.changeUserContext(contextState.CREATE);
      } else if (this.$route.path === '/manage-nodes') {
        this.changeNodeContext(contextState.CREATE);
      }
    },
  },
};
</script>
<style>
  .list__tile__title {
    font-weight: 400;
    color: black !important;
  }
  
  .subheading {
    font-size: 15px !important;
    font-weight: 400;
  }
  
  .heading {
    font-size: 18px !important;
    font-weight: 500;
  }
  
  .gray--icon {
    color: gray !important;
  }

  .icon-modify {
    position:absolute !important;
  }

</style>
