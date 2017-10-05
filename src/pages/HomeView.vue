<!-- Home.vue -->

<template ref="home">
  <v-container fluid>
    <v-layout row>
      <v-flex xs10>
      </v-flex>
      <v-flex xs3>
        <v-card style="background-color: transparent" flat fluid class="text-xs-right">
          <v-btn class="ma-0" flat @click.native="print">Generate Report</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <report-list :outputs="posts"></report-list>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { printOutputs } from '../utils/print-services';
import { getDetailedResearchOutputs, getBasicResearchOutputs } from '../services/data-access';
import reportList from '../components/app-components/report-list.vue';
import filterOrderBar from '../components/app-components/filter-order-bar.vue';

export default {
  name: 'home',
  data() {
    return {
      posts: {},
    };
  },
  computed: {
    ...mapState({
      accessLevel: state => state.accessLevel,
      reportContext: state => state.reportContext,
    }),
  },
  watch: {
    accessLevel(state) {
      // watch access level to decide what level of detail to display on research outputs
      if (state > 1) {
        getDetailedResearchOutputs()
          .then((posts) => {
            this.posts = posts;
          });
      } else {
        getBasicResearchOutputs()
          .then((posts) => {
            this.posts = posts;
          });
      }
    },
    reportContext(state) {
      // what report context for reload of research outputs
      if (state === null) {
        this.getResearchOutputs();
      }
    },
  },
  mounted() {
    // get reports to display in report-list
    // change Add button tooltip
    // refresh search input
    this.getResearchOutputs();
    this.$store.dispatch('changeToolTip', 'New Report');
    this.$store.dispatch('changeSearchInput', '');
  },

  components: {
    reportList,
    filterOrderBar,
  },

  methods: {
    print() {
      // fire print-services method for report generation
      printOutputs(this.accessLevel);
    },
    getResearchOutputs() {
      // method to get reports to display in report-list based on access level
      // used for reloading
      if (this.accessLevel > 1) {
        getDetailedResearchOutputs()
          .then((posts) => {
            this.posts = posts;
          });
      } else {
        getBasicResearchOutputs()
          .then((posts) => {
            this.posts = posts;
          });
      }
    },
  },
};
</script>
