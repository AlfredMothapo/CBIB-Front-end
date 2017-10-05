<!-- node-body -->

<template id="node-body">
  <v-card flat class="pl-4 pb-3">
    <v-divider class="mb-2"></v-divider>
    <div>Location: {{ body.location }}</div>
    <div>Administrator: {{ body.adminName }}</div>
    <div>Description: {{ body.description }}</div>
  </v-card>
</template>

<script>
export default {
  name: 'node-body',
  props: ['body'],
  data() {
    return {
      // nothing
    };
  },
  mounted() {
    if (this.body.description === '') {
      this.body.description = 'No Description';
    }
  },
};
</script>
