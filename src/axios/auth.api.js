import Api from "../custom"

export default {
    login(login, password) {
        return Api.post('/auth/login', {
            login: login,
            password: password
        })
    },
    logout() {
        return Api.post('/auth/forgot')
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