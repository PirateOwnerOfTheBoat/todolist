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
        v-for="todoList in getTodoLists"
        :key="todoList.id"
        :to="{name: 'todolist', params: {id: todoList.id}}"
      >{{ todoList.name }}</b-nav-item>
      <b-nav-item @click="modalShow=!modalShow">New list</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      todoListForm: {
        name: '',
      },
      todoListFormValidity: null,
      modalShow: false,
      modalBusy: false
    }
  },
  created() {
    this.$store.dispatch('reloadTodoLists')
  },
  computed: {
    ...mapGetters([
        "getTodoLists"
    ])
  },
  methods: {
    checkForm() {
      const valid = this.$refs.todoListForm.checkValidity()
      this.todoListFormValidity = valid
      return valid
    },
    async handleSubmit() {
      if (!this.checkForm()) return
      this.modalBusy = true

      await this.$store.dispatch('createTodoList', this.todoListForm)

      this.$nextTick(() => {
        this.modalShow = !this.modalShow
        this.todoListForm.name = ''
        this.todoListFormValidity = null
        this.modalBusy = false
      })
    },
  }
}
</script>