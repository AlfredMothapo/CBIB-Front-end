<!--node-delete-dialog-->

<template>
  <v-dialog persistent v-model="showDialog">
    <v-card class="text-xs-center">
      <v-card-text>Are you sure you want to delete this node?</v-card-text>
      <v-btn @click.native="deleteNode">Yes</v-btn>
      <v-btn @click.native="close">No</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { deleteNode } from '../../services/data-access';
import { modalState } from '../../state-machine';

export default {

  name: 'node-delete-dialog',
  computed: {
    ...mapState({
      showDialog: state => state.modalDialog === modalState.DELETENODE,
    }),
  },
  methods: {
    close() {
      // close node-modify-dialog
      this.$store.dispatch('changeNodeContext', null);
    },
    deleteNode() {
      // NOTE: Not implemented in DEMO
      // call delete node in data-access
      // close node-modify-dialog on success
      deleteNode(this.$store.getters.nodeContext.id)
        .then(() => {
          // NOTE: can dispatch directly from here because report ID isn't needed
          this.$store.dispatch('changeNodeContext', null);
        });
    },
  },
};
</script>
