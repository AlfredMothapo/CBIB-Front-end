<!-- App-->

<template>
  <v-app toolbar footer>
    
    <!-- Navigation Drawer -->
    <v-navigation-drawer persistent class="pb-0" absolute disable-route-watcher height="100%" clipped fluid v-model="show">
      <app-nav-drawer-list></app-nav-drawer-list>
    </v-navigation-drawer>    
    
    <!-- Toolbar -->
    <v-toolbar dark class="primary" v-show="!this.$store.getters.logInDialog">
      <v-toolbar-side-icon @click="show=!show"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{ this.$route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field solo label="Search" append-icon="search" v-model="searchInput"></v-text-field>

      <!-- Side Menu -->
      <v-menu clipped bottom right offset-y>
        <v-btn icon slot="activator" dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <app-side-menu-list @logout="show=false"></app-side-menu-list>
      </v-menu>
    </v-toolbar>

    <!-- Page View -->
    <main>
      <v-container fluid>
        <unsuccessful-login-dialog></unsuccessful-login-dialog>
        <login-dialog v-show="!this.$store.getters.unsuccessfulLoginDialog"></login-dialog>
        <router-view v-show="!this.$store.getters.logInDialog"></router-view>
        <report-create-dialog></report-create-dialog> 
        <v-btn v-show="!this.$store.getters.logInDialog && this.$store.getters.showDetails" class="pink" dark fixed bottom right fab @click.native="changeReportContext">
          <v-icon>add</v-icon>
        </v-btn>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import reportCreateDialog from './components/pop-up-dialogs/report-create-dialog.vue';
import appSideMenuList from './components/app-components/app-side-menu-list.vue';
import appNavDrawerList from './components/app-components/app-nav-drawer-list.vue';
import loginDialog from './components/pop-up-dialogs/login-dialog.vue';
import unsuccessfulLoginDialog from './components/pop-up-dialogs/unsuccessful-login-dialog.vue';

export default {
  name: 'app',
  data: () => ({
    search: false,
    icon: 'search',
    show: false,
    searchInput: '',
  }),
  components: {
    reportCreateDialog,
    appSideMenuList,
    appNavDrawerList,
    loginDialog,
    unsuccessfulLoginDialog,
  },
  methods: {
    changeReportContext() {
      // toggle report-create0dialog
      this.$store.dispatch('changeReportContext', { id: null, state: 'creating' });
    },
  },
};
</script>
