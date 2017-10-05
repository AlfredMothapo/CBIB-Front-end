<!-- research-output-content-expander -->

<template id="research-output-content-expander">
  <v-card flat class="text-xs-center ml-0">
    <v-card flat fluid class="ml-2">
      <v-form ref="contentform">
        <v-text-field label="Enter Abstract Here" full-width multi-line v-model="report.additional_info">
        </v-text-field>
        <v-divider></v-divider>
        <v-text-field label="Enter Report Text Here" multi-line full-width v-model="report.text">
        </v-text-field>
        <v-divider></v-divider>
        <div class="text-xs-left">
          <v-btn flat icon v-tooltip:top="{ html: 'Attach Document' }">
            <file-upload ref="upload" v-model="files" post-action="/upload-pdf" put-action="/upload-pdf" @input-file="inputFile" @input-filter="inputFilter">
              <!-- Attach file -->
            <v-icon>attach_file</v-icon>
            </file-upload>
          </v-btn>
        </div>

      </v-form>
    </v-card>
  </v-card>
</template>

<script>
import VueUploadComponent from 'vue-upload-component';

export default {
  name: 'research-output-content-expander',
  props: ['report'],
  data() {
    return {
      files: [{
        blob: '',
      }],
    };
  },
  computed: {
    blob() {
      // get blob from file
      return this.files[0].blob;
    },
  },
  methods: {
    clear() {
      // clear form data
      this.$refs.contentform.reset();
    },
    inputFile(newFile, oldFile) {
    // change files when new file is selected
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log('response', newFile.response);
        if (newFile.xhr) {
          //  Get the response status code
          //  Required html5 support
          console.log('status', newFile.xhr.status);
        }
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      // add filters to input types
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp|pdf)$/i.test(newFile.name)) {
          return prevent();
        }
      }
      // Create a blob field
      newFile.blob = '';
      const URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file);
      }
    },
  },
  watch: {
    clearReport() {
      // watch global variable to fire local clear
      if (this.$store.getters.clearReport === true) {
        this.clear();
      }
    },
    blob() {
      // update pdf_link on report based on file blob change
      this.report.pdf_link = this.blob;
    },
  },
  components: {
    VueUploadComponent,
    FileUpload: VueUploadComponent,
  },
};
</script>
