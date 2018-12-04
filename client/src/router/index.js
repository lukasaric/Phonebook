import Vue from 'vue';
import Router from 'vue-router';
import Contacts from '@/components/Contacts';
import Login from '@/components/Login';
import Register from '@/components/Register';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
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
