import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from 'vuex'
import App from './App.vue'
import router from "./router"

import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue"

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
