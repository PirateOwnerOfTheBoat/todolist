<template>
  <div>
    <div class="d-flex">
      <sidebar></sidebar>
      <div class="w-100">
        <b-alert
            v-model="showAlert"
            v-text="message"
            variant="success"
            dismissible
        ></b-alert>
        <h1>Home</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/a-sidebar"

export default {
  components: { Sidebar },
  data() {
    return {
      showAlert: false,
      message: ""
    }
  },
  mounted() {
    const message = this.$route.params.message
    if (message) {
      this.showAlert = true
      this.message = message
    }
  }
}
</script>