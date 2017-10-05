<!--user-modify-confirmation-dialog-->

<template>
  <v-dialog persistent v-model="showDialog">
      <v-card class="text-xs-center">
        <v-card-text v-if="confirmDialog">Are you sure you want to submit these changes?</v-card-text>
        <v-card-text v-if="errorDialog">There are missing fields.</v-card-text>
        <v-card-text v-if="errorDialogGeneral">That email address already exists.</v-card-text>
        <v-btn v-if="confirmDialog" @click.native="modifyUser">Yes</v-btn>
        <v-btn v-if="confirmDialog" @click.native="close">No</v-btn>
        <!-- Error Dialog -->
        <v-btn @click.native="close" v-show="errorDialog">Ok</v-btn>
        <v-btn @click.native="close" v-show="errorDialogGeneral">Ok</v-btn>
      </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { contextState } from '../../state-machine';

export default {
  name: 'user-modify-confirmation-dialog',
  computed: {
    ...mapState({
      showDialog: state => state.confirmationDialog === contextState.CONFIRMUSER || state.confirmationDialog === contextState.ERRORUSER || state.confirmationDialog === contextState.ERROR,
      errorDialog: state => state.confirmationDialog === contextState.ERRORUSER,
      errorDialogGeneral: state => state.confirmationDialog === contextState.ERROR,
      confirmDialog: state => state.confirmationDialog === contextState.CONFIRMUSER,
    }),
  },
  methods: {
    close() {
      // close confirmation dialog
      this.$store.dispatch('changeConfirmationDialog', null);
    },
    modifyUser() {
      // call parent modify method in user-modify-form
      this.$emit('modify');
    },
  },
};
</script>
