<!-- node-list -->

<template id="node-list">
  <v-expansion-panel expand>
    <v-expansion-panel-content v-for="item in outputs" :key="item.node_id">
      <div slot="header">{{ item.name }}</div>
      <node-body :body="item"></node-body>
      <node-button-panel :nodeID="item.node_id"></node-button-panel>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import nodeBody from '../card-components/node-body.vue';
import nodeButtonPanel from '../card-components/node-button-panel.vue';

export default {
  name: 'node-list',
  props: ['outputs'],
  data() {
    return {
      // nothing
    };
  },
  components: {
    nodeBody,
    nodeButtonPanel,
  },
};
</script>
