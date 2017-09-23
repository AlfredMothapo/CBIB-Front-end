<!-- basic-info-expander -->

<template id="basic-info-expander">
  <v-card flat class="text-xs-center">
    <v-card flat fluid class="ml-3 mr-3 mt-0">
      <v-form v-model="valid" ref="basicinfo">
        <v-text-field label="Title" v-model="report.title">
        </v-text-field>
        <v-select :items="authors" item-text="name" item-value="id" v-model="author" label="Author" autocomplete></v-select>
        <v-select label="Co-Authors" v-bind:items="authors" v-model="coauthors" item-text="name" item-value="id" multiple chips max-height="auto" autocomplete>
          <template slot="selection" scope="data">
            <v-chip close @input="data.parent.selectItem(data.item)" :selected="data.selected" class="chip--select-multi" :key="JSON.stringify(data.id)">
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
        <v-layout row>
          <v-select :items="types" item-text="name" item-value="id" v-model="type" label="Publication Type" autocomplete></v-select>
          <v-spacer></v-spacer>
         <v-text-field label="Year" :rules="yearRules" item-text="publication_year" v-model="publication_year">
          </v-text-field>
        </v-layout>
      </v-form>
    </v-card>
  </v-card>
</template>

<script>
// import { getAuthors } from '../utils/data-access.js';
import { getPublicationTypes, getUsers } from '../../utils/data';

export default {

  name: 'basic-info-expander',
  props: ['report'],
  data() {
    return {
      valid: false,
      title: '',
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
        v => (v && v.length === 4) || 'Invalid year',
      ],
    };
  },
  created() {
    // NB: needs to be tested with changing data
    this.types = getPublicationTypes();
    this.authors = getUsers();
  },
  methods: {
    clear() {
      // clear form data
      this.$refs.basicinfo.reset();
    },
    submit() {
      // send data to report-modify-dialog
      this.$emit(this.data);
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
