<template>
  <SideBar/>
  <NavBar/>
  <v-main style="background: #e7e7e7">
    <v-card
        v-bind="$attrs"
        class="v-card--material pa-3"
        style="display: block; margin-left: auto; margin-right: auto; margin-top: 50px; max-width: 90%"
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
             <v-tab class="mr-3" :value="2"><v-icon class="mr-2">mdi-code-tags</v-icon>В работе</v-tab>
            <v-tab class="mr-3" :value="3"><v-icon class="mr-2">mdi-bug</v-icon>На проверке</v-tab>
            <v-tab class="mr-3" :value="4"><v-icon class="mr-2">mdi-cloud</v-icon>Принят</v-tab>
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
                      </v-card-title>
                      <v-card-subtitle>{{item.task_description}}</v-card-subtitle>
                      <v-card-actions>
                        <v-banner-text style="margin-left: 10px">Дедлайн:</v-banner-text>
                        <v-chip style="margin-left: 5px" v-if="Number(item.task_deadline.substring(item.task_deadline.length - 2)) - this.todayDate <= 1" :class="'text-body-1 bg-red'" color="white"  size="small">{{ item.task_deadline }}</v-chip>
                        <v-chip style="margin-left: 5px" v-else :class="'text-body-1 bg-green'" color="white"  size="small">{{ item.task_deadline }}</v-chip>
                        <v-banner-text style="margin-left: 10px">Комментарий: {{ item.task_flag }}</v-banner-text>
                      </v-card-actions>
                      <v-card-actions style="float: right; margin-right: 20px">
                        <v-banner-text style="margin-left: 10px; margin-right: 10px" v-if="item.task_file">
                          <a :href="'http://127.0.0.1:8000/' + item.task_file" style="color: #333333">
                            <v-icon icon="mdi-file"></v-icon>
                          </a>
                        </v-banner-text>
                        <SendTaskComponent :task_id="item.id" v-if="item.task_status === 2"></SendTaskComponent>
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
  </v-main>
  <Footer></Footer>
</template>

<script>
import axios from "axios";
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";
import SendTaskComponent from "@/components/Task/SendTaskComponent.vue";
import Footer from "@/components/Footer.vue";


export default {
  name: "ExecutorTasks",
  components: {SendTaskComponent, NavBar, SideBar, Footer},
  data() {
    return {
      tabs: 2,
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
          })
    }
  }
}
</script>

<style scoped>
</style>
