<template>
  <div>
    <v-toolbar
        color="black"
        dark
        prominent
    >

      <v-toolbar-title style="color: #4caf50; margin-left: 100px; font-size: 25px">Werth</v-toolbar-title>

      <v-btn
          style="color: #4caf50"
          href="/log_in"
      >
        Вход
      </v-btn>
      <v-btn
          style="color: #4caf50"
          href="/registration"
      >
        Регистрация
      </v-btn>
    </v-toolbar>
  </div>
  <v-main>
  </v-main>
  <Footer></Footer>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import {mapActions, mapGetters, mapState} from "vuex";
import axios from "axios";
import {th, tr} from "vuetify/locale";
import Footer from "@/components/Footer.vue";
export default {
  name: "Company",
  components: {Footer, SideBar, NavBar},
  data(){
    return{
      errors: {},
      isAuthenticated: this.$store.getters.isAuthenticated,
    }
  },
  computed: {
    ...mapGetters(['first_name', 'last_name'])
  },
  async mounted() {
    if (this.$store.getters.isAuthenticated !== false)
    {
      await this.user_id_func()
      console.log(this.$store.getters.avatar)
      if((this.$store.getters.avatar === null || this.$store.getters.first_name === "" || this.$store.getters.last_name === "") && this.$store.getters.isAuthenticated === true){
        this.$router.push("/fill_user_info")
      }
      else {
        this.$router.push("/all_tasks")
      }
    }
  },
  methods: mapActions(['user_id_func']),
}
</script>

<style scoped>
</style>