<!-- unsuccessful-login-dialog -->

<template>
  <v-dialog persistent v-model="this.$store.getters.unsuccessfulLogin">
    <v-card class="text-xs-center">
      <v-card-text>Incorrect Details.
        Please try again or continue as a guest.</v-card-text>
        <v-btn @click.native="close">OK</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

  name: 'unsuccessful-login-dialog',
  methods: {
    close() {
      // toggle unsuccessful-login-dialog
      this.$store.dispatch('toggleUnsuccessfulLogin');
    },
  },
};
</script>
