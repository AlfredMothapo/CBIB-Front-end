<!-- ReportView -->

<template>
  <v-container class="report" fluid>
    <v-btn icon @click.native="back">
      <v-icon>keyboard_backspace</v-icon>
    </v-btn>
    
  <v-card flat fluid class="ma-0 pa-0">
    <v-layout column grid-xs-left>
      <v-flex xs10 class="pl-2">
        <report-header :researchOutput="output"></report-header>
      </v-flex>
      <v-flex xs3 grid-xs-right>
        <report-details v-if="this.$store.getters.showDetails" :details="output"></report-details>
      </v-flex>
    </v-layout>
  </v-card>
  <report-body :body="output"></report-body>
  <v-divider></v-divider>
  <v-card flat>
    <v-card-text v-if="output.text !== ''">{{ output.text }}</v-card-text>
  </v-card>
  <v-layout row pt-1>
    <a class="pl-3" ref="document" target="_blank">Document</a><br/>
    <!-- <a class="pl-3" href="https://bitcoin.org/bitcoin.pdf">BibTeX</a> -->
    <a class="pl-3" ref="documentDownload" download="Downloaded Report">Download</a>
  </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import reportHeader from '../components/card-components/report-header.vue';
import reportBody from '../components/card-components/report-body.vue';
import reportDetails from '../components/card-components/report-details.vue';
import { getReport, newReport } from '../services/data-access';

export default {
  name: 'report',
  data() {
    return {
      output: newReport(),
    };
  },
  computed: {
    ...mapState({
      reportContext: state => state.reportContext,
    }),
  },
  mounted() {
    // set id of report to view
    // get report
    const _this = this;
    if (this.reportContext) {
      getReport(this.reportContext.id)
        .then((output) => {
          _this.output = output;
          // _this.$refs.document.href = output.pdf_link;
          // _this.$refs.documentDownload.href = output.pdf_link;
        });
    } else {
      this.output = newReport();
    }
    this.$store.dispatch('changeSearchInput', '');
  },
  methods: {
    back() {
      // return to home-view
      this.$store.dispatch('changeReportContext', null);
      this.$router.push('/');
    },
  },
  components: {
    reportHeader,
    reportBody,
    reportDetails,
  },
};
</script>
