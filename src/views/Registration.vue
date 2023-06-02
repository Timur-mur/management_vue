<template>
  <div class="authentication main">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
            <v-card-item class="pa-sm-8">
              <div class="text-body-1 text-muted text-center mb-3">Регистрация</div>
              <v-row class="d-flex mb-3">
                <v-col cols="12">
                  <v-label class="font-weight-bold mb-1">E-mail</v-label>
                  <v-text-field v-model="email" variant="outlined" type="email" hide-details color="primary"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-label class="font-weight-bold mb-1">Пароль</v-label>
                  <v-text-field v-model="password" variant="outlined" type="password" hide-details color="primary"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-label class="font-weight-bold mb-1">Подтвердите пароль</v-label>
                  <v-text-field v-model="password2" variant="outlined" type="password" hide-details color="primary"></v-text-field>
                </v-col>
                <v-list lines="one">
                  <v-list-item
                      v-for="(values, name) in errors"
                      :key="name"
                      :title="values"
                  ></v-list-item>
                </v-list>
                <v-col cols="12" >
                  <v-btn color="primary" size="large" block   flat @click="submitForm"> Зарегистрироваться </v-btn>
                </v-col>
              </v-row>
              <h6 class="text-body-1 text-muted font-weight-medium d-flex justify-center align-center mt-3">
                Уже зарегистрированы?
                <RouterLink to="/log_in"
                            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2">
                  Войти</RouterLink>
              </h6>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from "@/components/NavBar.vue";
import {th} from "vuetify/locale";
export default {
  name: "Registration",
  components: {NavBar},
  data(){
    return{
      email: "",
      password: "",
      password2: "",
      errors: {},
      // rules: [
      //   value => !value || value.size < 2*1024*1024 || 'Размер фото должен быть меньше 2MB',
      // ],
    }
  },
  mounted() {
    document.title = 'Регистрация | Werth'
  },
  methods:{
    submitForm(){
      this.errors = []
      if (this.email ==='')
        this.errors.push('Введите e-mail')
      if (this.password ==='')
        this.errors.push('Введите пароль')
      if (this.password !== this.password2)
        this.errors.push('Пароли не совпадают')
      // if (this.rules === '')
      //   this.errors.push('Загрузите аватар')
      if (!this.errors.length) {
        axios.defaults.headers.common['Authorization'] = 'Bearer'
        axios
            .post('/auth/users/', {
          email: this.email,
          password: this.password,
        })
            .then(response => {
              localStorage.setItem("email",this.email)
              this.$router.push('email_send')
            })
            .catch(error => {
              this.errors = error.data;
            })
      }
    }
  },
}
</script>

<style scoped>
.main{
  height: calc(100% - 70px);
  padding-top: 15vh;
}
</style>