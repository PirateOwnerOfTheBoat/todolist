import Api from '@/axios'
import store from "@/store";

export default {
    login(login, password) {
        return Api.post('/auth/login', {
            login: login,
            password: password
        })
    },
    logout() {
        return Api.post('/auth/forgot', {
            email: store.getters['authModule/getUser'].email
        }, {
            headers: {
                "Authorization": `Bearer ${store.getters['authModule/getToken']}`
            }
        })
    },
    register(name, email, password, confirmPassword) {
        return Api.post('/auth/signup', {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword
        })
    }
}