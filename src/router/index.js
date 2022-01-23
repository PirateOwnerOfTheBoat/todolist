import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import List from "@/views/List"
import Login from "@/views/Login"
import Register from "@/views/Register"
import PageNotFound from "@/views/404"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Home
  },
  {
    path: '/todolist/:id',
    name: 'todolist',
    component: List
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '*',
    name: 'pagenotfound',
    component: PageNotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
