import Vue from 'vue';
import App from './App';
import router from './router';
import { sync } from 'vuex-router-sync';
import store from '@/store/store';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';

Vue.use(Vuetify);
Vue.use(VeeValidate, {
  events: ''
});

Vue.config.productionTip = false;

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, Vuetify }
});
