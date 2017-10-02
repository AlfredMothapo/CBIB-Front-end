<!-- report-list -->

<template id="report-list">
  <v-expansion-panel expand>
    <v-expansion-panel-content v-for="item in outputs" :key="item.id">
      <report-header slot="header" :researchOutput="item"></report-header>
      <report-details class="pl-3" :details="item"></report-details>
      <report-body class="pl-3" :body="item"></report-body>
      <report-button-panel :report="item"></report-button-panel>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import reportBody from '../card-components/report-body.vue';
import reportDetails from '../card-components/report-details.vue';
import reportHeader from '../card-components/report-header.vue';
import reportButtonPanel from '../card-components/report-button-panel.vue';

export default {
  name: 'report-list',
  props: ['outputs'],
  components: {
    reportBody,
    reportDetails,
    reportHeader,
    reportButtonPanel,
  },
};
</script>
