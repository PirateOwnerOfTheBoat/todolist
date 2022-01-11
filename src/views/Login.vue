<template>
  <div>
    <b-form>
      <h2>Login</h2>
      <b-alert v-model="errorAlert" variant="danger" dismissible>
        {{ errorMessage }}
      </b-alert>
      <b-alert v-model="successAlert" variant="success" dismissible>
        {{ successMessage }}
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

      //maybe successBox: {message, alert}
      successMessage: '',
      successAlert: false,

      errorMessage: '',
      errorAlert: false
    }
  },
  mounted() {
    //hihi 1 riadok waste
    const message = this.$route.params.message
    if (message) {
      this.successMessage = message
      this.successAlert = true
    }
  },
  methods: {
    async login() {
      this.errorAlert = false

      try {
        await this.$store.dispatch("login", this.loginForm)

        //really to musi byt na realne 8 riadku???? ved kazdy pozna router.push
        await this.$router.push(
          {
            name: 'index',
            params: {
              message: 'Logged successfully'
            }
          }
        )
      } catch (err) {
        //eslint error, variable err is defined but never used
        this.errorMessage = 'Wrong name or password.'
        this.errorAlert = true
      }
    }
  }
}
</script>