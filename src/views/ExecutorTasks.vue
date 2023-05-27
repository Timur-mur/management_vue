<template>
  <NavBar></NavBar>
  <SideBar></SideBar>
  <v-card elevation="4" class="" style="display: block; margin-left: auto; margin-right: auto" max-width="95%">
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
        </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
</template>

<script>
import axios from "axios";
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "ExecutorTasks",
  components: {NavBar, SideBar},
  data(){
    return{
      tasks: null,
    }
  },
  async mounted() {
    await this.getTasks_executor()
  },
  methods:{
    getTasks_executor(){
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT

      axios.get('api/task/get_task_executor/'+ this.$store.getters.user_id)
          .then(response =>{
            this.tasks = response.data
            console.log(this.tasks)
          })
    }
  }
}
</script>

<style scoped>

</style>