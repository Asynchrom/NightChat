<template>
  <div>
    <div class="lheader">
      <img src="@/assets/logo.png">
    </div>
    <div class="outer-box">
      <div class="register">
        <h1 class="logreg-header">Login<br><hr size="5"></h1>
        <div v-if="error">{{ error }} <br><br></div>
        <form @submit.prevent="pressed">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" ria-describedby="emailHelp">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <p class="clickable" @click="toRegister">New to this site? Register here!</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: '',
      error: ''
    }
  },
  methods: {
    async pressed() {
      try{
        await firebase.auth().signInWithEmailAndPassword(this.email,this.password);
        this.$router.replace({name: "home"});
      }catch(err){
        console.log(err)
        this.error = err;
      }
    },
    toRegister() {
      this.$router.replace({name: "register"});
    }
  }
}
</script>

<style>
.lheader {
  padding: 100px 0px 25px 0px;
}
.clickable:hover {
  cursor: pointer;
  text-decoration: underline;
}
hr {
  border: 1px solid #d6d6d6;

}
.outer-box {
  background-color: rgba(24, 29, 41, 10);
  border-radius: 25px;
  padding:40px;
  max-width: 350px;
  margin: auto;

}
.logreg-header{
  margin-bottom: 30px
}
 .register, p {
   max-width: 300px;
   margin: auto;
 }
</style>
