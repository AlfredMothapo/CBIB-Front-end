<!-- report-confirm-clear-dialog-->

<template>
  <v-dialog persistent v-model="showDialog">
    <v-card class="text-xs-center">
      <v-card-text>Are you sure you want to clear these changes?</v-card-text>
      <v-btn @click.native="clearReport">Yes</v-btn>
      <v-btn @click.native="close">No</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { contextState } from '../../state-machine';

export default {

  name: 'confirm-clear-dialog',
  computed: {
    ...mapState({
      showDialog: state => state.confirmationDialog === contextState.CONFIRMREPORTCLEAR,
    }),
  },
  methods: {
    close() {
      // close confirmation dialog
      this.$store.dispatch('changeConfirmationDialog', null);
    },
    clearReport() {
      // fire parent clear in report-modify-dialog
      this.$emit('clear');
    },
  },
};
</script>
