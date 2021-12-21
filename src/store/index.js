import Vue from 'vue'
import Vuex from 'vuex'
import authModule from "./modules/auth.module"
import todoModule from "./modules/todo.module"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authModule,
    todoModule
  }
})
