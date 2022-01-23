<template>
  <div>
    <b-form>
      <h2>Login</h2>
      <b-alert v-model="errorBox.isShown" variant="danger" dismissible>
        {{ errorBox.errorMessage }}
      </b-alert>
      <b-alert v-model="successBox.isShown" variant="success" dismissible>
        {{ successBox.successMessage }}
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

      successBox: {
        message: '',
        isShown: false,
      },

      errorBox: {
        message: '',
        isShown: false,
      },
    }
  },
  mounted() {
    this.successMessage = this.$route.params.message
    if (this.successMessage) {
      this.successBox.isShown = true
    }
  },
  methods: {
    async login() {
      this.errorBox.isShown = false

      try {
        await this.$store.dispatch("authModule/login", this.loginForm)

        await this.$router.push({ name: 'index', params: { message: 'Logged successfully' } })
      } catch {
        this.errorMessage = 'Wrong name or password.'
        this.errorBox.isShown = true
      }
    }
  }
}
</script>