<!-- report-body -->

<template id="user-body">
  <v-card flat class="pl-4 pb-3">
    <v-divider class="mb-2"></v-divider>
    <div>Email: {{ body.email }}</div>
    <div>Access Level: {{ userAccessLevel }}</div>
    <div>Node: {{ body.nodeName }}</div>
  </v-card>
</template>

<script>
import { getAccessLevel } from '../../services/data-access';

export default {
  name: 'user-body',
  props: ['body'],
  computed: {
    userAccessLevel() {
      return getAccessLevel(this.body.accessLevel);
    },
  },
};
</script>
