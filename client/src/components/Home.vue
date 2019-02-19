<template>
  <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3"> {{ name }} </h3>
          <span class="subheading">Simple phonebook for personal use.</span>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">Click here to view contacts!</div>
          <v-btn @click="navigateTo" color="#07889B" large flat outline> Contacts </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>

export default {
  data() {
    return {
      name: 'Phonebook'
    };
  },
  methods: {
    navigateTo() {
      this.$router.push({ name: 'contacts' });
    }
  }
};
</script>

<style scoped>

</style>
