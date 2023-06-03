<template>
  <SideBar></SideBar>
  <NavBar></NavBar>
  <v-main>
    <AllTasks/>
  <v-card elevation="10" class="" style="display: block; margin-left: auto; margin-right: auto; margin-top: 50px" max-width="85%">
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
            <h6 class="text-body-1 text-muted" > {{ role[item.role] }}
                <v-dialog v-if="item.role !==1"
                    v-model="dialog"
                    scrollable
                    width="auto"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" style="box-shadow: none">
                      <span class="material-symbols-outlined" >edit</span>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>Присвойте роль для сотрудника</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-radio-group v-model="dialogm1" column>
                        <v-radio
                            label="Продажник"
                            value="2"
                        ></v-radio>
                        <v-radio
                            label="Разработчик"
                            value="3"
                        ></v-radio>
                        <v-radio
                            label="Пользователь"
                            value="4"
                        ></v-radio>
                      </v-radio-group>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Закрыть </v-btn>
                      <v-btn color="blue-darken-1" variant="text" @click="dialog = false; this.EditEmployee(item.id, item.role)"> Сохранить </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </h6>
          </td>
          <td>
            <h6 class="text-body-1 text-right">{{ item.email }}</h6>
          </td>

        </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
  </v-main>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
import AllTasks from "@/views/AllTasks.vue";

export default {
  name: "AdminPage",
  components: {AllTasks, SideBar, NavBar},
  data(){
    return{
      dialog: false,
      dialogm1: '',
      users: '',
      role: {
        1 : 'Администратор',
        2 : 'Продажник',
        3 : 'Разработчик',
        4 : 'Пользователь',
      },
      tasks: null,
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
    },
    EditEmployee(user_id, role_id){
      console.log(this.dialogm1)
      const formData = {
          role: this.dialogm1
      }
      axios.defaults.headers.common['Authorization'] = "Bearer " +  this.$store.getters.JWT
      axios.post('api/user/edit_employee/'+ user_id + '/', formData)
          .then(response =>{
              this.role[role_id] = this.role[this.dialogm1]
          })
    }
  },
}
</script>

<style scoped>

</style>