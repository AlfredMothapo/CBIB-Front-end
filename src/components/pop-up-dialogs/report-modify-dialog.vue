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
        // fetch report when updating (with id's not denormalised names)
        getNormalizedReport(state.id)
          .then((report) => {
            let coauthors = null;
            const coauthorsArray = [];
            if (report.coauthors !== '') {
              coauthors = report.coauthors.split(',');
              for (let i = 1; i < coauthors.length; i++) {
                coauthorsArray.push(parseInt(coauthors[i], 10));
              }
            }
            this.report = report;
            this.report.coauthors = coauthorsArray;
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
        // NOTE: Not implemented for DEMO
        updateResearchOutput(report)
          .then(() => {
            this.close();
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
