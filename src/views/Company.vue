<template>
  <NavBar></NavBar>
  <SideBar></SideBar>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "Company",
  components: {SideBar, NavBar},
  data(){
    return{

    }
  },
  mounted() {
    document.title = 'Главная страница | Werth'
  },
  methods:{

  },
}
</script>

<style scoped>
</style>