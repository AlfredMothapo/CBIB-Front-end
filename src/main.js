// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

import './state-machine';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueAxios, axios);

// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
