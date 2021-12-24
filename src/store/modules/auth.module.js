import authApi from "../../axios/auth.api";

export default {
    state: {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || {},
    },
    mutations: {
        loggedIn(state, { token, user }) {
            state.user = user
            state.token = token

            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
        },
        loggedOut(state) {
            state.user = {}
            state.token = {}

            localStorage.removeItem("user")
            localStorage.removeItem("token")
        },
        registered(state, { token, user }) {
            state.user = user
            state.token = token

            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
        }
    },
    actions: {
        async login({ commit }, loginForm) {
            try {
                let response = await authApi.login(loginForm.login, loginForm.password)

                commit('loggedIn', response.data.response)
            } catch (err) {
                throw new err
            }
        },
        async logout({ commit }) {
            try {
                await authApi.logout()

                commit('loggedOut')
            } catch (err) {
                throw new err
            }
        },
        async register({ commit }, {name, email, password, confirmPassword}) {
            try {
                let response = await authApi.register(name, email, password, confirmPassword)

                commit('registered', response.data.response)
            } catch (err) {
                throw new err
            }
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getToken(state) {
            return state.token
        }
    }
}