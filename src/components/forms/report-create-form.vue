<!-- report-create-form -->

<template id="report-create-form">
  <v-card class="text-xs-center">
    <author-create-dialog></author-create-dialog>

    <!-- Input Form -->
    <v-card flat fluid class="ma-3 pa-0">
        <h6 class="text-xs-left">New Research Output</h6>
        <v-card-text class="ma-0 pa-0">
          <v-expansion-panel invert class="ma-0 pa-0">
            <v-expansion-panel-content>
              <div slot="header">Basic Information</div>
              <basic-info-expander ref="basicinfo" :clear="clear"></basic-info-expander>
            </v-expansion-panel-content>
            <v-expansion-panel-content v-show="this.$store.getters.showDetails">
              <div slot="header">Detailed Information</div>
              <detailed-info-expander ref="detailedinfo" :clear="clear"></detailed-info-expander>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">Research Output Content</div>
              <research-output-content-expander ref="researchinfo"></research-output-content-expander>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
    </v-card>
    <!-- Button Panel -->
    <v-container slot="footer" fixed grid-list-xs text-xs-center>
      <v-btn flat class="ma-0 pa-0" @click="submit">submit</v-btn>
      <v-btn flat class="ma-0 pa-0" @click="clear">clear</v-btn>
    </v-container>

  </v-card>
</template>

<script>
import reportCreateFormToolbar from '../form-components/report-create-form-toolbar.vue';
import authorCreateDialog from '../pop-up-dialogs/author-create-dialog.vue';
import basicInfoExpander from '../expanders/basic-info-expander.vue';
import detailedInfoExpander from '../expanders/detailed-info-expander.vue';
import researchOutputContentExpander from '../expanders/research-output-content-expander.vue';
// import reportCreateFormHeader from './report-create-form-header';
// import { postResearchOutput } from '../../utils/data-access';

export default {

  name: 'report-create-form',
  data() {
    return {
      dialog: false,
      title: '',
      type: 0,
      publication_year: 1990,
      author: 0,
      coauthors: [],
      additional_info: '',
      proof_verified: false,
      proof_link: '',
    };
  },
  components: {
    reportCreateFormToolbar,
    authorCreateDialog,
    basicInfoExpander,
    detailedInfoExpander,
    researchOutputContentExpander,
  },
  watch: {
    update() {
      // NB: an attempt to get report-create-form to automatically load report
      // data if 'MODIFY' button is clicked
      if (this.$store.getters.update) {
        // console.log('The updated thing got here');
      } else {
        // console.log('The updated thing did not get here');
      }
    },
  },
  methods: {
    clear() {
      // clear form data
      this.$refs.basicinfo.clear();
      // this.$refs.detailedinfo.clear();
      this.$refs.researchinfo.clear();
    },
    close() {
      // clear data and update dialog state
      this.clear();
      this.changeAddReportDialog();
    },
    submit() {
      // NB: an attempt to implement submitting a new report
      // NB: not yet implemented
      this.title = this.$refs.basicinfo.title;
      this.type = this.$refs.basicinfo.type;
      this.publication_year = parseInt(this.$refs.basicinfo.publication_year, [10]);
      this.author = this.$refs.basicinfo.author;
      this.coauthors = this.$refs.basicinfo.coauthors;
      this.abstract = this.$refs.researchinfo.abstract;
      // only submit if detailed
      // this.proof_verified = this.$ref.detailedinfo.proof_verified;
      // this.proof_link = this.$ref.detailedinfo.proof_link;
      // this.$ref.home.posts = this.data;
      // postResearchOutput(this.data)
      //   .then(() => {
      //     this.close();
      //   });
    },
    changeAddReportDialog() {
      // toggle report-create-dialog
      this.$store.dispatch('changeAddReportDialog');
    },
    changeAddAuthorDialog() {
      // NB: not yet implemented
      // toggle author-create-dialog
      this.$store.dispatch('changeAddAuthorDialog');
    },
  },
};
</script>
