<template>
<!--  <NavBar></NavBar>-->
  <div class="authentication main">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
            <v-card-item class="pa-sm-8">
              <div class="text-body-1 text-muted text-center mb-3">Вход в Werth</div>
              <v-row class="d-flex mb-3">
                <v-col cols="12">
                  <v-label class="font-weight-bold mb-1">E-Mail</v-label>
                  <v-text-field v-model="email"  variant="outlined" hide-details color="primary"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-label class="font-weight-bold mb-1">Пароль</v-label>
                  <v-text-field v-model="password" variant="outlined" type="password"  hide-details color="primary"></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-0">
                </v-col>
                <h6 class="text-body-1 text-muted font-weight-regular d-flex justify-center align-center mt-3">
                  <v-list-item
                      v-for="(values, name) in errors"
                      :key="name"
                      :title="values"
                  ></v-list-item>
                </h6>
                <v-list>
                  <v-list-item
                      v-for="(values, name) in errors"
                      :key="name"
                      :title="values"
                  ></v-list-item>
                </v-list>
                <v-col cols="12" class="pt-0">
                  <v-btn color="primary" size="large" block   flat @click="SignForm">Войти</v-btn>
                </v-col>
              </v-row>
              <h6 class="text-body-1 text-muted font-weight-regular d-flex justify-center align-center mt-3">
                Не зарегистрированы?
                <RouterLink to="/registration"
                            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2">
                  Зарегистрироваться</RouterLink>
              </h6>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import {th} from "vuetify/locale";
import NavBar from "@/components/NavBar.vue";
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
      axios
          .post("auth/jwt/create", formData)
          .then(response => {
            sessionStorage.setItem("email", this.email)
            localStorage.setItem('isAuthenticated', 'true')
            this.$store.commit('setToken', response.data.access)
            this.$store.commit('setRefreshToken', response.data.refresh)
            axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.access
            this.$router.push("/")
          })
          .catch(error => {
            this.errors.push('Проверьте корректность введенных данных.')
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