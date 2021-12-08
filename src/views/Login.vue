<template>
  <div>
    <b-form>
      <h2>Login</h2>
      <b-alert v-model="showAlert" variant="danger" dismissible>
        {{ errorMessage }}
      </b-alert>
      <b-form @submit.prevent="login()">
        <b-form-group
            id="login-group-1"
            label="Email address:"
            label-for="login-input-1"
        >
          <b-form-input
              id="login-input-1"
              v-model="loginForm.login"
              type="email"
              placeholder="Enter email"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="login-group-2"
            label="Password:"
            label-for="login-input-2">
          <b-form-input
              id="login-input-2"
              v-model="loginForm.password"
              type="password"
              placeholder="Enter password"
              required
          ></b-form-input>
        </b-form-group>
        <b-button
            type="submit"
            variant="primary"
        >Login</b-button>
      </b-form>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        login: '',
        password: ''
      },
      errorMessage: '',
      showAlert: false
    }
  },
  methods: {
    async login() {
      this.showAlert = false

      try {
        let response = await this.$http.post("/auth/login", this.loginForm)
        localStorage.setItem("token", response.data.response.token)
        this.$router.replace("/")
      } catch (err) {
        this.errorMessage = err.response.data.error
        this.showAlert = true
      }
    }
  }
}
</script>