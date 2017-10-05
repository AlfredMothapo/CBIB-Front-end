<!--report-modify-confirmation-dialog-->

<template>
  <v-dialog persistent v-model="showDialog">
    <v-card class="text-xs-center">
      <v-card-text v-if="confirmDialog">Are you sure you want to submit these changes?</v-card-text>
      <v-card-text v-if="errorDialog">There are missing fields.</v-card-text>
      <v-btn v-if="confirmDialog" @click.native="modifyReport">Yes</v-btn>
      <v-btn v-if="confirmDialog" @click.native="close">No</v-btn>
      <!-- Error Dialog -->
      <v-btn @click.native="close" v-show="errorDialog">Ok</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { contextState } from '../../state-machine';

export default {

  name: 'report-modify-confirmation-dialog',
  computed: {
    ...mapState({
      showDialog: state => state.confirmationDialog === contextState.CONFIRMREPORT || state.confirmationDialog === contextState.ERRORREPORT,
      errorDialog: state => state.confirmationDialog === contextState.ERRORREPORT,
      confirmDialog: state => state.confirmationDialog === contextState.CONFIRMREPORT,
    }),
  },
  methods: {
    close() {
      // close confirmation dialog
      this.$store.dispatch('changeConfirmationDialog', null);
    },
    modifyReport() {
      // call parent modify in report-modify-form
      this.$emit('modify');
    },
  },
};
</script>
