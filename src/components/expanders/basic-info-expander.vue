<!-- basic-info-expander -->

<template id="basic-info-expander">
  <v-card flat class="text-xs-right">
    <v-card flat fluid class="ml-3 mr-3 mt-0">
      <div class="ma-0 pa-0 subheading text-xs-left">Basic Information</div>
      <v-form ref="basicinfo">
        <!-- Title -->
        <v-text-field label="Title" v-model="report.title" required>
        </v-text-field>
        <!-- Author -->
        <v-select :items="authors" item-text="name" item-value="user_id" v-model="report.author" label="Author" autocomplete></v-select>
        <!-- Co-Author -->
        <v-select label="Co-Authors" :items="authors" v-model="report.coauthors" item-text="name" item-value="user_id" multiple chips max-height="auto" autocomplete>
          <template slot="selection" scope="data">
            <v-chip close @input="data.parent.selectItem(data.item)" :selected="data.selected" class="chip--select-multi" :key="JSON.stringify(data.user_id)">
              {{ data.item.name }}
            </v-chip>
          </template>
          <template slot="item" scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
        <!-- Type and Year -->
        <v-layout row>
          <v-select :items="types" item-text="type" item-value="type_id" v-model="report.type" label="Publication Type" autocomplete required></v-select>
          <v-spacer></v-spacer>
          <v-text-field label="Year" :rules="yearRules" item-text="publication_year" v-model="report.publication_year" required>
          </v-text-field>
        </v-layout>
      </v-form>
    </v-card>
  </v-card>
</template>

<script>
import { getPublicationTypes, getUsers } from '../../services/data-access';

export default {

  name: 'basic-info-expander',
  props: ['report'],
  data() {
    return {
      valid: false,
      // will be an id (int)
      author: null,
      // will be an array of id's (ints)
      coauthors: [],
      type: null,
      publication_year: '',
      // fetched on created()
      authors: [],
      types: [],
      // RULES
      yearRules: [
        v => (v && v !== 0 && v.length === 4) || 'Invalid year',
      ],
    };
  },
  created() {
    // get a list of publication types and users for relative drop-down selections
    getPublicationTypes()
      .then((types) => { this.types = types; });
    getUsers()
      .then((users) => {
        this.authors = users.map((u) => {
          u.name = `${u.first_name} ${u.last_name}`;
          return u;
        });
      })
      .catch(error => console.log(error));
  },
  methods: {
    clear() {
      // clear form data
      this.$refs.basicinfo.reset();
    },
  },
  watch: {
    clearReport() {
      // watch global state to fire local clear
      if (this.$store.getters.clearReport === true) {
        this.clear();
      }
    },
  },
};
</script>
