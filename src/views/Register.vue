<template>
  <div>
    <div class="lheader">
      <img src="@/assets/logo.png">
    </div>
    <div class="outer-box">
      <div class="register">
        <h1 class="logreg-header">Register<br><hr size="5"></h1>
        <div v-if="error">{{ error }} <br><br></div>
        <form @submit.prevent="pressed">
          <div class="form-group">
            <label for="exampleInputUsername">Username</label>
            <input type="username" class="form-control" id="exampleInputUsername" v-model="username" ria-describedby="usernameHelp">
            <label for="exampleInputUsername">Avatar URL</label>
            <input type="avatar" class="form-control" id="exampleInputAvatar" v-model="avatar" ria-describedby="avatarHelp">
          </div>
          ---
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
    <p class="clickable" @click="toLogin">Already a member?</p>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: '',
      error: '',
      avatar: 'https://picsum.photos/200'
    }
  },
  methods: {
    async pressed() {
      try{
        if(this.username.length < 6){
          throw 'Too short username!'
        }
        await firebase.auth().createUserWithEmailAndPassword(this.email,this.password);
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: this.username,
          photoURL: this.avatar
        })
        console.log(user)
        this.$router.replace({name: "home"});
      }catch(err){
        console.log(err)
        this.error = err;
      }
    },
    toLogin() {
      this.$router.replace({name: "login"});
    }
  }
}
</script>

<style>
.lheader {
  padding: 100px 0px 25px 0px;
}
hr {
  border: 1px solid #d6d6d6;

}
.clickable:hover {
  cursor: pointer;
  text-decoration: underline;
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
   color: #d6d6d6
 }
</style>
