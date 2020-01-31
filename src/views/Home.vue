<template>
  <div class="home">
    <div id="header">
      <img src="@/assets/logo.png">
    </div>
    <div>
      <div v-if="userName" class="btn btn-secondary accclick" @click="changeStuff"> {{ userName }}</div>
      <div v-else class="btn btn-secondary accclick">Welcome Newcommer!</div>
    </div>
    <Chat :authUser="userData" />
    <div>
      <button class="btn btn-primary logoutclick" @click="singOut">Logout</button>
    </div>
  </div>
</template>

<script>
import Chat from '@/components/Chat.vue'

export default {
  name: 'home',
  components: {
    Chat,
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.userName = user.displayName;
        this.userData = user;
        this.LoggedIn = true;
      } else{
        this.logedIn = false;
      }
    })
  },
  data() {
    return {
      LoggedIn: false,
      userName: '',
      userData: {},
    }
  },
  methods: {
    async singOut() {
      try{
        const data = await firebase.auth().signOut();
        this.$router.replace({name: "login"});
      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>

<style>
.accclick {
  font-size: 1.5em;
  cursor: default;
}
.logoutclick {
  font-size: 1.5em;
  margin: 20px
}
#header {
  padding: 50px 0px 25px 0px;
}
</style>
