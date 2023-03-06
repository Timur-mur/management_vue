<template>
  <v-navigation-drawer
      expand-on-hover
      rail
  >
    <v-list>
      <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          title="Тимур Фаттахов"
          subtitle="Менеджер по продажам"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main style="height: 250px"></v-main>
</template>

<script>
import axios from "axios";
import axiosinstance from "@/services/axiosinstance";

export default {
  name: "SideBar",
  data(){
    return{
      name: '',
      username: '',
    }
  },
  mounted() {
    this.UserInfo()
  },
  methods:{
    UserInfo(){
      axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('JWT')

      axiosinstance
          .get('users/me')
          .then(response => {
            this.username = response.data.username
          })
    }
  },
}
</script>

<style scoped>

</style>