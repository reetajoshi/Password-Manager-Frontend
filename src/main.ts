import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import '@/assets/css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:2000/'
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axiosInstance)
Vue.config.productionTip = false

export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
