<template>
  <div class="container ranking">
    <div class="bs-component">
      <div class="card mb-3">
        <h3 class="card-header">Top chatters</h3>
        Earn points by being online!
        <ol class="list-group list-group-flush">
          <li v-for="(ranks, index) in rankings" class="list-group-item">
            <router-link :to="{ name: 'User', params: {username: ranks.username}}">
              <span class="rank">{{ index+1 }}</span>
              <span v-bind:class="ranks.type" class="name">{{ranks.username}}</span>
              <span class="points">{{ranks.points}}</span>
            </router-link>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import checks from "../services/checks";

export default {
  data() {
    return {
      rankings: []
    };
  },

  async created() {
    let ranks = await checks.findRanks();
    ranks.shift();
    this.rankings = ranks;
  },
};
</script>

<style>
.ranking {
  max-width: 500px;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 10%;
}
.rank {
  float: left;
}
.red {
  color: #ee5f5b;
}
.points {
  float: right;
}
</style>
