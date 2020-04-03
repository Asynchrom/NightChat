<template>
  <div class="container signup">
    <h1>Signup</h1>
    <p v-if="disable">
      <strong>Processing...</strong>
    </p>
    <p v-else-if="errorMessage" class="text-danger">
      <strong>{{errorMessage}}</strong>
    </p>
    <p>
      Email:
      <br />
      <input type="text" v-bind:disabled="disable" v-on:keyup.enter="signup" v-model="email" />
    </p>
    <p>
      Password::
      <br />
      <input type="password" v-bind:disabled="disable" v-on:keyup.enter="signup" v-model="password" />
    </p>
    <p>
      Username:
      <br />
      <input type="text" v-bind:disabled="disable" v-on:keyup.enter="signup" v-model="username" />
    </p>
    <input type="radio" value="Mr" v-model="gender" />
    <label id="one">Mr</label>
    <input type="radio" id="two" value="Miss" v-model="gender" />
    <label>Miss</label>
    <br />
    <button v-bind:disabled="disable" class="btn btn-primary" v-on:click="signup">Submit</button>
  </div>
</template>

<script>
import checks from "../services/checks"
import store from "../store"

export default {
  data() {
    return {
      disable: false,
      gender: "Mr",
      email: "",
      password: "",
      username: "",
      errorMessage: ""  
    };
  },

  methods: {
    async signup() {
      this.disable = true;
      if (await checks.checkUsername(this.username)) {
        this.errorMessage = "Username is already taken!";
        this.disable = false;
      } else if (this.gender && this.email && this.password && this.username) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            user.user.updateProfile({
                  displayName: this.username,
              })
              .then(() => {
                db.collection("users").doc(this.username).set({
                  username: this.username,
                  imageURL: '',
                  groups: [],
                  gender: this.gender,
                  points: 0,
                  description: 'No description',
                  type: "white"
                })
                  .then(() => {
                    store.userProfile = firebase.auth().currentUser;
                  })
                  .catch(error => {
                    // TODO
                  })
                .catch(error => {
                  // TODO
                });
              })
              .catch(error => {
                // TODO
              });
          })
          .catch(error => {
            this.errorMessage = error.message;
            this.disable = false;
          });
      } else {
        this.errorMessage = "Please fill everything before submiting!";
        this.disable = false;
      }
    }
  }
};
</script>

<style>
.signup {
  max-width: 500px;
  text-align: center;
  margin-top: 10%;
}
#one {
  margin-right: 1em;
}
</style>
