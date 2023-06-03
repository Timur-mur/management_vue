import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './interceptors/axios'
import { loadFonts } from './plugins/webfontloader'
import VueApexCharts from 'vue3-apexcharts';


createApp(App)
    .use(router)
    .use(store)
    .use(loadFonts)
    .use(vuetify)
    .use(VueApexCharts)
    .mount('#app')
