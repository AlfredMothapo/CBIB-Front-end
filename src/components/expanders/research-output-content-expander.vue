<!-- research-output-content-expander -->

<template id="research-output-content-expander">
  <v-card flat class="text-xs-center ml-0">
    <v-card flat fluid class="ml-2">
      <v-form ref="contentform">
        <v-text-field label="Enter Abstract Here" full-width multi-line v-model="report.additional_info">
        </v-text-field>
        <v-divider></v-divider>
        <v-text-field label="Enter Content Here" multi-line full-width v-model="report.text">
        </v-text-field>
      </v-form>
    </v-card>
  </v-card>
</template>

<script>
export default {

  name: 'research-output-content-expander',
  props: ['report'],
  data() {
    return {
      // nothing
    };
  },
  methods: {
    clear() {
      // clear form data
      this.$refs.contentform.reset();
    },
  },
  watch: {
    clearReport() {
      // watch global variable to fire local clear
      if (this.$store.getters.clearReport === true) {
        this.clear();
      }
    },
  },
};
</script>
