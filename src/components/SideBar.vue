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
      :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
      :expand-on-hover="expandOnHover"
      :right="$vuetify.rtl"
      :src="barImage"
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
        <v-list-item-avatar
            class="align-self-center"
            color="white"
            contain
        >
          <v-img
              src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
              max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
              class="display-1"
              v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
        expand
        nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
            v-if="item.children"
            :key="`group-${i}`"
            :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
            v-else
            :key="`item-${i}`"
            :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>

    <template v-slot:append>
      <base-item
          :item="{
          title: $t('upgrade'),
          icon: 'mdi-package-up',
          to: '/upgrade',
        }"
      />
    </template>
  </v-navigation-drawer>







</template>

<script>
import axios from "axios";
import {th} from "vuetify/locale";
import {mapGetters} from "vuex";

export default {
  name: "SideBar",
  computed: {
    ...mapGetters(['first_name','last_name', 'role', 'avatar']),
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('SET_DRAWER', val)
      },
    },
  }
}
</script>

<style scoped>

</style>