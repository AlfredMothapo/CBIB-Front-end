<!-- ReportView -->

<template>
  <v-container class="report" fluid>
    <v-btn icon @click.native="back">
      <v-icon>keyboard_backspace</v-icon>
    </v-btn>
    
  <v-card flat fluid class="ma-0 pa-0">
    <v-layout row grid-xs-left>
      <v-flex xs10>
        <report-header :researchOutput="output"></report-header>
      </v-flex>
      <v-flex xs3 mt-3 grid-xs-right>
        <report-details v-if="this.$store.getters.showDetails" :details="output"></report-details>
      </v-flex>
    </v-layout>
  </v-card>
  <report-body :body="output.additional_info"></report-body>
  </v-container>
</template>

<script>
// import axios from 'axios';
import reportHeader from '../components/card-components/report-header.vue';
import reportBody from '../components/card-components/report-body.vue';
import reportDetails from '../components/card-components/report-details.vue';
import { getReport } from '../utils/data';

export default {
  name: 'report',
  data() {
    return {
      output: [{
      }],
    };
  },

  created() {
    // NB: using local data
    // set id of report to view
    const id = this.$store.getters.reportContext && this.$store.getters.reportContext.id;
    // get report
    if (id) {
      this.output = getReport(id);
    }
    // getReport(id)
    //   .then((output) => {
    //     this.output = output[0];
    //   });
  },
  methods: {
    back() {
      // return to home-view
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
