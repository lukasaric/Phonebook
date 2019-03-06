<template>
  <v-toolbar fixed class="navbar" dark color="#0E0B16">
    <v-toolbar-title class="mr-4">
      <div class="navbar-brand">
        <a @click="navigateTo('home')" class="navbar-item">
          <img src="../assets/logo.png" alt="Phonebook"/>
        </a>
      </div>
    </v-toolbar-title>
    <h3> {{ name }} </h3>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!loggedIn" @click="navigateTo('login')" small flat> Login </v-btn>
      <v-btn v-if="!loggedIn" @click="navigateTo('register')" small flat> Sign Up </v-btn>
      <v-btn v-if="!loggedIn" @click="navigateTo('home')" small flat> Home </v-btn>
      <v-btn v-if="loggedIn" @click="navigateTo('contacts')" small flat> Contacts </v-btn>
      <v-btn v-if="loggedIn" @click="logout" small flat> Log out </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      name: 'Phonebook'
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    navigateTo(name) {
      this.$router.push({ name });
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    }
  }
};
</script>

<style scoped>
.navbar{
  text-align: center;
  line-height: 60px;
  top: 0;
  left: 0;
  width: 100%;
}
.home {
  cursor: pointer;
}
.navbar-brand .navbar-item img {
  max-width: 50px;
  margin-top:22px;
}
</style>
