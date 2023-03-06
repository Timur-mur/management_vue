<template>
  <NavBar></NavBar>
  <br><br>
  <div class="d-flex justify-center" v-if="uid === undefined ||uid.length === 0 " >
    <v-card width="500px">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4">Подтвердите почту</v-card-title>
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
          <v-btn variant="outlined" @click="resend_activation">
            Отправить письмо повторно
          </v-btn>
        </div>
        <div v-if="send">
          <p class="font-weight-regular">
            Письмо было отправлено повторно на ваш e-mail
          </p>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "Activate",
  components: {NavBar},
  data(){
    return{
      uid: this.$route.params.uid,
      token: this.$route.params.token,
      email: localStorage.getItem('email'),
      send: false
    }
  },
  mounted() {
    console.log(this.token)
    if( this.uid !== undefined && this.token !== undefined){
      if(this.uid.length > 0 && this.token.length > 0 )
        this.activate()
    }
  },
  methods:{
    activate(){
      // axios.defaults.headers.common["Authorization"] = ""
      axios
          .post("http://localhost:8000/auth/users/activation/",{
            uid: this.uid,
            token: this.token,
          })
          .then(response => {
            this.$router.push("/log_in")
          })
          .catch(error => {
          })
    },
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
  }
}
</script>

<style scoped>

</style>