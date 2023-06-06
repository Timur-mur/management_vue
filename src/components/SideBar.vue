<template>
<!--  <v-navigation-drawer-->
<!--      expand-on-hover-->
<!--      rail-->
<!--  >-->
<!--    <v-list>-->
<!--      <v-list-item-->
<!--          :prepend-avatar="'http://127.0.0.1:8000/' + avatar"-->
<!--          :title="first_name+' '+last_name"-->
<!--      ></v-list-item>-->
<!--    </v-list>-->
<!--    <v-divider></v-divider>-->
<!--    <v-list density="compact" nav>-->
<!--      <v-list-item v-if="role === 1" prepend-icon="mdi-information" title="Страница администратора" value="myfiles" href="/admin_page"></v-list-item>-->
<!--      <v-list-item prepend-icon="mdi-folder" title="Все задачи" value="myfiles" href="/all_tasks"></v-list-item>-->
<!--      <v-list-item prepend-icon="mdi-folder" title="Мои задачи" value="shared" href="/executor_tasks"></v-list-item>-->
<!--      <v-list-item prepend-icon="mdi-chat" title="Мессенджер" value="starred" href="/chat"></v-list-item>-->
<!--    </v-list>-->
<!--  </v-navigation-drawer>-->

  <v-navigation-drawer
      id="core-navigation-drawer"
      v-model="drawer"
      color="black"
      :expand-on-hover="expandOnHover"
      mobile-break-point="960"
      app
      width="260"
      v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
          :gradient="`to bottom, ${barColor}`"
          v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
        dense
        nav
    >
      <v-list-item>
        <v-list-item
            color="white"
            :prepend-avatar="'http://127.0.0.1:8000/' + avatar"
        >
          <v-list-item-content>
            <v-list-item-title
                class="display-1 text-body-1"
                v-text="first_name+' '+last_name"
                style="color: white"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list-item>
    </v-list>

    <v-divider class="mb-4" style="color: white"></v-divider>

    <v-list
        expand
        nav
    >
      <div />
      <v-list-item class="text-subtitle-1 font-weight-light" style="color: white;" v-if="role === 1" href="/admin_page"><v-icon style="margin-right: 20px" icon="mdi-information"></v-icon> Администратор </v-list-item>
      <v-list-item class="text-subtitle-1 font-weight-light" style="color: white;" href="/all_tasks"><v-icon style="margin-right: 20px" icon="mdi-clipboard-outline"></v-icon> Все задачи</v-list-item>
      <v-list-item class="text-subtitle-1 font-weight-light" style="color: white;" href="/executor_tasks"><v-icon style="margin-right: 20px" icon="mdi-account"></v-icon> Мои задачи</v-list-item>
      <v-list-item class="text-subtitle-1 font-weight-light" style="color: white;" href="/chat"><v-icon style="margin-right: 20px" icon="mdi-chat"></v-icon> Мессенджер</v-list-item>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
    <template v-slot:append>
      <v-list-item class="text-subtitle-1" icon v-if="isAuthenticated" @click="this.LogOut()">
        <v-icon icon="mdi-export" style="margin-right: 20px"></v-icon>
        Выйти
      </v-list-item>
    </template>
  </v-navigation-drawer>







</template>

<script>
import axios from "axios";
import {th} from "vuetify/locale";
import {mapGetters, mapState} from "vuex";

export default {
  name: "SideBar",
  data(){
    return{
      expandOnHover: false,
    }
  },
  computed: {
    ...mapGetters({
      first_name: "first_name",
      last_name: "last_name",
      role: "role",
      avatar: "avatar",
      isAuthenticated: "isAuthenticated",
      email: "email",
    }),
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('SET_DRAWER', val)
      },
    },
  },
  methods:{
    LogOut(){
      this.$store.commit('removeToken')
      this.$router.push('/log_in')
    },
  }
}
</script>
<style lang="sass">

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-group__header

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2


</style>