<!-- node-button-panel -->

<template id="node-button-panel">
  <v-card flat>
    <v-layout row>
      <v-card flat class="text-xs-left">
      </v-card>
      <v-spacer></v-spacer>
      <v-card flat class="text-xs-right">
        <v-btn small flat @click.native="modifyNode">
          Modify</v-btn>
        <v-btn small flat primary @click.native="deleteNode">
          Delete Node</v-btn>
      </v-card>
    </v-layout>
  </v-card>
</template>

<script>
import { contextState } from '../../state-machine';

export default {
  name: 'node-button-panel',
  props: ['nodeID'],
  methods: {
    deleteNode() {
      // change report context to deal with delete
      this.$store.dispatch('changeNodeContext', { id: this.nodeID, state: contextState.DELETE });
    },
    modifyNode() {
      // change report context to deal with delete
      this.$store.dispatch('changeNodeContext', { id: this.nodeID, state: contextState.UPDATE });
    },
  },
};
</script>

