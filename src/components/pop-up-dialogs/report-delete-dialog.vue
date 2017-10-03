<!--report-delete-dialog-->

<template>
  <v-dialog persistent v-model="showDialog">
    <v-card class="text-xs-center">
      <v-card-text>Are you sure you want to delete this?</v-card-text>
      <v-btn @click.native="deleteReport">Yes</v-btn>
      <v-btn @click.native="close">No</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { deleteResearchOutput } from '../../services/data-access';
import { modalState } from '../../state-machine';

export default {

  name: 'report-delete-dialog',
  data() {
    return {
      // nothing for now
    };
  },
  computed: {
    ...mapState({
      showDialog: state => state.modalDialog === modalState.DELETEREPORT,
    }),
  },
  methods: {
    close() {
      this.$store.dispatch('changeReportContext', null);
    },
    deleteReport() {
      deleteResearchOutput(this.$store.getters.reportContext.id)
        .then(() => {
          // NOTE: can dispatch directly from here because report ID isn't needed
          this.$store.dispatch('changeReportContext', null);
        });
    },
  },
};
</script>
