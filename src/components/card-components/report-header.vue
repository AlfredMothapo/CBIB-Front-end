<!-- report-header -->

<template id="report-header">
  <v-card flat class="pt-2 pb-2 pl-2">
    <!-- <v-card-text class="pb-0 mb-0"> -->
    <div class="subheading">{{ researchOutput.title }}</div>
    <!-- </v-card-text> -->
    <v-container fluid class="ma-0 pa-0">
      <v-layout row>
        <p class="pa-0 ma-0">{{ researchOutput.author }}</p>
        <!-- <p class="pa-0 ma-0 ml-2 mr-2 grey--text">|</p> -->
        <p class="pa-0 ma-0 ml-2 grey--text">{{ researchOutput.coauthors }}</p>
        <v-spacer></v-spacer>
        <p class="pa-0 ma-0 grey--text">{{ researchOutput.type }}</p>
        <p class="pa-0 ma-0 ml-2 grey--text">|</p>
        <p class="pa-0 ma-0 ml-2 mr-4 grey--text">{{ researchOutput.publication_year }}</p>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'report-header',
  props: ['researchOutput'],
  methods: {
    toggleShow() {
      // toggle abstract
      this.$emit('toggleShowMsg', !this.show);
    },
  },
};
</script>
