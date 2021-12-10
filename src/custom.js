import Vue from 'vue'
import axios from "axios"
import router from "./router";

const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1'
})

Api.interceptors.response.use(function (response) {
    return response
}, function (error){
    // TODO: Set cookie for redirect from login page
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


Vue.use({
    install(Vue) {
        Vue.prototype.$http = Api
    }
})

export default Api