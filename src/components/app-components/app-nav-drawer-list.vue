<!-- app-nav-drawer-list -->

<template>
  <v-list dense class="pt-0">
    <!-- Home Page -->
    <v-list-tile ripple :to="home.link">
      <v-list-tile-action>
        <v-icon class="gray--icon">{{ home.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ home.text }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <!-- Manage Nodes -->
    <v-list-tile v-if="this.accessLevel === 2 || this.accessLevel === 3" ripple :to="nodes.link">
      <v-list-tile-action>
        <v-icon class="gray--icon">{{ nodes.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ nodes.text }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <!-- Manage Users -->
    <v-list-tile v-if="this.accessLevel === 3" ripple :to="users.link">
      <v-list-tile-action>
        <v-icon class="gray--icon">{{ users.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ users.text }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <!-- Search Page -->
    <v-list-tile ripple :to="search.link">
      <v-list-tile-action>
        <v-icon>{{ search.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ search.text }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'app-nav-drawer-list',
  data() {
    return {
      home: { icon: 'home', text: 'Research Outputs', link: '/' },
      search: { icon: 'search', text: 'Search', link: '/search' },
      nodes: { icon: 'location_city', text: 'Manage Nodes', link: '/manage-nodes' },
      users: { icon: 'person_add', text: 'Manage Users', link: '/manage-users' },
    };
  },
  computed: {
    ...mapState({
      accessLevel: state => state.accessLevel,
    }),
  },

};
</script>
