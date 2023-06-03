<template>
  <SideBar/>
  <NavBar/>
  <v-main>
<!--    <v-container-->
<!--        class="fill-height pa-0 "-->
<!--    >-->
<!--          <v-responsive-->
<!--              class="overflow-y-hidden fill-height"-->
<!--              height="100%"-->
<!--          >-->
<!--            <v-card-->
<!--                flat-->
<!--                class="d-flex flex-column fill-height"-->
<!--            >-->
<!--              <v-card-title>-->
<!--                Чат со всеми сотрудниками-->
<!--              </v-card-title>-->
<!--              <v-card-text class="flex-grow-1 overflow-y-auto">-->
<!--                <div v-for="message in all_messages" v-bind:key="all_messages">-->
<!--                  <div-->
<!--                      :class="{ 'd-flex flex-row-reverse': this.user_id === message.user_id }"-->
<!--                  >-->
<!--                  <v-chip-->
<!--                    :color="this.user_id === message.user_id ? 'primary' : ''"-->
<!--                    dark-->
<!--                    style="height:auto;white-space: normal;"-->
<!--                    class="pa-4 mb-2"-->
<!--                  >-->
<!--                    {{ message.text }}-->
<!--                    <v-avatar class="avatar" size="20px">-->
<!--                      <v-img-->
<!--                          :src='`http://127.0.0.1:8000/${avatar}`'-->
<!--                          cover-->
<!--                      ></v-img>-->
<!--                    </v-avatar>-->
<!--                  </v-chip>-->
<!--                    <sub-->
<!--                        class="ml-2"-->
<!--                        style="font-size: 0.5rem;"-->
<!--                    >{{ message.send_time.substr(11, 11) }}-->
<!--                    </sub>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </v-card-text>-->
<!--            </v-card>-->
<!--          </v-responsive>-->
<!--    </v-container>-->
    <v-container class="fill-height">
      <v-row class="fill-height pb-14" align="end">
        <v-col>
          <div v-for="(item, index) in all_messages" :key="index"
               :class="['d-flex flex-row align-center my-2', item.user_id === this.user_id ? 'justify-end': null]">
            <v-chip
                :color="this.user_id === item.user_id ? 'primary' : ''"
                dark
                style="height:auto;white-space: normal;"
                class="pa-4 mb-2"
            >
              <span v-if="item.user_id === this.user_id" class="blue--text mr-3">{{ item.text }}</span>
            </v-chip>
            <v-avatar size="36">
              <v-img
                  :src='`http://127.0.0.1:8000/${avatar}`'
                  cover
              ></v-img>
            </v-avatar>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-footer fixed>
      <v-container class="ma-0 pa-0">
        <v-row no-gutters>
          <v-col>
            <div class="d-flex flex-row">
              <v-text-field v-model="newMessage" placeholder="Введите сообщение" @keypress.enter="sendMessage()"></v-text-field>
              <v-btn icon class="ml-4" @click="sendMessage()"><v-icon>mdi-send</v-icon></v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-main>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import {createSocket,sendMessage, joinSocket} from "@/ws/chat.ws";
import {mapGetters} from "vuex";
import {th} from "vuetify/locale";
import axios from "axios";
export default {
  name: "Chat",
  components: {SideBar, NavBar},
  data() {
    return{
      all_messages: '',
      newMessage: '',
      user_id: null,
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
    console.log(this.user_id)
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
        type: 1,
        text: this.newMessage,
        send_time: send_time
      }
      // console.log(data)
      sendMessage(this.socket, data)
      this.newMessage = ''
    }
  }
}
</script>

<style scoped>
</style>