<template>
  <div class="container">
          <div class="inbox_people">
            <div class="headind_srch">
              <div class="recent_heading">
                <h4>Live Chat</h4>
              </div>
              <div class="srch_bar">
                <div class="stylish-input-group">
                  <input v-model="search" type="text" class="search-bar"  placeholder="Search" >
                  <span class="input-group-addon">
                  <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                  </span> </div>
              </div>
            </div>
            <div class="inbox_chat" v-chat-scroll>
              <div v-for="message in filteredMessages" class="chat_list" :title="message.time.toDate()">
                <div class="chat_people">
                  <div class="chat_img"> <img :src="message.photo" alt="sunil"> </div>
                  <div class="chat_ib">
                    <h5>{{message.user}}</h5>
                    <p>{{message.message}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="type_msg">
              <div class="input_msg_write">
                <input @keyup.enter="sendMessage" v-model="message" type="text" class="write_msg" placeholder="Type a message" />
                <button @click="sendMessage" class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
let timer = -10000;
export default {
  name: 'Chat',
  props: {
    authUser: {}
  },
  data() {
    return {
      message: null,
      messages: [],
      userName: '',
      search: '',
      error: null
    }
  },
  methods: {
    sendMessage() {
      let temp = new Date - timer;
      if(temp<10000){
        temp = 10- temp/1000;
        alert('You must wait ' + temp + ' seconds before posting again');
      }
      else{
        if(this.message){
          db.collection("public-chat").add({
            message: this.message,
            time: new Date(),
            photo: this.authUser.photoURL,
            user: this.authUser.displayName
          })
          this.message = null;
          timer = new Date();
        } else {
          alert('Message cannot be empty!')
        }
      }

    },
    fetchMessages() {
      db.collection("public-chat").orderBy("time").onSnapshot(querySnapshot => {
        let allMessages = [];
        querySnapshot.forEach(doc => {
          allMessages.push({
            message: doc.data().message,
            time: doc.data().time,
            photo: doc.data().photo,
            user: doc.data().user,
            })
        })
        this.messages=allMessages;
      })
    }
  },
  created(){
    this.fetchMessages();
  },
  computed: {
    filteredMessages: function() {
      return this.messages.filter((mes) => {
        console.log(mes);
        return mes.message.match(this.search);
      })
    }
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
}
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;

  overflow: hidden;
  border-radius: 25px;
  width: 40%; border-right:1px solid #c4c4c4;
  margin: auto;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; padding:
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #005cbf;
  font-size: 21px;
  padding-top: 5px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:12px; color:grey; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:black; margin:auto; overflow: auto;}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 5px 15px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  padding-left: 20px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #005cbf none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 20px;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
small {
  color:black;
  font-size: 0.6em
}
</style>
