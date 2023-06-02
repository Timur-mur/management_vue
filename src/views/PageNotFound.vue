<template>
  <NavBar></NavBar>
  <v-main>
    <div class="d-flex justify-center align-center text-center h-100vh">
      <div>
        <v-img src="../assets/images/background/errorimg.svg" width="500" alt="404" />
        <h1 class="text-h1 pt-3">Ууупс!!!</h1>
        <h4 class="text-h4 my-8">К сожалению мы не нашли данную страницу.</h4>
        <v-btn flat color="primary" class="mb-4" to="/">На главную</v-btn>
      </div>
    </div>
  </v-main>
</template>

<script>
export default {
  name: "PageNotFound"
}
</script>

<style scoped>
</style>