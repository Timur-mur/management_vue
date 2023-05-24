<template>
  <NavBar></NavBar>
  <SideBar></SideBar>
    <v-card
        class="mx-auto"
        max-width="90%"
        variant="outlined"
        v-for="task in tasks"
    >
      <v-card-item>
        <div>
          <div class="text-overline mb-1" v-if="task.task_status === 1"> Ожидает исполнителя </div>
          <div class="text-overline mb-1" v-if="task.task_status === 2"> В работе </div>
          <div class="text-overline mb-1" v-if="task.task_status === 3"> На проверке </div>
          <div class="text-overline mb-1" v-if="task.task_status === 4"> Принят </div>

          <div class="text-h6 mb-1">
            {{ task.task_topic }}
          </div>
          <div class="text-caption" >{{ task.task_description }}</div>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-btn variant="outlined" v-if="task.task_status === 1">
          Взять в работу
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
import {th} from "vuetify/locale";

export default {
  name: "AllTasks",
  components: {SideBar, NavBar},
  data(){
    return{
      tasks: null,
    }
  },
  async mounted() {
    await this.getAllTasks()
  },
  methods:{
    getAllTasks(){
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT

      axios.get('api/task/get_tasks/')
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