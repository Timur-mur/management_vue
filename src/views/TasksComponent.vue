<template>
  <SideBar/>
  <NavBar/>
  <v-main class="main">
    <!--    <Histogram_of_tasks></Histogram_of_tasks>-->
    <v-card elevation="10"  style="display: block; margin-left: auto; margin-right: auto; margin-top: 50px" max-width="85%">
      <v-card-item class="pa-6">
        <v-card-title class="text-h5 pt-sm-2 pb-7 d-flex align-center">Свободные задачи</v-card-title>
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
                     @click="this.Executor_get_task(item.id); item.task_status === 2"> Взять в работу
              </v-btn>
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

export default {
  name: "TasksComponent",
  components: {SideBar, NavBar},
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