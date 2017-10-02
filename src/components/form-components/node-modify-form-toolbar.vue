<!-- node-create-form-toolbar -->

<template id="node-modify-form-toolbar">
  <v-system-bar card fixed window>
    <div class="heading">{{ title }}</div>
    <v-spacer></v-spacer>
    <!-- NOTE: places close button to the right -->
    <v-btn icon @click.native="close">
      <v-icon class="icon-modify">close</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script>
import { mapState } from 'vuex';
import { contextState } from '../../state-machine';

export default {
  name: 'node-modify-form-toolbar',
  data() {
    return {
      title: 'Add New Node',
    };
  },
  computed: {
    ...mapState({
      nodeContext: state => state.nodeContext,
    }),
  },
  watch: {
    nodeContext(state) {
      // Defines header for modify dialog
      if (state && state.state === contextState.CREATE) {
        this.title = 'Add New Node';
      } else if (state && state.state === contextState.UPDATE) {
        this.title = 'Modify Node';
      }
    },
  },
  methods: {
    close() {
      // fire user-modify-dialog to close
      this.$store.dispatch('changeNodeContext', null);
    },
  },
};
</script>
