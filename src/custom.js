import Vue from 'vue'
import axios from 'axios'
//import @/router 
import router from './router'

//TODO toto cele co suvisi s Axiosom by som dal do axios/index.js a potom iba staci import axios from '@/axios' + axios()
const Api = axios.create({
    //toto sa dava do .env a potom ked tak das ze baseURL: process.env.VUE_APP_BASE_URL
    baseURL: 'http://127.0.0.1:8000/api/v1',
    //nie je to default?
    headers: {
        'Content-Type': 'application/json'
    }
})
// preco nie () => {}?
Api.interceptors.response.use(function (response) {
    return response
    // preco nie () => {}?
}, function (error){
    // TODO: Set cookie for redirect from login page
    //switch 🤮
    switch (error.response.status) {
        //moze sa stat ze proste nechcem dat iba k niecomu access ale to neznamena ze hned musim logoutnut (aj ked sa na to pouziva skorej 404 reponse)
        case 401:
            //toto robit v vuex
            localStorage.removeItem("token")
            router.push('/login')
            break
        //toto sa tiez riesi cez 404 aby si nehovoril userom ze nieco take pod id existuje vobec (403 sa robi pri serveroch / server configoch)
        case 403:
            //toto robit v vuex
            localStorage.removeItem("token")
            router.push('/login')
            break
    }
    return Promise.reject(error)
})

// kludne z importu potom dat ze Vue.p....$http = axios
Vue.use({
    install(Vue) {
        Vue.prototype.$http = Api
    }
})

//Ak sa exoprtuje tak to nie je custom / main.js ale je to modul, ma to byt teda v axios/index.js
export default Api