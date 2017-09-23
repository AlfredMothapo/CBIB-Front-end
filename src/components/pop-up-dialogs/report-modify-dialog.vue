<!-- report-modify-dialog -->

<template>
  <v-dialog v-model="showDialog" persistent width="800">
    <report-create-form-toolbar @close="close"></report-create-form-toolbar>
    <report-create-form :report="report"></report-create-form>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import reportCreateForm from '../forms/report-create-form.vue';
import reportCreateFormToolbar from '../form-components/report-create-form-toolbar.vue';
import { contextState, modalState } from '../../state-machine';
import { newReport, getReportX } from '../../utils/data';

export default {
  name: 'report-modify-dialog',
  data() {
    return {
      report: newReport(),
    };
  },
  components: {
    reportCreateForm,
    reportCreateFormToolbar,
  },
  computed: {
    ...mapState({
      showDialog: state => state.modalDialog === modalState.MODIFY,
      reportContext: state => state.reportContext,
    }),
  },
  watch: {
    reportContext(state) {
      if (state && state.state === contextState.UPDATE) {
        // fetch report when updating
        getReportX(state.id)
          .then((report) => {
            this.report = report;
          });
      } else {
        // set to empty report
        this.report = newReport();
      }
    },
  },
  methods: {
    close() {
      this.$store.dispatch('changeReportContext', null);
    },
  },
  // changeAddReportDialog() {
  //   // toggle report-modify-dialog
  //   this.$store.dispatch('changeAddReportDialog');
  // },
};
</script>
