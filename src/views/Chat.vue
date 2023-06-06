<template>
  <SideBar/>
  <NavBar/>
  <v-main style="background: #e7e7e7">
      <v-card
          id="element"
          class="overflow-y-auto overflow-x-hidden element  align-center"
          max-height="70vh"
          max-width="75%"
          style="display: block; margin-left: auto; margin-right: auto; margin-top: 50px; margin-bottom: -2px; border-radius: 10px 10px 0 0;"
      >
        <div id="element">
          <div v-for="(item, index) in all_messages" :key="index"
               style="margin-left: 5px; margin-right: 5px"
               :class="['d-flex flex-row align-center my-2', item.user_id === this.user_id ? 'justify-end': null]"
          >
            <v-avatar size="30" v-if="this.user_id !== item.user_id">
              <v-img
                  :src='`http://127.0.0.1:8000/${ item.user_avatar}`'
                  cover
              ></v-img>
            </v-avatar>
            <div style="display: flex; flex-direction: column">
              <span  :style="[this.user_id === item.user_id ? 'display: inline-block; width: 100%; text-align: right; padding-right:10px' : 'display: inline-block; width: 100%; text-align: left; margin-left:15px', 'font-size: 13px', 'color: grey']"> {{item.user_name}}</span>
              <v-chip
                  :color="this.user_id === item.user_id ? 'success' : 'black'"
                  dark
                  style="margin-left: 7px; white-space: normal;"
                  class="pa-4 mb-2"
              >
                <span  class="blue--text mr-3" style="padding-top: 3px; padding-bottom: 3px"> {{ item.text }}</span>
              </v-chip>
            </div>
            <v-avatar size="36" v-if="this.user_id === item.user_id">
              <v-img
                  :src='`http://127.0.0.1:8000/${avatar}`'
                  cover
              ></v-img>
            </v-avatar>
          </div>
        </div>
        <v-divider/>
      </v-card>
      <v-card
          class="overflow-y-auto overflow-x-hidden element"
          height="80px"
          color="grey-lighten-3"
          style="
                 display: flex;
                 margin-left: auto;
                 margin-right: auto;
                 align-items: center;
                 justify-content: center;
                 max-width: 75%;
                 border-radius: 0 0 10px 10px;
                 margin-bottom: 20px"
      >
        <input
            class="message__input__field"
            placeholder="Введите сообщение..."
            :value="newMessage"
            @input="newMessage=$event.target.value"
            @submit.prevent="sendMessage"
            @keyup.enter="sendMessage"
        >
        <v-icon size="30px" style="margin-left: 10px" icon="mdi-send" @click="sendMessage"/>
      </v-card>
  </v-main>
<!--  <Footer></Footer>-->
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import {createSocket,sendMessage, joinSocket} from "@/ws/chat.ws";
import {mapGetters} from "vuex";
import axios from "axios";
import Footer from "@/components/Footer.vue";

export default {
  name: "Chat",
  components: {Footer, SideBar, NavBar},
  data() {
    return{
      all_messages: '',
      newMessage: '',
      user_id: null,
      user_info: null,
    }
  },
  setup() {
    const socket = createSocket(sessionStorage.getItem('user_id'))
    return {socket}
  },
  computed: mapGetters(['avatar']),
  mounted() {
  },
  beforeMount() {
    this.user_id = Number(sessionStorage.getItem('user_id'))
    this.user_info = this.getUserInfo(this.user_id)
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT
    axios
        .get('/api/chat/get_messages')
        .then(response => {
          this.all_messages = response.data
        })

    this.socket.on('chat', (data) => {
      console.log(typeof(data.message.send_time))
      this.all_messages.push(data.message)
      console.log(this.all_messages)
    })
    this.$watch('all_messages', function () {
      this.$nextTick(() => {
        let objDiv = document.getElementById("element");
        console.log(objDiv.scrollHeight);
        objDiv.scrollTop = objDiv.scrollHeight;
      });
    }, {deep: true})
  },
  unmounted() {
    this.socket.emit('leave', {
      userId: this.user_id
    })
  },
  methods:{
    sendMessage() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
      const send_time = date + 'T'+ time;
      if(this.newMessage === '')
        return
      const data = {
        from: Number(this.user_id),
        user_name: this.user_info.first_name,
        user_avatar: this.user_info.avatar,
        type: 1,
        text: this.newMessage,
        send_time: send_time
      }
      // console.log(data)
      sendMessage(this.socket, data)
      this.newMessage = ''
    },
    getUserInfo(user_id){
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT
      axios
          .get('api/user/info/' + user_id + '/')
          .then(response =>{
            this.user_info = response.data
          })
    },
  }
}
</script>

<style scoped>
.element::-webkit-scrollbar {
  width: 0;
}
</style>

<style lang="scss">
.message__input__field {
  padding-left: 10px;
  width: 70%;
  height: 45px;
  background: white;
  border-radius: 8px;
  &:focus {
    outline: none;
  }
}
</style>