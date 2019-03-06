<template>
  <div class="signin-form">
    <v-form>
      <h1> Sing In </h1>
      <input v-model="credentials.email" type="email" placeholder="Email" class="txtb">
      <input v-model="credentials.password" type="password" placeholder="Password" class="txtb">
      <a @click="navigateTo('/register')"> Create account </a>
      <input @click="login" type="submit" value="Submit" class="signin-btn">
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ path: route });
    },
    login() {
      this.$store.dispatch('login', this.credentials)
        .then(() => {
          this.$router.push({ path: '/contacts' });
        });
    }
  }
};
</script>

<style scoped>
.signin-form {
  width: 400px;
  padding: 20px;
  text-align: center;
  background: url(../assets/form_bg.jpg);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.signin-form h1 {
  margin-top: 100px;
  color: #fff;
  font-size: 40px;
}

.signin-form input{
  display: block;
  width: 100%;
  padding: 0 16px;
  height: 44px;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  border: none;
}

.txtb {
  margin: 20px 0;
  background: rgba(255,255,255,.5);
  border-radius: 6px;
}

.signin-btn {
  margin-top: 60px;
  margin-bottom: 20px;
  background: #487eb0;
  color: #fff;
  border-radius: 44px;
  cursor: pointer;
  transition: 0.8s;
}

.signin-btn:hover {
  transform: scale(0.96);
}

.signin-form a {
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  padding: 10px;
  transition: 0.8s;
}

.signin-form a:hover {
  background: rgba(0,0,0,.3);
}
</style>
