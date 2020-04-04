<template>
  <div id="app">
    <nav v-if="store.isAuthenticated" class="navbar navbar-expand-lg navbar-dark bg-primary">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">NightChat</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'User', params: {username: store.userProfile.displayName}}"
            >Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Ranking' }">Ranking</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Dashboard' }">Dashboard</router-link>
          </li>
        </ul>
        <button class="btn btn-lg clock">{{clock.hours}}h {{clock.minutes}}m {{clock.seconds}}s</button>
        <button v-on:click="logout" class="btn btn-secondary">Logout</button>
      </div>
    </nav>

    <router-view />
    <footer>
      <a href="https://github.com/Asynchrom" target="_blank">@Asynchrom</a>
    </footer>
  </div>
</template>

<script>
import store from "@/store.js";
import checks from "./services/checks";
import clock from "./services/clock";

export default {
  data() {
    return {
      store,
      clock,
      checks
    };
  },

  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push({ name: "Home" });
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        store.isAuthenticated = true;
        store.userProfile = user;
        store.points = await checks.returnPoints(store.userProfile.displayName);
        if (this.$route.name == "Login" || this.$route.name == "Signup") {
          this.$router.replace({ name: "Home" });
        }
      } else {
        store.isAuthenticated = false;
      }
    });
  }
};
</script>

<style>
footer {
  padding-top: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgb(0, 0, 0);
  background-color: rgb(30, 32, 34);
  color: white;
  text-align: center;
  height: 50px;
}
h1 {
  font-size: 3em;
}
button {
  margin: 0.2em;
}
.router-link-exact-active {
  background-color: rgb(30, 32, 34);
}

.clock:hover {
  cursor: default;
}
</style>
