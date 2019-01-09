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
      path: '/contacts/:id/editContact',
      name: 'editContact',
      component: editContact,
      props: true
    }, {
      path: '/contacts/:id/details',
      name: 'details',
      component: Details,
      props: true
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
