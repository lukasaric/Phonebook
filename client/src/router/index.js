import Vue from 'vue';
import Router from 'vue-router';
import Contacts from '@/components/Contacts';
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
    }
  ]
});

export default router;
