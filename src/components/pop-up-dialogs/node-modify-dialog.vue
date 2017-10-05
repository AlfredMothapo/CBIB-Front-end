<!-- node-modify-dialog -->

<template>
  <v-card>
    <v-dialog v-model="showDialog" persistent width="800">
      <node-modify-form-toolbar @close="clear"></node-modify-form-toolbar>
      <node-modify-form :node="node" ref="form" @submit="submit" @modify="modify"></node-modify-form>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { contextState, modalState } from '../../state-machine';
import { newNode, postNode, updateNode, getNode } from '../../services/data-access';
import nodeModifyForm from '../forms/node-modify-form.vue';
import nodeModifyFormToolbar from '../form-components/node-modify-form-toolbar.vue';

export default {
  name: 'node-modify-dialog',
  data() {
    return {
      node: newNode(),
    };
  },
  components: {
    nodeModifyForm,
    nodeModifyFormToolbar,
  },
  computed: {
    ...mapState({
      showDialog: state => state.modalDialog === modalState.MODIFYNODE,
      nodeContext: state => state.nodeContext,
    }),
  },
  watch: {
    nodeContext(state) {
      if (state && state.state === contextState.UPDATE) {
        // fetch node when updating
        getNode(state.id)
          .then((node) => {
            this.node = node;
          });
      } else if (state && state.state === contextState.CREATE) {
        this.node = newNode();
      }
    },
  },
  methods: {
    submit() {
      // check validation on form and show error or confirmation dialogs
      if (this.node.name && this.node.location && this.node.name !== '' && this.node.location !== '') { // checks validity
        this.$store.commit('changeConfirmationDialog', contextState.CONFIRMNODE);
      } else {
        this.$store.commit('changeConfirmationDialog', contextState.ERRORNODE);
      }
    },
    modify() {
      // NOTE: Update not implemented for DEMO
      // post node data and on success clear form
      if (this.nodeContext.state === contextState.CREATE) {
        postNode(this.node)
          .then(() => {
            this.close();
          });
      } else {
        updateNode(this.node)
          .then(() => {
            this.close();
          });
      }
    },
    clear() {
      // close confirmation dialog
      this.$store.dispatch('changeConfirmationDialog', null);
    },
    close() {
      // clear form and close node-modify-dialog
      this.$refs.form.clear();
      this.$store.dispatch('changeNodeContext', null);
    },
  },
};
</script>
