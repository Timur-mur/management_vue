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
        size="40"
        class="mr-3 b-icon"
        elevation="1"
        fab
        small
        @click="setDrawer(!drawer)"
    >
      <v-icon size="25px" style="color: darkgray" v-if="value" icon="mdi-view-quilt"></v-icon>
      <v-icon size="25px" style="color: darkgray" v-else icon="mdi-dots-vertical"></v-icon>
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
.b-icon {
  background: white;
  color: #ffffff;
  margin: 2px 0 0 50px;
  border-radius: 25px;
  cursor: pointer;
  display: inline-block;
  font: 24px/20px Arial, sans-serif;
  height: 24px;
  padding: 1px;
  text-align: center;
  width: 24px;
}
.b-icon:hover {
  border-color: white !important;
}
</style>

<style lang="sass">
#app-bar
  .v-badge__badge
    font-size: 9px
    padding: 5px 6px
</style>