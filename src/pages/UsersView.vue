<!-- UsersView -->

<template>
  <v-card flat fluid class="create pt-3" style="background-color: transparent">
    <user-delete-dialog></user-delete-dialog>
    <user-modify-dialog></user-modify-dialog>
    <div class="pt-3">
      <h6>Existing Users</h6>
      <user-list :outputs="users"></user-list>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import userModifyForm from '../components/forms/user-modify-form.vue';
import userModifyDialog from '../components/pop-up-dialogs/user-modify-dialog.vue';
import userDeleteDialog from '../components/pop-up-dialogs/user-delete-dialog.vue';
import userList from '../components/app-components/user-list.vue';
import { getUsersWithNodes } from '../services/data-access';

export default {
  name: 'user-view',
  data() {
    return {
      users: [],
    };
  },
  computed: {
    ...mapState({
      userContext: state => state.userContext,
    }),
  },
  components: {
    userModifyForm,
    userModifyDialog,
    userDeleteDialog,
    userList,
  },
  watch: {
    userContext(state) {
      // watch user context to refresh user list with Node Names
      if (state === null) {
        getUsersWithNodes()
          .then((users) => {
            this.users = users;
          });
      }
    },
  },
  mounted() {
    // get user to display in user-list
    // change search input to nothing
    // change Add button tooltip
    getUsersWithNodes()
      .then((users) => {
        this.users = users;
      });
    this.$store.dispatch('changeSearchInput', '');
    this.$store.dispatch('changeToolTip', 'New User');
  },
};
</script>
