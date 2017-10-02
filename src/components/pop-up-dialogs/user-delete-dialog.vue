<!--user-delete-dialog-->

<template>
  <v-dialog persistent v-model="showDialog">
    <v-card class="text-xs-center">
      <v-card-text>Are you sure you want to delete this user?</v-card-text>
      <v-btn @click.native="deleteUser">Yes</v-btn>
      <v-btn @click.native="close">No</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { deleteUser } from '../../services/data-access';
import { modalState } from '../../state-machine';

export default {

  name: 'user-delete-dialog',
  data() {
    return {
      // nothing for now
    };
  },
  computed: {
    ...mapState({
      showDialog: state => state.modalDialog === modalState.DELETEUSER,
    }),
  },
  methods: {
    close() {
      this.$store.dispatch('changeUserContext', null);
    },
    deleteUser() {
      deleteUser(this.$store.getters.userContext.id)
        .then(() => {
          // NOTE: can dispatch directly from here because report ID isn't needed
          this.$store.dispatch('changeUserContext', null);
        });
    },
  },
};
</script>
