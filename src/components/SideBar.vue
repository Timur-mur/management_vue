<template>
  <v-navigation-drawer
      expand-on-hover
      rail
  >
    <v-list>
      <v-list-item
          :prepend-avatar="'http://127.0.0.1:8000/' + avatar"
          :title="first_name+' '+last_name"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item v-if="role === 1" prepend-icon="mdi-information" title="Страница администратора" value="myfiles" href="/admin_page"></v-list-item>
      <v-list-item prepend-icon="mdi-folder" title="Все задачи" value="myfiles" href="/all_tasks"></v-list-item>
      <v-list-item prepend-icon="mdi-folder" title="Мои задачи" value="shared" href="/executor_tasks"></v-list-item>
      <v-list-item prepend-icon="mdi-chat" title="Мессенджер" value="starred" href="/chat"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
import {th} from "vuetify/locale";
import {mapGetters} from "vuex";

export default {
  name: "SideBar",
  computed: mapGetters(['first_name','last_name', 'role', 'avatar'])
}
</script>

<style scoped>

</style>