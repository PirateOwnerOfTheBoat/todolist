<template>
  <div>
    <div class="d-flex">
      <Sidebar />
      <div class="w-100">
        <b-alert
            v-model="showAlert"
            variant="success"
            dismissible
        >{{ message }}</b-alert>
        <h1>Home</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/a-sidebar'

export default {
  components: { Sidebar },
  data() {
    return {
      showAlert: false,
      message: ""
    }
  },
  mounted() {
    this.message = this.$route.params.message
    if (this.message) {
      this.showAlert = true
    }
  }
}
</script>