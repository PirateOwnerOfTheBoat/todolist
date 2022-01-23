import axios from 'axios'
import store from "@/store";
import router from '@/router'

const Api = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
})

Api.interceptors.response.use((response) => {
    return response
}, (error) => {
    // TODO: Set cookie for redirect from login page
    if (error.response.status === 401) {//moze sa stat ze proste nechcem dat iba k niecomu access ale to neznamena ze hned musim logoutnut (aj ked sa na to pouziva skorej 404 reponse)
        store.dispatch('authModule/logout')
        router.push('/login')
    } else if (error.response.status === 403) {//toto sa tiez riesi cez 404 aby si nehovoril userom ze nieco take pod id existuje vobec (403 sa robi pri serveroch / server configoch)
        store.dispatch('authModule/logout')
        router.push('/login')
    }
    return Promise.reject(error)
})

export default Api