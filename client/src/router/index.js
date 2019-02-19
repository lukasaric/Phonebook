import Vue from 'vue';
import Router from 'vue-router';
import Contacts from '@/components/Contacts';
import AddContact from '@/components/AddContact';
import EditContact from '@/components/EditContact';
import Details from '@/components/Details';
import Home from '@/components/Home';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    }, {
      path: '/addContact',
      name: 'addContact',
      component: AddContact
    },
    {
      path: '/contacts/:id/editContact',
      name: 'editContact',
      component: EditContact,
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
