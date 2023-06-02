<template>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          persistent
          width="500"
      >
        <template v-slot:activator="{ props }">
          <v-btn
              color="grey"
              v-bind="props"
          >
            Сдать задачу
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Прикрепите файл для сдачи</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-file-input
                      v-model="file"
                      ref = "file"
                      label="Прикрепите файл"
                      required
                  ></v-file-input>
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
                @click="dialog = false; this.SendTaskToCheck(task_id)"
            >
              Сдать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "SendTaskComponent",
  props:{
    task_id: null,
  },
  data(){
    return{
      dialog: false,
      file: null,
    }
  },
  methods:{
    SendTaskToCheck(task_id){
      const formData = {
        task_status: 3,
        task_file: this.$refs.file.files[0]
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWT')
      axios
          .post('api/task/send_task_to_check/' + task_id, formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    }
  }
}
</script>

<style scoped>

</style>