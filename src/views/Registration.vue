<template>
  <NavBar></NavBar>
  <div class="main">
      <v-card
          class="mx-auto"
          max-width="344"
          title="Регистрация"
          color=""
      >
        <v-container
            style="align-items: center;"
        >
          <v-text-field
              v-model="username"
              color="black"
              label="Имя"
              variant="underlined"
          ></v-text-field>

          <v-text-field
              v-model="last_name"
              color="black"
              label="Фамилия"
              variant="underlined"
          ></v-text-field>

          <v-text-field
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
          <v-text-field
              type="password"
              v-model="password2"
              color="black"
              label="Подтвердите пароль"
              placeholder="Подтвердите пароль"
              variant="underlined"
          ></v-text-field>

  <!--        <v-file-input-->
  <!--            :rules="rules"-->
  <!--            color="black"-->
  <!--            accept="image/png, image/jpeg, image/bmp"-->
  <!--            placeholder="Загрузите аватар"-->
  <!--            prepend-icon="mdi-camera"-->
  <!--            label="Аватар"-->
  <!--            variant="underlined"-->
  <!--        ></v-file-input>-->

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
          <v-btn type="submit" color="dark" @click="submitForm">
            Зарегистрироваться
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <br>
      <div class="d-flex justify-center mb-6">
        <p class="mx-auto" >Уже зарегистрированы? <router-link to="/log_in" style="color: black; text-decoration: none"> Войти </router-link></p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from "@/components/NavBar.vue";
import {th} from "vuetify/locale";
import axiosinstance from "@/services/axiosinstance";
export default {
  name: "Registration",
  components: {NavBar},
  data(){
    return{
      username: "",
      last_name: "",
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
      if (this.username ==='')
        this.errors.push('Введите имя')
      if (this.last_name ==='')
        this.errors.push('Введите фамилию')
      if (this.email ==='')
        this.errors.push('Введите e-mail')
      if (this.password ==='')
        this.errors.push('Введите пароль')
      if (this.password !== this.password2)
        this.errors.push('Пароли не совпадают')
      // if (this.rules === '')
      //   this.errors.push('Загрузите аватар')
      if (!this.errors.length) {
        axiosinstance
            .post('auth/users/', {
          email: this.email,
          username: this.username,
          last_name: this.last_name,
          password: this.password,
          avatar: this.rules,
        })
            .then(response => {
              localStorage.setItem("email",this.email)
              this.$router.push('email_send')
            })
            .catch(error => {
              this.errors = error.response.data;
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