import axios from "axios";

export default {
    state:{
        JWT: '',
        JWT_Refresh: '',
        email: '',
        isAuthenticated: false,
        user_id: null,
        first_name: '',
        last_name: '',
        role: null,
    },
    actions:{
        async user_id_func(ctx){
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('JWT')
            let user_id = null
            let first_name = ''
            let last_name = ''
            let role = ''
            await axios
                .get('auth/users/me')
                .then(response => {
                    user_id  = response.data.id
                    sessionStorage.setItem('user_id', response.data.id)
                })

            await axios
                .get('api/user/info/' + user_id + '/')
                .then(response => {
                    first_name = response.data.first_name
                    last_name = response.data.last_name
                    role = response.data.role
                })
            const payload = {'user_id': user_id, 'first_name': first_name, 'last_name':last_name, 'role': role}
            ctx.commit('getuserid', payload)
        },
    },
    mutations:{
        initializeStore(state){
            if (localStorage.getItem("JWT")){
                state.JWT = localStorage.getItem("JWT")
                state.isAuthenticated = true
                state.JWT_Refresh = sessionStorage.getItem('JWT_Refresh')
                state.email = sessionStorage.getItem('email')
            } else {
                state.JWT = ""
                state.isAuthenticated = false
                state.JWT_Refresh = ""
                state.email = ""
            }
        },
        setToken(state, JWT){
            state.JWT = JWT
            state.isAuthenticated = true
            localStorage.setItem("JWT", state.JWT)
        },
        setRefreshToken(state, JWT_Refresh){
            sessionStorage.setItem("JWT_Refresh", JWT_Refresh)
        },
        removeToken(state){
            state.JWT = ""
            state.JWT_Refresh = ""
            state.email = ""
            state.role = null
            state.first_name = ""
            state.last_name = ""
            state.user_id = null
            state.isAuthenticated = false
            localStorage.removeItem("JWT")
            sessionStorage.removeItem("JWT_Refresh")
            localStorage.removeItem("isAuthenticated")
        },
        getuserid(state, payload){
            state.user_id = payload.user_id
            state.first_name = payload.first_name
            state.last_name = payload.last_name
            state.role = payload.role
        },
        getuserfullname(state, payload){
            state.first_name = payload.first_name
            state.last_name = payload.last_name
        }
    },
    getters:{
        JWT: (state) => state.JWT,
        JWT_Refresh: (state) => state.JWT_Refresh,
        email: state => state.email,
        isAuthenticated: (state) => state.isAuthenticated,
        user_id: (state) => state.user_id,
        first_name: (state) => state.first_name,
        last_name: (state) => state.last_name,
        role: (state) => state.role,
    },
}