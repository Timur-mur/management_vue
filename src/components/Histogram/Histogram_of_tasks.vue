<template>
  <v-card elevation="10" style="display: block; margin-left: auto; margin-right: auto; margin-top: 50px; margin-bottom: 20px" max-width="85%">
    <v-card-item>
      <v-card-title class="text-subtitle-3 font-weight-light d-flex align-center">
        <v-sheet
            color="black"
            dark
            max-height="110"
            width="auto"
            class="px-5 py-3"
            style="margin-right: 20px; border-radius: 8px"
        >
          <v-icon size="25" icon="mdi-poll"></v-icon>
        </v-sheet>
        Выполненные задачи за месяц
      </v-card-title>
      <div class="mt-6">
        <apexchart type="bar" height="370px"  :options="options" :series="series">
        </apexchart>
      </div>
    </v-card-item>
  </v-card>

  <v-card elevation="10" style="display: block; margin-left: auto; margin-right: auto; margin-top: 50px; margin-bottom: 20px" max-width="85%">
    <v-card-item>
      <v-card-title class="text-subtitle-3 font-weight-light d-flex align-center">
        <v-sheet
            color="black"
            dark
            max-height="110"
            width="auto"
            class="px-5 py-3"
            style="margin-right: 20px; border-radius: 8px"
        >
          <v-icon size="25" icon="mdi-poll"></v-icon>
        </v-sheet>
        Количество выполненных задач каждого сотрудника по дням
      </v-card-title>
      <div class="mt-6">
        <apexchart type="bar" height="370px"  :options="options2" :series="series2">
        </apexchart>
      </div>
    </v-card-item>
  </v-card>
</template>

<script>


import axios from "axios";

export default {
  name: "Histogram_of_tasks",
  data(){
    return{
      options: {
        chart: {
          id: 'vuechart-example',
        },
        fill:{
          colors: ['#4CAF50']
        },
        plotOptions: {
          bar: { borderRadius: [6] },
        },
        xaxis: {
          categories: ["2023-06-02", "2023-06-03", "2023-06-04", "2023-06-05", "2023-06-06", "2023-06-07", "2023-06-08", "2023-06-09", "2023-06-10", "2023-06-11", "2023-06-12", "2023-06-13", "2023-06-14", "2023-06-15", "2023-06-16", "2023-06-17"]
        }
      },
      series: [{
        name: 'Количество выполненных задач в день',
        data: []
      }],
      options2: {
        chart: {
          id: 'vuechart-example',
        },
        plotOptions: {
          bar: { borderRadius: [6] },
        },
        xaxis: {
          categories: ["2023-06-02", "2023-06-03", "2023-06-04", "2023-06-05", "2023-06-06", "2023-06-07", "2023-06-08", "2023-06-09", "2023-06-10", "2023-06-11", "2023-06-12", "2023-06-13", "2023-06-14", "2023-06-15", "2023-06-16", "2023-06-17"]
        }
      },
      series2: [
          {name: 'Тимур Фаттахов', data: [2, 3, 0, 3, 2, 0]},
          {name: 'ТестИмя ТестФам', data: [1, 5, 1, 5, 2, 1]},
          {name: 'Айнур Захаров', data: [2, 2, 1, 7, 1, 0]},
      ]
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