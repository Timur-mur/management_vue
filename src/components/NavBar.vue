<template>
<!--  <v-app-bar style="box-shadow: none; border-bottom: 1px lightgray solid">-->
<!--    <v-toolbar-->
<!--        dark-->
<!--        prominent-->
<!--        color="white"-->
<!--    >-->
<!--      <v-toolbar-title>Werth</v-toolbar-title>-->
<!--      <v-spacer></v-spacer>-->
<!--      <v-btn variant="outlined" v-if="!isAuthenticated">-->
<!--        <router-link to="/log_in" style="color: black; text-decoration: none"> Вход </router-link>-->
<!--      </v-btn>-->
<!--      <v-btn icon v-if="isAuthenticated" @click="LogOut()">-->
<!--        <v-icon>mdi-export</v-icon>-->
<!--      </v-btn>-->
<!--    </v-toolbar>-->
<!--    <v-divider></v-divider>-->
<!--  </v-app-bar>-->
  <v-app-bar
      id="app-bar"
      absolute
      app
      color="transparent"
      flat
      height="75"
  >
    <v-btn
        class="mr-3"
        elevation="1"
        fab
        small
        @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
        class="hidden-sm-and-down font-weight-light"
        v-text="$route.name"
    />

    <v-spacer />
  </v-app-bar>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "NavBar",
  data(){
    return{
      value: false,
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
    ...mapMutations({
      setDrawer: 'SET_DRAWER',
    }),
    LogOut(){
      this.$store.commit('removeToken')
      this.$router.push('/log_in')
    },
  },
  computed:{
    ...mapState(['drawer']),
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
      email: "email",
    }),
  },
}
</script>

<style scoped>

</style>