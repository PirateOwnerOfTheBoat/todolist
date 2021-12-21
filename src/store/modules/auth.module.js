import authApi from "../../axios/auth.api";

export default {
    state: {
        user: localStorage.getItem("user") || {},
        token: localStorage.getItem("token") || {},
    },
    mutations: {
        loggedIn(state, { token, user }) {
            state.user = user
            state.token = token

            localStorage.setItem("user", user)
            localStorage.setItem("token", token)
        },
        loggedOut(state) {
            state.user = {}
            state.token = {}

            localStorage.removeItem("user")
            localStorage.removeItem("token")
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
        }
    },
    getters: {

    }
}