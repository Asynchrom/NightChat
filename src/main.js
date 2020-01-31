import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueChatScroll from 'vue-chat-scroll'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAooXK-5D8sO3FruqRR9bK3y2uwEesM1jc",
  authDomain: "nightchat-95a17.firebaseapp.com",
  databaseURL: "https://nightchat-95a17.firebaseio.com",
  projectId: "nightchat-95a17",
  storageBucket: "nightchat-95a17.appspot.com",
  messagingSenderId: "712201553740",
  appId: "1:712201553740:web:44900fd19bc257d90471e9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

window.db = db;

Vue.config.productionTip = false;
Vue.use(VueChatScroll);

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
