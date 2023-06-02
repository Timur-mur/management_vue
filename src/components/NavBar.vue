<template>
  <v-app-bar style="box-shadow: none; border-bottom: 1px lightgray solid">
    <v-toolbar
        dark
        prominent
        color="white"
    >
      <v-toolbar-title>Werth</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" v-if="!isAuthenticated">
        <router-link to="/log_in" style="color: black; text-decoration: none"> Вход </router-link>
      </v-btn>
      <v-btn icon v-if="isAuthenticated" @click="LogOut()">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
  </v-app-bar>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavBar",
  data(){
    return{
      // drawer: false,
      // links: [
      //   {text: 'Мои задачи', route: '/'},
      //   {text: 'Все задачи', route: '/'},
      //   {text: 'Проекты', route: '/'},
      // ],
      // chats:[
      //   {chat: 'Менеджеры', route: '/'},
      //   {chat: 'Продажники', route: '/'},
      // ]
    }
  },
  mounted() {
    this.$store.commit('initializeStore')
  },
  methods:{
    LogOut(){
      this.$store.commit('removeToken')
      this.$router.push('/log_in')
    },
  },
  computed:{
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
      email: "email",
    }),
  },
}
</script>

<style scoped>

</style>