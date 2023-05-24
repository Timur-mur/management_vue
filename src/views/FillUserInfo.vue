<template>
  <NavBar></NavBar>
  <div class="main">
    <v-card
        class="mx-auto"
        max-width="344"
        title="Заполните информацию о себе"
        color=""
    >
      <v-container
          style="align-items: center;"
      >
        <v-text-field
            v-model="first_name"
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

        <v-file-input
            :rules="rules"
            color="black"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Загрузите аватар"
            prepend-icon="mdi-camera"
            label="Аватар"
            variant="underlined"
        ></v-file-input>

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
        <v-btn type="submit" color="dark" @click="submitform">
          Сохранить
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  name: "FillUserInfo",
  components:{NavBar},
  data(){
    return{
      first_name: '',
      last_name: '',
      rules: '',
      errors: {},
    }
  },
  mounted() {
  },
  methods:{
    submitform(){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWT')
      axios
          .post('api/user/fillinfo/'+ this.$store.getters.user_id +'/', {
            first_name: this.first_name,
            last_name: this.last_name,
          })
          .then(response => {
            const payload = {'first_name': this.first_name, 'last_name': this.last_name}
            this.$store.commit('getuserfullname', payload)
            this.$router.push('/')
          })
          .catch(error => {
            console.log(error)
            this.errors = error.data
          })
    }
  }
}
</script>

<style scoped>
.main{
  height: calc(100% - 70px);
  padding-top: 15vh;
}
</style>