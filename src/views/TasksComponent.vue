<template>
  <SideBar/>
  <NavBar/>
  <v-main style="background: #e7e7e7">
    <v-card elevation="10"  color="black" style="display: block; margin-left: auto; margin-right: auto; margin-top: 50px; margin-bottom: 30px" max-width="85%">
      <v-card-item class="pa-6">
        <v-card-title class="text-subtitle-3 font-weight-light d-flex align-center">
          <v-sheet
              color="success"
              dark
              max-height="110"
              width="auto"
              class="px-5 py-3"
              style="margin-right: 20px; border-radius: 8px"
          >
            <v-icon size="25" icon="mdi-clipboard-plus"></v-icon>
          </v-sheet>
          Свободные задачи
        </v-card-title>
        <v-table style="background: black; color: white">
          <thead>
          <tr class="text-subtitle-3 font-weight-light" style="color: white">
            <th class="text-subtitle-3 font-weight-light" style="color: white">Задача</th>
            <th class="text-subtitle-3 font-weight-light" style="color: white">Дедлайн</th>
            <th class="text-subtitle-3 font-weight-light" style="color: white">Статус</th>
            <th class="text-subtitle-3 font-weight-light text-right" style="color: white">Комментарий</th>
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
              <v-chip v-if="Number(item.task_deadline.substring(item.task_deadline.length - 2)) - this.todayDate <= 2" :class="'text-body-1 bg-red'" color="white"  size="small">{{ item.task_deadline }}</v-chip>
              <v-chip v-else :class="'text-body-1 bg-green'" color="white"  size="small">{{ item.task_deadline }}</v-chip>
            </td>
            <td>
              <v-chip :class="'text-body-1 bg-red'"  color="white"  size="small"> Ожидает исполнителя </v-chip>
            </td>
            <td>
              <h6 class="text-h6 text-right">{{ item.task_flag }}</h6>
            </td>
            <td>
              <v-btn color="green"
                     @click="this.Executor_get_task(item.id); item.task_status = 2"> Взять в работу
              </v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-card-item>
    </v-card>
    <Histogram_of_tasks></Histogram_of_tasks>
  </v-main>
  <Footer></Footer>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import Histogram_of_tasks from "@/components/Histogram/Histogram_of_tasks.vue";
import axios from "axios";
import Footer from "@/components/Footer.vue";

export default {
  name: "TasksComponent",
  components: {Footer, SideBar, NavBar, Histogram_of_tasks},
  data(){
    return{
      tasks: null,
      user_id: this.$store.getters.user_id,
      todayDate: new Date(),
    }
  },
  beforeMount() {
    this.todayDate = this.todayDate.getDate()
  },
  async mounted() {
    await this.get_tasks_in_waiting()
  },
  methods:{
    get_tasks_in_waiting(){
      axios.defaults.headers.common['Authorization'] = "Bearer" + this.$store.getters.JWT
      axios
          .get('api/task/get_tasks_in_waiting')
          .then(response =>{
            this.tasks = response.data
          })
          .catch(error => {
            console.log(error.message)
          })
    },
    Executor_get_task(task_id){
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT
      const formData = {
        task_executor: this.user_id,
        task_status: 2
      }
      axios.post('api/task/employee_get_task/' + task_id, formData)
          .then( response => {
            this.tasks = this.tasks.filter(el => el.id !== task_id)
            console.log("OK")
          })
          .catch( error => {
            console.log(error.message)
          })
    }
  }
}
</script>

<style scoped>

</style>