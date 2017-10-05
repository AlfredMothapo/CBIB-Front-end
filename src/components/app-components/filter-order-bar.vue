<!-- filter-order-bar -->
<!-- NOT USED -->
<template id="filter-order-bar">
  <v-container class="ma-0 pa-0">
    <v-layout row left>
      <v-btn-toggle flat style="background-color: transparent" v-model="order">
        <v-btn flat :value="1">
          Name
        </v-btn>
        <v-btn flat :value="2">
          Date
        </v-btn>
        <v-btn flat :value="3">
          Type
        </v-btn>
        <v-btn flat :value="4">
          Node
        </v-btn>
      </v-btn-toggle>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'filter-order-bar',
  data() {
    return {
      order: null,
      filter: null,
    };
  },
};
</script>
