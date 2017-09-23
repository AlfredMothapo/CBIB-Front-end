<!-- report-create-dialog -->

<template>
  <v-dialog v-model="showDialog" persistent width="800">
    <report-create-form-toolbar @close="close"></report-create-form-toolbar>
    <report-create-form></report-create-form>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import reportCreateForm from '../forms/report-create-form.vue';
import reportCreateFormToolbar from '../form-components/report-create-form-toolbar.vue';
import { modalState } from '../../state-machine';

export default {
  name: 'report-create-dialog',
  data() {
    return {
    };
  },
  components: {
    reportCreateForm,
    reportCreateFormToolbar,
  },
  computed: {
    ...mapState({
      showDialog: state => state.modalDialog === modalState.MODIFY,
    }),
  },
  methods: {
    close() {
      this.$store.dispatch('changeReportContext', null);
    },
  },
  // changeAddReportDialog() {
  //   // toggle report-create-dialog
  //   this.$store.dispatch('changeAddReportDialog');
  // },
};
</script>
