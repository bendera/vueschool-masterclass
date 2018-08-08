// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import firebase from 'firebase/app';
import AppDate from '@/components/AppDate';
import App from './App';
import store from './store';
import router from './router';

Vue.component('AppDate', AppDate);

Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyAIFGRM-ek-IIct5eUycEboODTK0UB9YFM',
  authDomain: 'vue-school-forum-6be3a.firebaseapp.com',
  databaseURL: 'https://vue-school-forum-6be3a.firebaseio.com',
  projectId: 'vue-school-forum-6be3a',
  storageBucket: '',
  messagingSenderId: '583149945610',
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
