<!-- app-side-menu-list -->

<template>
<v-container class="ma-0 pa-0">
  <v-list>
    <!-- Log Out -->
    <v-list-tile @click.native="logOut" :to="logout.link" v-show="this.$store.getters.loggedIn">
      <v-list-tile-action>
        <v-icon class="gray--icon">{{ logout.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>{{ logout.text }}</v-list-tile-title>
    </v-list-tile>
    <!-- Log In -->
    <v-list-tile @click.native="logIn" :to="login.link" v-show="!this.$store.getters.loggedIn">
      <v-list-tile-action>
        <v-icon class="gray--icon">{{ login.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>{{ login.text }}</v-list-tile-title>
    </v-list-tile>
  </v-list>
</v-container>
</template>

<script>
export default {
  name: 'app-side-menu-list',
  data() {
    return {
      settings: { icon: 'settings', text: 'Settings', link: '/page' },
      logout: { icon: 'lock', text: 'Log Out', link: '/' },
      login: { icon: 'lock_open', text: 'Log In', link: '/' },
    };
  },
  methods: {
    logOut() {
      // change logged in state to false, show dialog (ripples home page 'hidden' view)
      this.$store.dispatch('changeLoggedIn', false);
      this.$emit('logout'); // to force drawer to close
      this.$store.dispatch('changeLogInDialog', true);
    },
    logIn() {
      // show dialog (ripples home page 'hidden' view)
      this.$emit('logout'); // to force drawer to close
      this.$store.dispatch('changeLogInDialog', true);
    },
  },
};
</script>
