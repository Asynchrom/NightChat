<template>
  <div class="container home">
    <div class="col-md-auto">
      <main>
        <h1>Night Chat</h1>
        <p>Welcome to the best night chat app in the world!</p>
        <p>Chat is available from 21:00 to 9:00</p>
        <p v-if="clock.timeOk" class="text-success">
          <strong>
            Your current time is
            <br />
            {{clock.hours}}h {{clock.minutes}}m {{clock.seconds}}s
          </strong>
        </p>
        <p v-else class="text-danger">
          <strong>
            Your current time is
            <br />
            {{clock.hours}}h {{clock.minutes}}m {{clock.seconds}}s
          </strong>
        </p>
        <button class="btn btn-primary" v-if="!store.isAuthenticated && clock.timeOk">
          <router-link :to="{ name: 'Signup' }">Signup</router-link>
        </button>
        <button class="btn btn-primary" v-if="!store.isAuthenticated && clock.timeOk">
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </button>
      </main>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import clock from "../services/clock.js";

export default {
  data() {
    return {
      store,
      clock
    };
  }
};
</script>

<style>
.home {
  max-width: 500px;
  text-align: center;
  margin-top: 15%;
}
</style>
