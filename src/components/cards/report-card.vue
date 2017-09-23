<!-- report-card -->

<template id="report-card">
  <v-card flat>
    <v-container fluid class="ma-0 pa-0">
      <v-layout row grid-xs-left>
        <v-flex xs10>
          <report-header :researchOutput="item"></report-header>
        </v-flex>
        <v-flex xs3 mt-3 grid-xs-right>
          <report-details v-if="this.$store.getters.showDetails" :details="item"></report-details>
        </v-flex>
      </v-layout>
    </v-container>
    <report-body v-show="show" :body="item.additional_info"></report-body>
    <report-button-panel @changeReportContext="change" @toggleShowMsg="toggleShow"></report-button-panel>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import reportHeader from '../card-components/report-header.vue';
import reportBody from '../card-components/report-body.vue';
import reportButtonPanel from '../card-components/report-button-panel.vue';
import reportDetails from '../card-components/report-details.vue';

export default {

  name: 'report-card',
  props: ['item'],
  data() {
    return {
      show: false,
    };
  },
  components: {
    reportHeader,
    reportBody,
    reportButtonPanel,
    reportDetails,
  },
  methods: {
    toggleShow() {
      // toggle abstract view
      this.show = !this.show;
    },
    change(state) {
      // change view ID
      // done here because button-panel doesn't receive data
      this.$store.dispatch('changeReportContext', { id: this.item.id, state });
    },
  },
};
</script>
