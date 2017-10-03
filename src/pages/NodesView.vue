<!-- NodesView -->

<template>
  <v-card flat fluid class="create pt-3" style="background-color: transparent">
    <node-modify-dialog></node-modify-dialog>
    <node-delete-dialog></node-delete-dialog>
    <v-divider></v-divider>
    <div class="pt-3">
      <h6>Existing Nodes</h6>
      <node-list :outputs="nodes"></node-list>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import nodeModifyDialog from '../components/pop-up-dialogs/node-modify-dialog.vue';
import nodeDeleteDialog from '../components/pop-up-dialogs/node-delete-dialog.vue';
import nodeList from '../components/app-components/node-list.vue';
import { getNodesWithUsers } from '../services/data-access';

export default {
  name: 'node-view',
  data() {
    return {
      nodes: [],
    };
  },
  components: {
    nodeModifyDialog,
    nodeDeleteDialog,
    nodeList,
  },
  computed: {
    ...mapState({
      nodeContext: state => state.nodeContext,
    }),
  },
  watch: {
    nodeContext(state) {
      if (state === null) {
        this.getNodesDetailed();
      }
    },
  },
  mounted() {
    getNodesWithUsers()
      .then((nodes) => {
        this.nodes = nodes;
      });
    this.$store.dispatch('changeToolTip', 'New Node');
  },
  methods: {
    getNodesDetailed() {
      getNodesWithUsers()
        .then((nodes) => {
          this.nodes = nodes;
        });
      this.$store.dispatch('changeToolTip', 'New Node');
      this.$store.dispatch('changeSearchInput', '');
    },
  },
};
</script>
