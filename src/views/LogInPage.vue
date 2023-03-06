<template>
  <NavBar></NavBar>
  <div class="main">
      <v-card
          class="mx-auto"
          max-width="344"
          title="Авторизация"
          color=""
      >
      <v-container
          style="align-items: center;"
      >
        <v-text-field
            type="email"
            v-model="email"
            color="black"
            label="Email"
            variant="underlined"
        ></v-text-field>
        <v-text-field
            type="password"
            v-model="password"
            color="black"
            label="Пароль"
            placeholder="Введите пароль"
            variant="underlined"
        ></v-text-field>
      </v-container>
      <v-list lines="one">
        <v-list-item
            v-for="(values, name) in errors"
            :key="name"
            :title="values"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="dark" @click="SignForm">
            Войти
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <br>
      <div class="d-flex justify-center mb-6">
        <p class="mx-auto" >Не зарегистрированы? <router-link to="/registration" style="color: black; text-decoration: none"> Зарегистрироваться </router-link></p>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import {th} from "vuetify/locale";
import NavBar from "@/components/NavBar.vue";
import axiosinstance from "@/services/axiosinstance";
export default {
  name: "LogInPage",
  components: {NavBar},
  data(){
    return{
      email: "",
      password: "",
      errors: {},
    }
  },
  mounted() {
    document.title = 'Вход | Werth'
  },
  methods:{
    SignForm(){
      axios.defaults.headers.common['Authorization'] = ""

      const formData = {
        email: this.email,
        password: this.password
      }
      axiosinstance
          .post("auth/jwt/create", formData)
          .then(response => {
            const JWT = response.data.access
            this.$store.commit('setToken', JWT)
            axios.defaults.headers.common['Authorization'] = "Bearer " + JWT
            this.$router.push("/")
          })
          .catch(error => {
            this.errors = error.response.data;
          })
    }
  }
}
</script>

<style scoped>
.main{
  height: calc(100% - 70px);
  padding-top: 20vh;
}
</style>