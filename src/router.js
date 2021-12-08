import VueRouter from "vue-router"

import Home from "./views/Home"
import List from "./views/List"
import Login from "./views/Login"
import Register from "./views/Register"
import PageNotFound from "./views/404"

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
        component: PageNotFound
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router