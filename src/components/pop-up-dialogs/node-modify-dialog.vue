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
import { newNode, postNode, updateNode, getNode } from '../../services/data-access-layer';
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
        // fetch report when updating
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
      // post node data and on success clear form
      if (this.node.name && this.node.location && this.node.name !== '' && this.node.location !== '') { // checks validity
        this.$store.commit('changeConfirmationDialog', contextState.CONFIRMNODE);
      } else {
        this.$store.commit('changeConfirmationDialog', contextState.ERRORNODE);
      }
    },
    modify() {
      if (this.nodeContext.state === contextState.CREATE) {
        postNode(this.node)
          .then(() => {
            this.close();
          });
      } else {
        console.log('update', this.node);
        updateNode(this.node)
          .then(() => {
            this.close();
          });
      }
    },
    clear() {
      this.$store.dispatch('changeConfirmationDialog', null);
    },
    close() {
      this.$refs.form.clear();
      this.$store.dispatch('changeNodeContext', null);
    },
  },
};
</script>
