<!-- user-modify-form -->

<template id="user-modify-form">
  <v-card flat class="text-xs-center">
    <user-modify-confirmation-dialog @modify="modify" @clear="clear"></user-modify-confirmation-dialog>
    <user-confirm-clear-dialog @clear="clear"></user-confirm-clear-dialog>
    <!-- Input Form -->
    <v-card flat fluid class="ml-3 mr-3">
      <v-form ref="createform">
        <!-- Access Levels -->
        <div class="ma-0 pa-0">
          <v-radio-group hide-details v-model="user.access_id" :mandatory="false">
            <v-radio label="Global Administrator" value="3"></v-radio>
            <v-radio label="Node Administrator" value="2"></v-radio>
            <v-radio label="CAIR Member" value="1"></v-radio>
          </v-radio-group>
        </div>
        <!-- Personal Info -->
        <v-text-field label="First Name" required v-model="user.first_name">
        </v-text-field>
        <v-text-field label="Last Name" required v-model="user.last_name">
        </v-text-field>
        <v-text-field label="Email" :rules="emailRules" required type="email" v-model="user.email">
        </v-text-field>
        <v-select :items="nodes" item-text="name" item-value="node_id" v-model="user.node_id" label="Node" autocomplete></v-select>
      </v-form>
    </v-card>
    <!-- Button Panel -->
    <v-container fixed grid-list-xs text-xs-center>
      <v-btn flat class="ma-0 pa-0" @click="submit">submit</v-btn>
      <v-btn flat class="ma-0 pa-0" @click="confirmClear" v-if="clearButton">clear</v-btn>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import reportModifyFormToolbar from '../form-components/report-modify-form-toolbar.vue';
import userModifyConfirmationDialog from '../pop-up-dialogs/user-modify-confirmation-dialog.vue';
import userConfirmClearDialog from '../pop-up-dialogs/user-confirm-clear-dialog.vue';
import { contextState } from '../../state-machine';
import { getNodes } from '../../services/data-access';

export default {

  name: 'user-modify-form',
  props: ['user'],
  data() {
    return {
      valid: false,
      nodes: [],
      // RULES
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      clearButton: false,
    };
  },
  computed: {
    ...mapState({
      userContext: state => state.userContext,
    }),
  },
  watch: {
    userContext(state) {
      // Hide or show clear button
      if (state && state.state === contextState.CREATE) {
        this.clearButton = true;
      } else if (state && state.state === contextState.UPDATE) {
        this.clearButton = false;
      }
    },
  },
  components: {
    reportModifyFormToolbar,
    userModifyConfirmationDialog,
    userConfirmClearDialog,
  },
  methods: {
    confirmClear() {
      this.$store.dispatch('changeConfirmationDialog', contextState.CONFIRMUSERCLEAR);
    },
    clear() {
      // clear form data
      this.$refs.createform.reset();
      this.$store.dispatch('changeConfirmationDialog', null);
    },
    submit() {
      // convert access id to an integer
      // fire parent submit (in user-modify-dialog)
      const level = (typeof this.user.access_id !== 'number') ? parseInt(String(this.user.access_id), 10) : this.user.access_id;
      this.user.access_id = level;
      this.$emit('submit');
    },
    modify() {
      // convert access id to an integer
      // fire parent modify (in user-modify-dialog)
      const level = (typeof this.user.access_id !== 'number') ? parseInt(String(this.user.access_id), 10) : this.user.access_id;
      this.user.access_id = level;
      this.$emit('modify');
    },
  },
  mounted() {
    // return a list of nodes to choose from upon mount
    getNodes()
      .then((nodes) => { this.nodes = nodes; });
  },
};
</script>
