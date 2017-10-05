<!-- user-confirm-clear-dialog -->

<template>
  <v-dialog persistent v-model="showDialog">
    <v-card class="text-xs-center">
      <v-card-text>Are you sure you want to clear these changes?</v-card-text>
      <v-btn @click.native="clearUser">Yes</v-btn>
      <v-btn @click.native="close">No</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { contextState } from '../../state-machine';

export default {

  name: 'user-confirm-clear-dialog',
  computed: {
    ...mapState({
      showDialog: state => state.confirmationDialog === contextState.CONFIRMUSERCLEAR,
    }),
  },
  methods: {
    close() {
      // close confirmatino dialog
      this.$store.dispatch('changeConfirmationDialog', null);
    },
    clearUser() {
      // emit parent clear method in user-modify-form
      this.$emit('clear');
    },
  },
};
</script>
