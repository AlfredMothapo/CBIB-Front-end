<!-- Search.vue -->

<template>
  <v-container fluid>     
    <v-btn icon @click.native="back">
      <v-icon>keyboard_backspace</v-icon>
    </v-btn>
    <h6 class="pl-3">Search Results:</h6>
    <v-spacer></v-spacer>
    <report-list v-if="this.posts.length > 0" :outputs="posts"></report-list>
    <div v-if="this.posts.length === 0">No results.</div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { getResearchOutputsSearch } from '../services/data-access';
import reportList from '../components/app-components/report-list.vue';

export default {
  name: 'search',
  data() {
    return {
      posts: [],
      failed: false,
    };
  },
  computed: {
    ...mapState({
      searchInput: state => state.searchInput,
    }),
  },
  created() {
    // NOTE: Not implemented for DEMO
    getResearchOutputsSearch(this.searchInput)
      .then((result) => {
        this.posts = result;
      });
  },
  watch: {
    searchInput(state) {
      getResearchOutputsSearch(state)
        .then((result) => {
          this.posts = result;
        });
    },
  },
  methods: {
    back() {
      // return to home-view
      this.$router.push('/');
    },
  },
  components: {
    reportList,
  },
};
</script>
