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
              <img
                v-on:click="imgEdit=!imgEdit"
                v-if="!imgEdit && imageURL"
                class="img-card"
                v-bind:src="imageURL"
                alt="Card image"
              />
              <img
                v-on:click="imgEdit=!imgEdit"
                v-else-if="!imgEdit"
                class="img-card"
                src="../assets/user-icon.png"
                alt="Card image"
              />
              <span v-else>
                <croppa class="img-card" v-model="imageData"></croppa>
                <button
                  v-bind:disabled="saving"
                  v-if="!wrongAcc"
                  v-on:click="postImage()"
                  class="btn btn-secondary btn-center"
                  style="margin: auto"
                >Save Image</button>
              </span>
              <div>
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
                    v-if="typed && !wrongAcc"
                    v-on:click="update"
                    class="btn btn-secondary btn-center"
                  >Save</button>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="bs-component">
          <div class="card mb-3">
            <div class="card-header card">Groups</div>
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
      imageURL: "",
      imageData: null,
      imgEdit: false,
      wrongAcc: false
    };
  },

  async created() {
    this.user = await checks.findCard(this.$route.params.username);
    this.description = this.user.description;
    this.imageURL = this.user.imageURL;
    if (this.user.username != store.userProfile.displayName) this.wrongAcc = true;
  },

  methods: {
    async update() {
      this.saving = true;
      await checks.updateDescription(
        store.userProfile.displayName,
        this.description
      );
      this.saving = false;
      this.typed = false;
    },

    postImage() {
      this.saving = true;
      this.imageData.generateBlob(blobData => {
        if (blobData != null) {
          storage
            .ref(store.userProfile.displayName)
            .put(blobData)
            .then(result => {
              result.ref
                .getDownloadURL()
                .then(url => {
                  db.collection("users")
                    .doc(store.userProfile.displayName)
                    .set(
                      {
                        imageURL: url
                      },
                      { merge: true }
                    )
                    .then(e => {
                      this.imgEdit = false;
                      this.imageURL = url;
                      this.saving = false;
                    })
                    .catch(e => {
                      console.error(e);
                    });
                })
                .catch(e => {
                  console.error(e);
                });
            })
            .catch(e => {
              console.error(e);
            });
        }
      });
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

.img-card {
  margin: 0px auto;
  display: block;
  height: 200px;
  width: 200px;
}

.btn-center {
  margin: 0px auto;
  display: block;
}
</style>
