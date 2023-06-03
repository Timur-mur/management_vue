<template>
  <SideBar/>
  <NavBar/>
  <v-main class="main">
    <v-card elevation="10" class="" style="display: block; margin-left: auto; margin-right: auto; margin-top: 50px"
            max-width="85%">
      <v-card-item class="pa-6">
        <v-card-title class="text-h5 pt-sm-2 pb-7">Мои задачи</v-card-title>
        <v-table class="month-table">
          <thead>
          <tr>
            <th class="text-subtitle-1 font-weight-bold">Задача</th>
            <th class="text-subtitle-1 font-weight-bold">Дедлайн</th>
            <th class="text-subtitle-1 font-weight-bold">Статус</th>
            <th class="text-subtitle-1 font-weight-bold text-right">Комментарий</th>
          </tr>
          </thead>
          <tbody>
          <tr style="border:0" v-for="item in tasks" :key="item.id" class="month-item" draggable="true">
            <td>
              <div class="">
                <h6 class="text-subtitle-1 font-weight-bold">{{ item.task_topic }}</h6>
                <div class="text-13 mt-1 text-muted">{{ item.task_description }}</div>
              </div>
            </td>
            <td>
              <v-chip v-if="Number(item.task_deadline.substring(item.task_deadline.length - 2)) - this.todayDate <= 2"
                      :class="'text-body-1 bg-red'" color="white" size="small">{{ item.task_deadline }}
              </v-chip>
              <v-chip v-else :class="'text-body-1 bg-green'" color="white" size="small">{{
                  item.task_deadline
                }}
              </v-chip>
            </td>
            <td>
              <v-chip :class="'text-body-1 bg-green'" color="white" size="small"> {{ tasks_status[item.task_status] }}
              </v-chip>
            </td>
            <td>
              <h6 class="text-h6 text-right">{{ item.task_flag }}</h6>
            </td>
            <td style="max-width: 90px">
              <SendTaskComponent :task_id="item.id" v-if="item.task_status === 2"></SendTaskComponent>
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-card-item>
    </v-card>
  </v-main>
</template>

<script>
import axios from "axios";
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";
import SendTaskComponent from "@/components/Task/SendTaskComponent.vue";
// import {applyDrag, generateItems, lorem} from "../utils/helpers";
// import {Container, Draggable} from "vue-dndrop";

export default {
  name: "ExecutorTasks",
  components: {SendTaskComponent, NavBar, SideBar},
  data() {
    return {
      tasks: null,
      tasks_status: {
        2: "В работе",
        3: "На проверке",
        4: "Принят",
      },
      todayDate: new Date(),
    }
  },
  beforeMount() {
    this.todayDate = this.todayDate.getDate()
  },
  async mounted() {
    await this.getTasks_executor()
  },
  methods: {
    getTasks_executor() {
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT

      axios.get('api/task/get_task_executor/' + this.$store.getters.user_id)
          .then(response => {
            this.tasks = response.data
            console.log(response.data)
            console.log(this.tasks)
          })
    }
  }
}
</script>

<style scoped>
</style>
