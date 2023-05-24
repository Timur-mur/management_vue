import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000';

let refresh = false
axios.interceptors.response.use( resp=> resp, async error =>{
    const input_token = {
        refresh: sessionStorage.getItem('JWT_Refresh')
    }
    if(error.response.status === 401 && !refresh){
        refresh = true;
        const {status, data} = await axios.post('/auth/jwt/refresh/', input_token)
        if(status === 200){
            const JWT = data.access
            localStorage.setItem('JWT', JWT)
            this.$store.commit('setToken', JWT)
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('JWT')
            return axios(error.config)
        }
    }
    refresh = false
    return error
})
