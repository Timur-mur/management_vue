import { createStore } from 'vuex'

export default createStore({
  state: {
    JWT: "",
    email: "",
    isAuthenticated: false,
  },
  getters: {
    JWT: (state) => state.JWT,
    email: state => state.email,
    isAuthenticated: (state) => state.isAuthenticated,
  },
  mutations: {
    initializeStore(state){
      if (localStorage.getItem("JWT")){
        state.JWT = localStorage.getItem("JWT")
        state.isAuthenticated = true
      } else {
        state.JWT = ""
        state.isAuthenticated = false
      }
    },
    setToken(state, JWT){
      state.JWT = JWT
      state.isAuthenticated = true
      localStorage.setItem("JWT", JWT)
    },
    removeToken(state){
      state.JWT = ""
      state.isAuthenticated = false
      localStorage.removeItem("JWT")
    },
  },
  actions: {
  },
  modules: {
  }
})
