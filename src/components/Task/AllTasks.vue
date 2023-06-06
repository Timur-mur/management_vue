<template>
      <v-card
          v-bind="$attrs"
          class="v-card--material pa-3"
      >
        <div class="d-flex grow flex-wrap">
          <v-sheet
              :class="{'pa-7': true}"
              color="success"
              max-height="90"
              width="100%"
              elevation="10"
              class="text-start v-card--material__heading mb-n6"
              dark
              style="border-radius: 4px"
          >
            <v-tabs
                v-model="tabs"
                background-color="transparent"
                slider-color="white"

            >
                <span
                    class="subheading font-weight-light mx-3 "
                    style="align-self: center"
                >
                  Задания:
                </span>
              <v-tab class="mr-3" :value="1"><v-icon class="mr-2">mdi-cloud</v-icon> Ожидает исполнителя</v-tab>
              <v-tab class="mr-3" :value="2"><v-icon class="mr-2">mdi-code-tags</v-icon>В работе</v-tab>
              <v-tab class="mr-3" :value="3"><v-icon class="mr-2">mdi-bug</v-icon>На проверке</v-tab>
              <v-tab class="mr-3" :value="4"><v-icon class="mr-2">mdi-cloud</v-icon>Принят</v-tab>
              <v-spacer/>
              <CreateTaskComponent style="justify-content: right" v-if="role === 1 || role === 2"  v-on:pushData="pushTask"/>
            </v-tabs>
          </v-sheet>
          <v-card-text>
            <v-row>
            <v-window v-model="tabs" v-for="item in tasks">
                  <v-window-item :value="item.task_status">
                    <v-container fluid>
                        <v-col>
                          <v-card shaped class="rounded-card mx-auto mt-5" width="400px">
                            <v-card-title class="d-flex align-center">
                              {{ item.task_topic }}
                              <v-spacer/>
                              <v-dialog  v-model="dialogbtn" persistent width="auto"
                                        v-if="this.$store.getters.role === 1 || this.$store.getters.role === 2"
                              >
                                <template v-slot:activator="{ props }">
                                    <v-icon
                                        size="20"
                                        color="error"
                                        class="mx-1"
                                        @click="taskForDeleteId = item.id"
                                        v-bind="props"
                                    >
                                      mdi-close
                                    </v-icon>
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
                            </v-card-title>
                            <v-card-subtitle>{{item.task_description}}</v-card-subtitle>
                            <v-card-actions>
                              <v-banner-text style="margin-left: 10px">Дедлайн:</v-banner-text>
                              <v-chip style="margin-left: 2px; margin-right: 2px" v-if="Number(item.task_deadline.substring(item.task_deadline.length - 2)) - this.todayDate <= 1" :class="'text-body-1 bg-red'" color="white"  size="small">{{ item.task_deadline }}</v-chip>
                              <v-chip style="margin-left: 2px" v-else :class="'text-body-1 bg-green'" color="white"  size="small">{{ item.task_deadline }}</v-chip>
                              <v-banner-text style="margin-left: 10px">Комментарий: {{ item.task_flag }}</v-banner-text>
                            </v-card-actions>
                            <v-card-actions style="float: right; margin-right: 20px">
                              <v-banner-text style="margin-left: 10px" v-if="item.task_file">
                                <a :href="'http://127.0.0.1:8000/' + item.task_file" style="color: #333333">
                                  <v-icon icon="mdi-file"></v-icon>
                                </a>
                              </v-banner-text>
                              <ReturnTask style="margin-left: 10px"  :task_id="item.id" :task_status="item.task_status" v-if="item.task_status === 3"></ReturnTask>
                              <v-btn color="success" style="margin-left: 20px" v-if="item.task_status === 3" @click="this.acceptOrDeleteTaskId === item.id; item.task_status===4; this.acceptTask(item.id); this.count_accepted_tasks()">
                                Принять
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-col>
                    </v-container>
                  </v-window-item>
            </v-window>
            </v-row>
          </v-card-text>
        </div>
        <slot />
      </v-card>
</template>

<script>
import axios from "axios";
import Histogram_of_tasks from "@/components/Histogram/Histogram_of_tasks.vue";
import CreateTaskComponent from "@/components/Task/CreateTaskComponent.vue";
import {mapGetters} from "vuex";
import ReturnTask from "@/components/Task/ReturnTask.vue";

export default {
  name: "AllTasks",
  components: { ReturnTask, CreateTaskComponent, Histogram_of_tasks},
  props:{
    tasks: null,
  },
  data(){
    return {
      tabs:0,
      user_id: this.$store.getters.user_id,
      dialogbtn: false,
      taskForDeleteId: null,
      todayDate: new Date(),
      task_flag: '',
      acceptOrDeleteTaskId: null,
      picker: new Date(),

    }
  },
  computed: {
    ...mapGetters(['role']),
  },
  beforeMount() {
    this.todayDate = this.todayDate.getDate()
  },
  methods:{
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
            this.tasks = this.tasks.filter(el => el.id === task_id )
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
            this.tasks = this.tasks.filter(el => el.id !== this.taskForDeleteId)
            this.taskForDeleteId = null
              })
          .catch(error =>{
            console.log(error.data)
            this.taskForDeleteId = null
          })

    },
    count_accepted_tasks(){
      const formData = {
        count: 1,
        date: this.picker.getFullYear() + '-' + (this.picker.getMonth()+1) +'-'+ this.picker.getDate()
      }
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT
      axios.post('api/task/count_accepted_tasks/', formData)
    }
  },
}
</script>
<style scoped>
.rounded-card {
  border-radius: 15px;
}
</style>
<style lang="sass">
.v-card--material
  &__avatar
    position: relative
    top: -64px
    margin-bottom: -32px

  &__heading
    position: relative
    top: -40px
    transition: .3s ease
    z-index: 1
</style>
