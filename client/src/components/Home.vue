<template>
  <div class="landing-page">
    <div class="page-content">
      <h1> {{ name }} </h1>
      <p>Simple phonebook for personal use.</p>
      <v-btn @click="navigateTo" color="#f0932b" large flat outline> Get started </v-btn>
    </div>
  </div>
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
      const isLogged = this.$store.getters.isAuthenticated;
      if (!isLogged) this.$router.push({ name: 'login' });
      else this.$router.push({ name: 'contacts' });
    }
  }
};
</script>

<style scoped>

.landing-page {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
}
.landing-page::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/phone_bg.jpg) no-repeat;
  background-size: cover;
  opacity:  .5;
}
.page-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 100%;
  max-width: 100%;
  text-align: center;
  padding: 0 40px;
  box-sizing: border-box;
}
.page-content h1 {
  color: #f0932b;
  text-transform: uppercase;
  font-size: 60px;
  margin-bottom: 20px;
  font-weight: 700;
}
.page-content p {
  color:white;
  margin-bottom: 20px;
}
.page-content a{
  display: inline-block;
  text-decoration: none;
  color: #ff7979;
  border: 2px solid #ff7979;
  text-transform: uppercase;
  padding: 10px 20px;
  transition: 0.4s linear;
}
</style>
