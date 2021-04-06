<template>
  <div class="container login">
    <div class="col-md-auto">
      <main>
        <h1>Login</h1>
        <p v-if="disable">
          <strong>Processing...</strong>
        </p>
        <p v-else-if="errorMessage" class="text-danger">
          <strong>{{errorMessage}}</strong>
        </p>
        <p>
          Email:
          <br />
          <input v-bind:disabled="disable" v-on:keyup.enter="login" type="text" v-model="email" />
        </p>
        <p>
          Password:
          <br />
          <input v-bind:disabled="disable" v-on:keyup.enter="login" type="password" v-model="password" />
        </p>
        <p><router-link :to="{ name: 'Signup' }">I don't have an account!</router-link></p>
        <button v-bind:disabled="disable" class="btn btn-primary" v-on:click="login">Submit</button>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disable: false,
      email: "",
      password: "",
      errorMessage: ""
    };
  },

  methods: {
    login() {
      this.disable = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(error => {
          this.errorMessage = error;
          this.disable = false;
        });
    }
  }
};
</script>

<style>
.login {
  max-width: 500px;
  text-align: center;
  margin-top: 13%;
}
</style>
