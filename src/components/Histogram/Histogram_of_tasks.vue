<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between pt-sm-2">
        <div><v-card-title class="text-h5">Sales Overview</v-card-title></div>
        <div class="my-sm-0 my-2">
          <v-select v-model="select" :items="items" variant="outlined" density="compact"
                    hide-details></v-select>
        </div>
      </div>
      <div class="mt-6">
        <apexchart type="bar" height="370px">
        </apexchart>
      </div>
    </v-card-item>
  </v-card>
</template>

<script>


export default {
  name: "Histogram_of_tasks",
}
</script>

<style scoped>

</style>