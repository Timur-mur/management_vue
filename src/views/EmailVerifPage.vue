<template>
  <NavBar></NavBar>
  <br><br>
  <div class="d-flex justify-center pa-sm-8">
    <v-card  width="500px" >
      <v-card-title class="text-primary justify-center text-decoration-none text-h5 font-weight-medium">Подтвердите почту</v-card-title>
      <v-card-text>

        На почту {{this.email}} было отправлено письмо ссылкой для подтверждения регистрации. Если вы не можете найти письмо, проверьте, пожалуйста, папку спам.

      </v-card-text>
      <v-card-text>
        <p class="font-weight-black">
          Email
        </p>
        <p class="font-weight-regular">
          {{this.email}}
        </p>
      </v-card-text>
      <v-divider></v-divider><br>
      <div class="d-flex justify-center mb-6">
        <div v-if="!send">
          <v-btn color="primary" size="large" block   flat variant="outlined" @click="resend_activation">
            <p class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2">
              Отправить письмо повторно
            </p>
          </v-btn>
        </div>
        <div v-if="send">
          <p  class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2">
            Письмо было отправлено повторно на ваш e-mail
          </p>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from 'vuex'
export default {
  name: "EmailVerifPage",
  data(){
    return{
      email: localStorage.getItem("email"),
      send: false,
    }
  },
  mounted() {
  },
  methods:{
    resend_activation(){
      axios
          .post('http://localhost:8000/auth/users/resend_activation/',{
            email: this.email
          })
          .then(response =>{
            this.send = true
          })
          .catch(error => {
            const status = error.response.status
          })
    },
  },

}
</script>

<style scoped>
.main{
  height: calc(100% - 70px);
  padding-top: 20vh;
}
</style>