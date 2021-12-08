import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import router from "./router"
import Api from "./axios"

import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue"

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

Api.interceptors.response.use(function (response) {
  return response
}, function (error){
  // TODO: Set cookie for redirect from login page (router.go(-1)???)
  switch (error.response.status) {
    case 401:
      router.push('/login')
      break
    case 403:
      router.push('/login')
      break
  }
  return Promise.reject(error)
})

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
