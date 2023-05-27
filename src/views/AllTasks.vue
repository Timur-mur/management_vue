<template>
  <NavBar></NavBar>
  <SideBar></SideBar>
  <v-row justify="center" style="display: block;" v-if="this.$store.getters.role === 1 || this.$store.getters.role === 2">
    <v-dialog v-model="dialog" persistent width="60%">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Добавить задачу </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Новая задача</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    label="Название задачи"
                    v-model="new_task.task_topic"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    label="Количество исполнителей"
                    hint="Сколько людей будут выполнять задачу?"
                    v-model="new_task.task_number_of_performing"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    label="Особые пометки"
                    v-model="new_task.task_flag"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Описание задачи"
                    v-model="new_task.task_description"
                    required
                ></v-text-field>
              </v-col>
              <v-col>
                Дедлайн
                <Datepicker v-model="picker"/>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Закрыть
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false; this.create_new_task()">
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <v-card elevation="10" class="" style="display: block; margin-left: auto; margin-right: auto" max-width="85%">
    <v-card-item class="pa-6">
      <v-card-title class="text-h5 pt-sm-2 pb-7">Все задачи</v-card-title>
      <v-table class="month-table">
        <thead>
          <tr>
            <th class="text-subtitle-1 font-weight-bold">Задача</th>
            <th class="text-subtitle-1 font-weight-bold">Дедлайн</th>
            <th class="text-subtitle-1 font-weight-bold">Статус</th>
            <th class="text-subtitle-1 font-weight-bold text-right">Приоритет</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="item in tasks" :key="item.id" class="month-item">
          <td>
            <div class="">
              <h6 class="text-subtitle-1 font-weight-bold">{{ item.task_topic }}</h6>
              <div class="text-13 mt-1 text-muted">{{ item.task_description }}</div>
            </div>
          </td>
          <td>
            <h6 class="text-body-1 text-muted">{{ item.task_deadline }}</h6>
          </td>
          <td>
            <v-chip :class="'text-body-1 bg-red'"  color="white"  size="small" v-if="item.task_status === 1" > Ожидает исполнителя </v-chip>
            <v-chip :class="'text-body-1 bg-green'"  color="white"  size="small" v-if="item.task_status === 2" > В работе </v-chip>
            <v-chip :class="'text-body-1 bg-green'"  color="white"  size="small" v-if="item.task_status === 3" > На проверке </v-chip>
            <v-chip :class="'text-body-1 bg-green'"  color="white"  size="small" v-if="item.task_status === 4" > Принят </v-chip>
          </td>
          <td>
            <h6 class="text-h6 text-right">{{ item.task_flag }}</h6>
          </td>
          <td>
            <v-btn color="green"> Взять в работу </v-btn>
              <v-dialog v-model="dialogbtn" persistent width="auto" v-if="this.$store.getters.role === 1 || this.$store.getters.role === 2">
                <template v-slot:activator="{ props }">
                  <v-btn color="red" class="ma-2" v-bind="props"> Удалить <v-icon end icon="mdi-cancel"></v-icon> </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5"> Удалить задание? </v-card-title>
                  <v-card-text>Вы действительно хотите удалить задание?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="dialogbtn = false" > Нет </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="dialogbtn = false; delete_task(item.id)"> Да </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
import Datepicker from 'vue3-datepicker'
import {th} from "vuetify/locale";

export default {
  name: "AllTasks",
  components: {SideBar, NavBar, Datepicker},
  data(){
    return {
      tasks: null,
      user_id: this.$store.getters.user_id,
      dialog: false,
      dialogbtn: false,
      picker: new Date(),
      new_task: {
        task_topic: '',
        task_description: '',
        task_status: 1,
        task_deadline: null,
        task_flag: '',
        task_number_of_performing: null,
      },
    }
  },
  async mounted() {
    await this.get_all_Tasks()
  },
  methods:{
    get_all_Tasks(){
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT

      axios
          .get('api/task/get_tasks/')
          .then(response =>{
             this.tasks = response.data
          })
    },
    create_new_task(){
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT

      const FormData = {
        task_topic: this.new_task.task_topic,
        task_description: this.new_task.task_description,
        task_number_of_performing: this.new_task.task_number_of_performing,
        task_flag: this.new_task.task_flag,
        task_status: 1,
        task_deadline: this.picker.getFullYear() + '-' + this.picker.getMonth() +'-'+ this.picker.getDay()
      }
      axios
          .post('api/task/create_task/', FormData)
          .then(response =>{
            this.tasks.push(response.data)
          })
    },

    delete_task(id){
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT
      axios
          .delete('api/task/delete_task/' + id)
          .then(response =>{
            this.tasks = this.tasks.filter(el => el.id !== id)
            console.log("УДАЛИЛИИЛИЛЛИЛИЛИЛЛИЛИ")
            console.log(response.data)
              })
          .catch(error =>{
            console.log(error.data)
          })
    }
  },
}
</script>

<style scoped>

</style>