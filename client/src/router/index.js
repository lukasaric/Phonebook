import Vue from 'vue';
import Router from 'vue-router';
import Contacts from '@/components/Contacts';
import Login from '@/components/Login';
import Register from '@/components/Register';
import addContact from '@/components/addContact';
import editContact from '@/components/editContact';
import Details from '@/components/details';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    }, {
      path: '/addContact',
      name: 'addContact',
      component: addContact
    },
    {
      path: '/editContact',
      name: 'editContact',
      component: editContact
    }, {
      path: '/details',
      name: 'details',
      component: Details
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
});

export default router;
