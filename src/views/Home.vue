<template>
  <div>
    <div class="d-flex">
      <!--joj more sak <Sidebar /> a uz si profik-->
      <sidebar></sidebar>
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
//...
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
    //tu sa da usetrit 1 riadok :) 
    const message = this.$route.params.message
    if (message) {
      this.showAlert = true
      this.message = message
    }
  }
}
</script>