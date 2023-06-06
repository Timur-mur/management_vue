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
  },
  mutations:{
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  }
})
