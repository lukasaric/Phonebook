<template>
  <v-toolbar fixed class="navbar" dark color="#0E0B16">
    <v-toolbar-title class="mr-4">
      <div class="navbar-brand">
        <a @click="navigateTo('/contacts')" class="navbar-item">
          <img src="../assets/logo.png" alt="Phonebook"/>
        </a>
      </div>
    </v-toolbar-title>
    <h1>{{ name }}</h1>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="navigateTo('/contacts')" flat>Contacts</v-btn>
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
  methods: {
    navigateTo(route) {
      this.$router.push({ path: route });
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
