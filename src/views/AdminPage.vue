<template>
  <NavBar></NavBar>
  <SideBar></SideBar>
  <v-card elevation="10" class="" style="display: block; margin-left: auto; margin-right: auto" max-width="70%">
    <v-card-item class="pa-6">
      <v-card-title class="text-h5 pt-sm-2 pb-7">Все сотрудники</v-card-title>
      <v-table class="month-table">
        <thead>
        <tr>
          <th class="text-subtitle-1 font-weight-bold">Id</th>
          <th class="text-subtitle-1 font-weight-bold">Фамилия Имя</th>
          <th class="text-subtitle-1 font-weight-bold">Роль</th>
          <th class="text-subtitle-1 font-weight-bold text-right">email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in users" :key="item.id" class="month-item">
          <td>
            <h6 class="text-body-1 text-muted">{{ item.id }}</h6>
          </td>
          <td>
            <div class="">
              <h6 class="text-subtitle-1 font-weight-bold">{{ item.last_name }} {{ item.first_name }}</h6>
            </div>
          </td>
          <td>
            <h6 class="text-body-1 text-muted" v-if="item.role === 1"> Администратор </h6>
            <h6 class="text-body-1 text-muted" v-if="item.role === 2"> Продажник </h6>
            <h6 class="text-body-1 text-muted" v-if="item.role === 3"> Разработчик </h6>
            <h6 class="text-body-1 text-muted" v-if="item.role === 4"> Пользователь </h6>
          </td>
          <td>
            <h6 class="text-body-1 text-right">{{ item.email }}</h6>
          </td>

        </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import axios from "axios";

export default {
  name: "AdminPage",
  components: {SideBar, NavBar},
  data(){
    return{
      users: '',
      dialogbtn: false,
    }
  },
  mounted() {
    this.getAllUsers()
  },
  methods:{
    getAllUsers(){
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT

      axios
          .get('api/user/all_users')
          .then(response =>{
            this.users = response.data
            console.log(this.users)
          })
    }
  },
}
</script>

<style scoped>

</style>