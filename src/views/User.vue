<template>
  <div class="bs-component user">
    <div class="row">
      <div class="col">
        <div class="bs-component">
          <div class="card mb-3">
            <h3 class="card-header" v-bind:class="this.user.type">
              {{this.user.gender}} {{this.user.username}}
              <span v-if="this.user.type=='red'">(Admin)</span>
              <p class="points">Points: {{this.user.points}}</p>
            </h3>
            <div class="card-body">
              <h5 class="card-title">Description</h5>
              <h6 class="card-subtitle text-muted">
                <textarea
                  v-model="description"
                  v-on:keydown="typed=true"
                  class="form-control description"
                  id="exampleTextarea"
                  rows="3"
                ></textarea>
                <button
                  v-bind:disabled="saving"
                  v-if="typed && !saving"
                  v-on:click="update"
                  class="btn btn-secondary"
                >Save</button>
              </h6>
            </div>
            <!-- TODO <img
              style="height: auto; width: 100%; display: block;"
              src=""
              alt="Card image"
            /> -->
          </div>
        </div>
      </div>
      <div class="col">
        <div class="bs-component">
          <div class="card mb-3">
            <div class="card-header">Groups</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Might be implemented in future.</li>
              <li v-for="group in this.user.groups" class="list-group-item">{{group}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import checks from "../services/checks";

export default {
  data() {
    return {
      typed: false,
      user: {},
      description: "",
      saving: false,
    }
  },

  async created() {
    this.user = await checks.findCard(this.$route.params.username);
    this.description = this.user.description;
    if(this.user.username != store.userProfile.displayName) this.saving = true;
  },

  methods: {
    async update() {
      this.saving = true;
      await checks.updateDescription(store.userProfile.displayName, this.description);
      this.saving = false;
    }
  }
};
</script>

<style>
.user {
  margin: 5vh 10% auto 10%;
}

.points {
  float: right;
}

.description {
  color: inherit;
  background-color: inherit;
  border: 0px;
}

.red {
  color: #ee5f5b;
}
</style>
