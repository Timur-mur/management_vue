<template>
  <v-row style="margin-top: 4px" v-if="this.$store.getters.role === 1 || this.$store.getters.role === 2">
    <v-dialog v-model="dialog" persistent width="60%">
      <template v-slot:activator="{ props }">
          <v-icon
              size="30"
              class="b-icon d-flex align-center"
              style="margin-top: 5px; margin-right: 20px"
              color="white"
              v-bind="props"
          >
            mdi-plus
          </v-icon>
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
                    label="Особые пометки"
                    v-model="new_task.task_flag"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                Дедлайн
                <Datepicker v-model="picker"/>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Описание задачи"
                    v-model="new_task.task_description"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="dialog = false">
            Закрыть
          </v-btn>
          <v-btn color="success" variant="text" @click="dialog = false; this.create_new_task()">
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import Datepicker from 'vue3-datepicker'

export default {
  components: {Datepicker},
  name: "CreateTaskComponent",
  props:{
    tasks: '',
  },
  data(){
    return{
      dialog:false,
      new_task: {
        task_topic: '',
        task_description: '',
        task_status: 1,
        task_deadline: null,
        task_flag: '',
      },
      picker: new Date(),
    }
  },
  methods:{
    create_new_task(){
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT

      const FormData = {
        task_topic: this.new_task.task_topic,
        task_description: this.new_task.task_description,
        task_flag: this.new_task.task_flag,
        task_status: 1,
        task_deadline: this.picker.getFullYear() + '-' + (this.picker.getMonth()+1) +'-'+ this.picker.getDate()
      }
      axios
          .post('api/task/create_task/', FormData)
          .then(response =>{
            this.$emit('pushData', response.data);
          })
    },
  }
}
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
}
.b-icon {
  color: #333;
  margin: 2px 0 0 50px;
  border-radius: 12px;
  cursor: pointer;
  display: inline-block;
  font: 24px/20px Arial, sans-serif;
  height: 24px;
  padding: 1px;
  text-align: center;
  width: 24px;
}
.b-icon:hover {
  border-color: white !important;
}
</style>