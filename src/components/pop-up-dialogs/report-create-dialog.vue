<!-- report-create-dialog -->

<template>
  <v-dialog v-model="showDialog" persistent width="800">
    <report-create-form></report-create-form>
  </v-dialog>
</template>

<script>
import reportCreateForm from '../forms/report-create-form.vue';

export default {
  name: 'report-create-dialog',
  data() {
    return {
    };
  },
  components: {
    reportCreateForm,
  },
  watch: {
    showDialog() {
      console.log(this);
      const dialogContext = this.$store && this.$store.getters.reportContext && this.$store.getters.reportContext.state;
      return dialogContext === 'updating' || dialogContext === 'creating';
    },
  },
  changeAddReportDialog() {
    // toggle report-create-dialog
    this.$store.dispatch('changeAddReportDialog');
  },
};
</script>
