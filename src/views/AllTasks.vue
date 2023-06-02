<template>
<!--  <SideBar/>-->
<!--  <NavBar/>-->
  <v-main>
<!--    <Histogram_of_tasks></Histogram_of_tasks>-->
    <v-card elevation="10"  style="display: block; margin-left: auto; margin-right: auto" max-width="98%">
      <v-card-item class="pa-6">
        <v-card-title class="text-h5 pt-sm-2 pb-7 d-flex align-center">Все задачи <CreateTaskComponent v-if="role === 1 || role === 2"  v-on:pushData="pushTask"/></v-card-title>
        <v-table class="month-table">
          <thead>
            <tr>
              <th class="text-subtitle-1 font-weight-bold">Задача</th>
              <th class="text-subtitle-1 font-weight-bold">Дедлайн</th>
              <th class="text-subtitle-1 font-weight-bold">Статус</th>
              <th class="text-subtitle-1 font-weight-bold">Приоритет</th>
              <th class="text-subtitle-1 font-weight-bold text-center">Файл</th>
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
            <td style="max-width: 90px">
              <v-chip v-if="Number(item.task_deadline.substring(item.task_deadline.length - 2)) - this.todayDate <= 1" :class="'text-body-1 bg-red'" color="white"  size="small">{{ item.task_deadline }}</v-chip>
              <v-chip v-else :class="'text-body-1 bg-green'" color="white"  size="small">{{ item.task_deadline }}</v-chip>
            </td>
            <td style="max-width: 125px">
              <v-chip :class="'text-body-1 bg-red'"  color="white"  size="small" v-if="item.task_status === 1" > Ожидает исполнителя </v-chip>
              <v-chip :class="'text-body-1 bg-green'"  color="white"  size="small" v-if="item.task_status === 2" > В работе </v-chip>
              <v-chip :class="'text-body-1 bg-green'"  color="white"  size="small" v-if="item.task_status === 3" > На проверке </v-chip>
              <v-chip :class="'text-body-1 bg-green'"  color="white"  size="small" v-if="item.task_status === 4" > Принят </v-chip>
            </td>
            <td style="max-width: 100px">
              <h6 class="text-h6">{{ item.task_flag }}</h6>
            </td>
            <td style="max-width: 110px">
              <a v-if="item.task_file" :href="'http://127.0.0.1:8000/' + item.task_file" class="text-h6" style="color: #333333">Скачать файл</a>
            </td>
            <td style="max-width: 72px">
              <v-btn v-if="item.task_status === 3" @click="this.acceptOrDeleteTaskId === item.id; this.acceptTask(item.id)">
                Принять
              </v-btn>
            </td>
            <td style="max-width: 72px">
              <v-btn v-if="item.task_status === 3">
                Вернуть
              </v-btn>
            </td>
            <td style="max-width: 60px">
                <v-btn color="green" v-if="item.tasks_status === 1"
                       @click="this.Executor_get_task(item.id)"> Взять в работу
                </v-btn>
                <v-dialog v-model="dialogbtn" persistent width="auto"
                          v-if="this.$store.getters.role === 1 || this.$store.getters.role === 2"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn @click="taskForDeleteId = item.id" color="red" class="ma-2" v-bind="props">
                      <v-icon  icon="mdi-delete"></v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5"> Удалить задание? </v-card-title>
                    <v-card-text>Вы действительно хотите удалить задание?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" variant="text" @click="dialogbtn = false" > Нет </v-btn>
                      <v-btn color="primary" variant="text" @click="dialogbtn = false; delete_task()"> Да </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
import Histogram_of_tasks from "@/components/Histogram/Histogram_of_tasks.vue";
import CreateTaskComponent from "@/components/Task/CreateTaskComponent.vue";
import {mapGetters} from "vuex";

export default {
  name: "AllTasks",
  components: {CreateTaskComponent, Histogram_of_tasks, SideBar, NavBar},
  data(){
    return {
      tasks: null,
      user_id: this.$store.getters.user_id,
      dialogbtn: false,
      taskForDeleteId: null,
      todayDate: new Date(),
      task_flag: '',
      acceptOrDeleteTaskId: null,
    }
  },
  computed: mapGetters(['role']),
  beforeMount() {
    this.todayDate = this.todayDate.getDate()
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
    pushTask(pushData){
        this.tasks.push(pushData)
    },
    acceptTask(task_id){
      const formData = {
        task_status: 4
      }
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT
      axios
          .post('api/task/accept_task/' + task_id, formData)
          .then(response => {
          })
          .catch(error => {
            console.log(error.message)
          })
    },
    returnTask(){
      const formData = {
        task_status: 2,
        task_flag: this.task_flag
      }
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT
      axios
          .post('api/task/return_task/' + task_id, formData)
          .then(response => {
          })
          .catch(error => {
            console.log(error.message)
          })
    },
    delete_task(){
      if (!this.taskForDeleteId){
        return;
      }
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT
      axios
          .delete('api/task/delete_task/' + this.taskForDeleteId)
          .then(response =>{
            this.tasks = this.tasks.filter(el => el.id !== this.taskForDeleteId
            )
            this.taskForDeleteId = null
              })
          .catch(error =>{
            console.log(error.data)
            this.taskForDeleteId = null
          })

    }
  },
}
</script>

<style scoped>
.main{
  height: calc(100% - 70px);
  padding-top: 20vh;
}

</style>