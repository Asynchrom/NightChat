<template>
  <div class="dashboard">
    <p class="group">Public</p>
    <div class="container chatbox">
      <div v-bind:class="post.color" class="chat-container" v-for="post in posts">
        <!-- TODO <img src="" alt="Avatar" /> -->
        <p>{{post.content}}</p>
        <span class="moment">{{moment(post.date).fromNow()}}</span>
        
          <router-link :to="{ name: 'User', params: {username: post.username}}"><span v-bind:class="post.color" class="time-right">{{post.username}}</span></router-link>
        
      </div>
    </div>
    <input
      v-on:keyup.enter="submit"
      v-model="content"
      v-bind:disabled="posting"
      type="text"
      class="send-msg form-control"
      placeholder="Write something and press enter to send..."
    />
  </div>
</template>

<script>
import checks from "../services/checks";
import store from "../store";
import moment from "moment";

export default {
  data() {
    return {
      moment,
      posts: [],
      content: "",
      posting: false
    };
  },

  methods: {
    submit: async function() {
      this.posting = true;
      if (this.content.trim().length < 2) {
        alert("Message is badly formatted!");
        content = "";
        this.posting = false;
      } else {
        let color = await checks.returnType(store.userProfile.displayName);
        await db.collection("posts").add({
          username: store.userProfile.displayName,
          photo: store.userProfile.photoURL,
          content: this.content,
          date: new Date().toString(),
          color: color
        });
        this.posting = false;
        this.content = "";
      }
    }
  },

  created() {
    db.collection("posts")
      .orderBy("date")
      .onSnapshot(querySnapshot => {
        let allPosts = [];
        querySnapshot.forEach(doc => {
          allPosts.push({
            username: doc.data().username,
            photo: doc.data().photo,
            content: doc.data().content,
            date: doc.data().date,
            color: doc.data().color
          });
        });
        this.posts = allPosts;
      });
  }
};
</script>

<style>
.send-msg {
  margin: 10px auto;
  max-width: 400px;
}

.group {
  font-weight: 900;
  margin: 15px 0px 5px 0px;
  text-align: center;
}

.chatbox {
  max-width: 500px;
  text-align: center;
  max-height: 70vh;
  overflow-y: scroll;
}

.chat-container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

.darker {
  border-color: #ccc;
  background-color: #ddd;
}

.chat-container::after {
  content: "";
  clear: both;
  display: table;
}

.chat-container img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

.chat-container img.right {
  float: right;
  margin-left: 20px;
  margin-right: 0;
}

.time-right {
  float: right;
  color: #aaa;
}

.time-left {
  float: left;
  color: #999;
}

.moment {
  float: left;
}
</style>