<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        width="500"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            v-bind="props"
        >
          Вернуть
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Комментарий к заданию</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                    v-model="text"
                    ref = "file"
                    label="Введите комментарий к заданию"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              variant="text"
              @click="dialog = false"
          >
            Закрыть
          </v-btn>
          <v-btn
              color="primary"
              variant="text"
              @click="dialog = false; this.returnTask(task_id)"
          >
            Вернуть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "ReturnTask",
  props:{
    task_id: null,
  },
  data(){
    return{
      dialog: false,
      text: '',
    }
  },
  methods:{
    returnTask(task_id){
      const formData = {
        task_status: 2,
        task_flag: this.text
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
  }
}
</script>

<style scoped>

</style>