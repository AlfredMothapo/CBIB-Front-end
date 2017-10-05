<!-- report-modify-dialog -->

<template>
  <v-card>
    <v-dialog v-model="showDialog" persistent width="800">
      <report-modify-form-toolbar></report-modify-form-toolbar>
      <report-modify-form ref="modifyform" :report="report" @submit="submit" @modify="modify" @clear="clear"></report-modify-form>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import reportModifyForm from '../forms/report-modify-form.vue';
import reportModifyFormToolbar from '../form-components/report-modify-form-toolbar.vue';
import reportModifyConfirmationDialog from '../pop-up-dialogs/report-modify-confirmation-dialog.vue';
import { contextState, modalState } from '../../state-machine';
import { newReport, getNormalizedReport, postResearchOutput, updateResearchOutput } from '../../services/data-access';


export default {
  name: 'report-modify-dialog',
  data() {
    return {
      report: newReport(),
    };
  },
  components: {
    reportModifyForm,
    reportModifyFormToolbar,
    reportModifyConfirmationDialog,
  },
  computed: {
    ...mapState({
      showDialog: state => state.modalDialog === modalState.MODIFYREPORT,
      reportContext: state => state.reportContext,
    }),
  },
  watch: {
    reportContext(state) {
      if (state && state.state === contextState.UPDATE) {
        // fetch report when updating (with id's not denormalised names
        // NB - Not implemented for DEMO
        getNormalizedReport(state.id)
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
    submit() {
      // check data before confirming submit, showing error dialog on incorrect data
      if (this.report.title !== '' && this.report.year !== null && this.report.type !== null) {
        this.$store.dispatch('changeConfirmationDialog', contextState.CONFIRMREPORT);
      } else {
        this.$store.dispatch('changeConfirmationDialog', contextState.ERRORREPORT);
      }
    },
    modify() {
      const report = this.report;
      // replace nulls with default values
      if (report.additional_info === '') {
        report.additional_info = 'No abstract available.';
      }
      // sets default author to current logged in user
      if (report.author === null) {
        report.author = this.$store.getters.loggedInUserID;
      }
      if (this.reportContext.state === contextState.UPDATE) {
        // NB: Not implemented for DEMO
        updateResearchOutput(report)
          .then((response) => {
            if (response === 'success') {
              this.close();
            } else if (response === 'A user with the email address already exists') {
              this.$store.dispatch('changeConfirmationDialog', contextState.ERRORUSER);
            }
          })
          .catch(error => console.log(error));
      } else {
        postResearchOutput(report)
          .then(() => {
            this.close();
          })
          .catch(error => console.log(error));
      }
    },
    clear() {
      // close confirmation dialog
      this.$store.dispatch('changeConfirmationDialog', null);
    },
    close() {
      // close report-modify-dialog
      this.$store.dispatch('changeReportContext', null);
    },
  },
};
</script>
