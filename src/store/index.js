import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import user from "@/store/modules/user";
export default createStore({
  modules: {
    user
  },
  plugins: [createPersistedState()],
  state:{
    drawer: null,
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
  },
  mutations:{
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  }
})
