<!-- user-button-panel -->
<!-- Not Used in Demo -->
<template id="user-button-panel">
  <v-card flat>
    <v-layout row>
      <v-card flat class="text-xs-left">
      </v-card>
      <v-spacer></v-spacer>
      <v-card flat class="text-xs-right">
        <v-btn small flat @click.native="modifyUser">
          Modify</v-btn>
        <v-btn small flat primary @click.native="deleteUser">
          Delete User</v-btn>
      </v-card>
    </v-layout>
  </v-card>
</template>

<script>
import { contextState } from '../../state-machine';

export default {
  name: 'user-button-panel',
  props: ['userID'],
  methods: {
    deleteUser() {
      // change report context to deal with delete
      this.$store.dispatch('changeUserContext', { id: this.userID, state: contextState.DELETE });
    },
    modifyUser() {
      // change report context to deal with delete
      this.$store.dispatch('changeUserContext', { id: this.userID, state: contextState.UPDATE });
    },
  },
};
</script>

