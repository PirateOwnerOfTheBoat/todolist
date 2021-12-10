<template>
  <div>
    <b-modal
        v-model="modalShow"
        title="Create New Todo List"
        :busy="modalBusy"
        @ok.prevent="handleSubmit"
    >
      <b-form ref="todoListForm" @submit.stop.prevent="handleSubmit">
        <b-form-group
            id="modal-group-1"
            label="Name"
            label-for="modal-1"
            invalid-feedback="Name is required"
            :state="todoListFormValidity"
        >
          <b-form-input
              id="modal-1"
              v-model="todoListForm.name"
              type="text"
              placeholder="Enter todo list name"
              :state="todoListFormValidity"
              required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
    <b-nav vertical class="flex-nowrap">
<!--      TODO: Show user-->
      <b-nav-item
        v-for="todoList in todoLists"
        :key="todoList.id"
        :to="{name: 'todolist', params: {id: todoList.id}}"
      >{{ todoList.name }}</b-nav-item>
      <b-nav-item @click="toggleModal">New list</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoLists: [],
      todoListForm: {
        name: '',
      },
      todoListFormValidity: null,
      modalShow: false,
      modalBusy: false
    }
  },
  async created() {
    this.$http.get('/todolists', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      this.todoLists = response.data
    })
  },
  methods: {
    checkForm() {
      const valid = this.$refs.todoListForm.checkValidity()
      this.todoListFormValidity = valid
      return valid
    },
    resetForm() {
      this.todoListForm.name = ''
      this.todoListFormValidity = null
    },
    async handleSubmit() {
      if (!this.checkForm()) return
      this.modalBusy = true

      await this.createTodoList()

      this.$nextTick(() => {
        this.toggleModal()
        this.resetForm()
        this.modalBusy = false
      })
    },
    toggleModal() {
      this.modalShow = !this.modalShow
    },
    async createTodoList() {
      let response = await this.$http.get('/todolists/create', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        params: this.todoListForm
      })

      this.todoLists.push(response.data)
    }
  }
}
</script>