<!-- report-button-panel -->

<template id="report-button-panel">
<v-card flat>
  <v-layout row>
  <v-card flat class="text-xs-left">
  <v-btn small flat @click.native="toggleShow"> Abstract </v-btn>
  </v-card>
  <v-spacer></v-spacer>
  <v-card flat class="text-xs-right">
    <v-btn v-show="this.$store.getters.showDetails" class="pr-0 mr-0" small flat @click.native="modifyReport">
      Modify</v-btn>
    <v-btn v-show="this.$store.getters.showDetails" class="pl-0 ml-0 mr-0 pr-0" small flat @click.native="deleteReport">
      Delete</v-btn>
    <v-btn class="ml-0 pl-0" primary small flat @click.native="changeReportContext">
      View</v-btn>
  </v-card>
  </v-layout>
</v-card>
</template>

<script>
import { deleteReport } from '../../utils/data-access';
import reportCreateDialog from '../pop-up-dialogs/report-create-dialog.vue';

export default {
  name: 'report-button-panel',
  props: ['show'],

  methods: {
    toggleShow() {
      // toggle abstract
      this.$emit('toggleShowMsg', !this.show);
    },
    changeReportContext() {
      // change ID of current report to view
      this.$emit('changeReportContext', 'viewing');
      this.$router.push('./report');
    },
    deleteReport() {
      // NB: Not implemented properly
      // change ID and fire delete of current ID
      this.$emit('changeReportContext', 'deleting');
      deleteReport(this.$store.getters.reportContext)
        .then(() => {
          // console.log('Fake Delete Executed');
          this.$route.push('/');
          // NOTE: can dispatch directly from here because report ID isn't needed
          this.$store.dispatch('changeReportContext', null);
        });
    },
    modifyReport() {
      // change ID and open dialog
      this.$emit('changeReportContext', 'updating');
      this.$store.dispatch('changeAddReportDialog');
    },
  },
  components: {
    reportCreateDialog,
  },
};
</script>

