<template>
  <v-navigation-drawer
      expand-on-hover
      rail
  >
    <v-list>
      <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          :title="first_name+' '+last_name"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="Все задачи" value="myfiles" href="/all_tasks"></v-list-item>
      <v-list-item prepend-icon="mdi-folder" title="Мои задачи" value="shared"></v-list-item>
      <v-list-item prepend-icon="mdi-chat" title="Мессенджер" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main style="height: 250px"></v-main>
</template>

<script>
import axios from "axios";
import {th} from "vuetify/locale";
import {mapGetters} from "vuex";

export default {
  name: "SideBar",
  computed: mapGetters(['first_name','last_name', 'role'])
}
</script>

<style scoped>

</style>