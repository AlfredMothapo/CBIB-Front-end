<!-- login-card -->

<template id="login-card">
  <v-container class="text-xs-center">
    <v-layout column>
      <v-flex class="text-xs-left">
        <h6>Login</h6>
      </v-flex>
      <v-form ref="loginform">
        <v-flex>
          <v-text-field label="Email" v-model="email"></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field label="Password" type="password" v-model="password"></v-text-field>
        </v-flex>
      </v-form>
    </v-layout>
    <v-btn @click.native="loginAccess">Login</v-btn>
    <v-btn @click.native="guestAccess">Continue as Guest</v-btn>
  </v-container>
</template>

<script>
import { login } from '../../services/data-access';

export default {
  name: 'login-card',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginAccess() {
      // check login details, on successful, change access level and other states
      // change route and clear login form
      // on unsuccessful, show dialog
      login(this)
        .then((user) => {
          this.$store.dispatch('changeAccessLevel', user.accessLevel);
          this.$store.dispatch('changeLoggedInUserID', user.id);
          this.$store.dispatch('changeLoggedIn', true);
          this.$store.dispatch('changeLogInDialog', false);
          this.$router.push('/');
          this.$refs.loginform.reset();
        })
        .catch((error) => {
          if (error && error.message === 'Invalid login') {
            this.$store.dispatch('toggleUnsuccessfulLogin');
          } else {
            console.log('Handle other error', error);
          }
        });
      // .then((user) => {
      //   if (!user) {
      //     this.$store.dispatch('toggleUnsuccessfulLogin');
      //   } else {
      //     this.$store.dispatch('changeAccessLevel', user.accessLevel);
      //     this.$store.dispatch('changeLoggedInUserID', user.id);
      //     this.$store.dispatch('changeLoggedIn', true);
      //     this.$store.dispatch('changeLogInDialog', false);
      //     this.$router.push('/');
      //     this.$refs.loginform.reset();
      //   }
      // });
    },
    guestAccess() {
      // set access level to observer, continue to home, reset login form
      this.$store.dispatch('changeAccessLevel', 0);
      this.$store.dispatch('changeLogInDialog', false);
      this.$router.push('/');
      this.$refs.loginform.reset();
    },
  },
};
</script>
