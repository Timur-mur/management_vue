<!--<template>-->
<!--  <SideBar/>-->
<!--  <NavBar/>-->
<!--  <v-main class="main">-->
<!--  <v-card elevation="10" class="" style="display: block; margin-left: auto; margin-right: auto; margin-top: 50px" max-width="85%">-->
<!--    <v-card-item class="pa-6">-->
<!--      <v-card-title class="text-h5 pt-sm-2 pb-7">Мои задачи</v-card-title>-->
<!--      <v-table class="month-table">-->
<!--        <thead>-->
<!--        <tr>-->
<!--          <th class="text-subtitle-1 font-weight-bold">Задача</th>-->
<!--          <th class="text-subtitle-1 font-weight-bold">Дедлайн</th>-->
<!--          <th class="text-subtitle-1 font-weight-bold">Статус</th>-->
<!--          <th class="text-subtitle-1 font-weight-bold text-right">Приоритет</th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody >-->
<!--        <tr style="border:0" v-for="item in tasks" :key="item.id" class="month-item">-->
<!--          <td>-->
<!--            <div class="">-->
<!--              <h6 class="text-subtitle-1 font-weight-bold">{{ item.task_topic }}</h6>-->
<!--              <div class="text-13 mt-1 text-muted">{{ item.task_description }}</div>-->
<!--            </div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <v-chip v-if="Number(item.task_deadline.substring(item.task_deadline.length - 2)) - this.todayDate <= 2" :class="'text-body-1 bg-red'" color="white"  size="small">{{ item.task_deadline }}</v-chip>-->
<!--            <v-chip v-else :class="'text-body-1 bg-green'" color="white"  size="small">{{ item.task_deadline }}</v-chip>-->
<!--          </td>-->
<!--          <td>-->
<!--            <v-chip :class="'text-body-1 bg-green'"  color="white"  size="small"> {{tasks_status[item.task_status]}} </v-chip>-->
<!--          </td>-->
<!--          <td>-->
<!--            <h6 class="text-h6 text-right">{{ item.task_flag }}</h6>-->
<!--          </td>-->
<!--          <td style="max-width: 90px"><SendTaskComponent :task_id="item.id" v-if="item.task_status === 2"></SendTaskComponent></td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </v-table>-->
<!--    </v-card-item>-->
<!--  </v-card>-->
<!--  </v-main>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->
<!--import SideBar from "@/components/SideBar.vue";-->
<!--import NavBar from "@/components/NavBar.vue";-->
<!--import SendTaskComponent from "@/components/Task/SendTaskComponent.vue";-->

<!--export default {-->
<!--  name: "ExecutorTasks",-->
<!--  components: {SendTaskComponent, NavBar, SideBar},-->
<!--  data(){-->
<!--    return{-->
<!--      tasks: null,-->
<!--      tasks_status: {-->
<!--        2: "В работе",-->
<!--        3: "На проверке",-->
<!--        4: "Принят",-->
<!--      },-->
<!--      todayDate: new Date(),-->
<!--    }-->
<!--  },-->
<!--  beforeMount() {-->
<!--    this.todayDate = this.todayDate.getDate()-->
<!--  },-->
<!--  async mounted() {-->
<!--    await this.getTasks_executor()-->
<!--  },-->
<!--  methods:{-->
<!--    getTasks_executor(){-->
<!--      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT-->

<!--      axios.get('api/task/get_task_executor/'+ this.$store.getters.user_id)-->
<!--          .then(response =>{-->
<!--            this.tasks = response.data-->
<!--            console.log(response.data)-->
<!--            console.log(this.tasks)-->
<!--          })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <SideBar/>
  <NavBar/>
  <v-main>
      <Container
          orientation="horizontal"
          @drop="onColumnDrop($event)"
          drag-handle-selector=".column-drag-handle"
          @drag-start="dragStart"
          :drop-placeholder="upperDropPlaceholderOptions"
          style=" display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: 90%"
      >
        <Draggable v-for="column in scene.children" :key="column.id">
          <div :class="column.props.className">
            <div class="card-column-header">
              <span class="column-drag-handle">&#x2630;</span>
              {{ column.name }}
            </div>
            <Container
                group-name="col"
                @drop="(e) => onCardDrop(column.id, e)"
                @drag-start="(e) => log('drag start', e)"
                @drag-end="(e) => log('drag end', e)"
                :get-child-payload="getCardPayload(column.id)"
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                :drop-placeholder="dropPlaceholderOptions"
            >
              <Draggable v-for="card in column.children" :key="card.id">
                <div :class="card.props.className" :style="card.props.style">
                  <h3>Task # {{ card.number }}</h3>
                  <p class="card-text">{{ card.data }}</p>
                </div>
              </Draggable>
            </Container>
          </div>
        </Draggable>
      </Container>
  </v-main>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag , scene} from "../utils/helpers";
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "ExecutorTasks",

  components: {NavBar, SideBar, Container, Draggable },

  data() {
    return {
      scene,
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
    };
  },

  methods: {
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene);
      scene.children = applyDrag(scene.children, dropResult);
      this.scene = scene;
    },

    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene);
        const column = scene.children.filter((p) => p.id === columnId)[0];
        const columnIndex = scene.children.indexOf(column);

        const newColumn = Object.assign({}, column);
        newColumn.children = applyDrag(newColumn.children, dropResult);
        scene.children.splice(columnIndex, 1, newColumn);

        this.scene = scene;
      }
    },

    getCardPayload(columnId) {
      return (index) => {
        return this.scene.children.filter((p) => p.id === columnId)[0].children[index];
      };
    },

    dragStart() {
      console.log("drag started");
    },

    log(...params) {
      console.log(...params);
    },
  },
};
</script>