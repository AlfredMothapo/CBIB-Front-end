<!-- research-output-content-expander -->

<template id="research-output-content-expander">
  <v-card flat class="text-xs-center ml-0">
    <v-card flat fluid class="ml-2">
      <v-form v-model="valid" ref="contentform">
        <v-text-field label="Enter Abstract Here" full-width multi-line v-model="abstract">
        </v-text-field>
        <v-divider></v-divider>
        <v-text-field label="Enter Content Here" multi-line full-width v-model="text">
        </v-text-field>
      </v-form>
    </v-card>
  </v-card>
</template>

<script>
export default {

  name: 'research-output-content-expander',
  data() {
    return {
      valid: false,
      text: '',
      abstract: '',
    };
  },
  methods: {
    clear() {
      // clear form data
      this.$refs.contentform.reset();
    },
    submit() {
      // send data to report-modify-dialog
      this.$emit(this.data);
    },
    watch: {
      clearReport() {
        // watch global variable to fire local clear
        if (this.$store.getters.clearReport === true) {
          this.clear();
        }
      },
    },
  },
};
</script>
