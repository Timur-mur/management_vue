<template>
  <v-card elevation="10" class="withbg" max-width="70%" style="margin-left: 30px; margin-top: 30px">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between pt-sm-2">
        <div><v-card-title class="text-h5">Выполненные задачи за месяц</v-card-title></div>
      </div>
      <div class="mt-6">
        <apexchart type="bar" height="370px" :options="options" :series="series">
        </apexchart>
      </div>
    </v-card-item>
  </v-card>
</template>

<script>


import axios from "axios";
import {toRaw} from "vue";

export default {
  name: "Histogram_of_tasks",
  data(){
    return{
      options: {
        chart: {
          id: 'vuechart-example'
        },
        plotOptions: {
          bar: { borderRadius: [8] },
        },
        xaxis: {
          categories: ["2023-06-02", "2023-06-03", "2023-06-04", "2023-06-05", "2023-06-06", "2023-06-07", "2023-06-08", "2023-06-09", "2023-06-10", "2023-06-11", "2023-06-12", "2023-06-13", "2023-06-14", "2023-06-15", "2023-06-16", "2023-06-17"]
        }
      },
      series: [{
        name: 'Количество выполненных задач в день',
        data: []
      }]
    }
  },
  beforeMount() {
    this.get_count_tasks()
  },
  methods:{
    get_count_tasks(){
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.JWT
      axios.get('api/task/get_count_accepted_tasks/')
          .then(response => {
            // this.options.xaxis.categories = Object.values(toRaw(response.data.map((date) => date.date)))
            this.series[0].data = response.data.map((count)=> count.count)
            console.log(Object.values(this.options.xaxis.categories))
          })
    }
  }
}
</script>

<style scoped>

</style>