<template>
  <div class="d-flex">
    <sidebar></sidebar>
    <div class="w-100">
      <b-modal
          ref="newCategoryModal"
          v-model="categoryModal"
          :busy="categoryModalBusy"
          title="Create New Category"
          @ok.prevent="createNewCategory"
      >
        <b-form ref="newCategoryForm" @submit.stop.prevent="createNewCategory">
          <b-form-group
              id="modal-group-1"
              :state="categoryFormValidity"
              invalid-feedback="Name is required"
              label="Name"
              label-for="modal-1"
          >
            <b-form-input
                id="modal-1"
                v-model="categoryForm.name"
                :state="categoryFormValidity"
                placeholder="Enter category name"
                required
                type="text"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
      <b-modal
          ref="newTaskModal"
          v-model="taskModal"
          :busy="taskModalBusy"
          title="Create New Task"
          @ok.prevent="createNewTask"
      >
        <b-form ref="newTaskForm" @submit.stop.prevent="createNewTask">
          <b-form-group
              id="task-modal-group-1"
              :state="taskFormValidity"
              invalid-feedback="Task is required"
              label="Task"
              label-for="task-modal-1"
          >
            <b-form-input
                id="task-modal-1"
                v-model="taskForm.task"
                :state="taskFormValidity"
                placeholder="Enter task"
                required
                type="text"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="task-modal-group-2"
              :state="taskFormValidity"
              invalid-feedback="Priority is required"
              label="Priority"
              label-for="task-modal-2"
          >
            <b-form-input
                id="task-modal-2"
                v-model="taskForm.priority"
                :state="taskFormValidity"
                placeholder="Enter priority"
                required
                type="number"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
      <div class="d-flex">
        <h1 v-if="!editing">{{ todoList.name }}</h1>
        <b-form v-if="editing" inline @submit.prevent="updateTodoList">
          <b-form-input
              id="edit-form-name-input"
              v-model="editForm.name"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Enter name"
          ></b-form-input>
          <b-button variant="secondary" @click="closeTodoListEditForm">
            <b-icon font-scale="2" icon="x-circle"></b-icon>
          </b-button>
          <b-button variant="primary" @click="updateTodoList">
            <b-icon font-scale="2" icon="check-circle"></b-icon>
          </b-button>
        </b-form>
        <div v-if="!editing" class="float-right">
          <b-link class="link-primary" @click="categoryModal = !categoryModal">
            <b-icon-plus-circle></b-icon-plus-circle>
          </b-link>
          <b-link class="link-secondary" @click="editing = !editing">
            <b-icon-pencil-square></b-icon-pencil-square>
          </b-link>
          <b-link class="link-danger" @click="deleteTodoList">
            <b-icon-trash></b-icon-trash>
          </b-link>
        </div>
      </div>
      <b-card
          header-tag="header"
          v-for="category in categories" :key="category.id"
      >
        <template #header>
          <div class="d-flex justify-content-between">
            <b-link v-b-toggle="`collapse-${category.id}`"
               variant="primary"
            >
              <h6 class="mb-0">{{ category.name }}</h6>
            </b-link>
            <div>
              <b-link class="link-primary" @click="openCreateTaskModal(category.id)"><b-icon-plus-circle></b-icon-plus-circle></b-link>
              <b-link class="link-secondary"><b-icon-pencil-square></b-icon-pencil-square></b-link>
              <b-link class="link-danger" @click="deleteCategory(category)"><b-icon-trash></b-icon-trash></b-link>
            </div>
          </div>
        </template>
        <b-collapse visible :id="`collapse-${category.id}`">
          <b-form inline v-for="task in tasks(category.id)" :key="task.id">
            <b-form-checkbox></b-form-checkbox>
            <p>{{ task.task }}-{{ task.priority }}</p>
          </b-form>
          <b-card-text v-if="!tasks(category.id).length > 0">No tasks yet :(</b-card-text>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/a-sidebar"

export default {
  components: { Sidebar },
  data() {
    return {
      editForm: {
        name: ''
      },

      categoryForm: {
        name: ''
      },
      categoryFormValidity: null,

      taskForm: {
        task: '',
        priority: 0
      },
      taskFormValidity: null,
      taskForCategory: -1,

      categoryModal: false,
      categoryModalBusy: false,

      taskModal: false,
      taskModalBusy: false,

      editing: false
    }
  },
  created() {
    this.$store.dispatch('reloadAll')
  },
  computed: {
    todoList() {
      return this.$store.getters.getTodoListById(this.$route.params.id)
    },
    categories() {
      return this.$store.getters.getCategoriesByTodoListId(this.$route.params.id)
    },
  },
  methods: {
    async updateTodoList() {
      await this.$store.dispatch('updateTodoList', {todoListId: this.$route.params.id, todoList:this.editForm})
      this.closeTodoListEditForm()
    },
    async deleteTodoList() {
      await this.$store.dispatch('deleteTodoList', this.$route.params.id)
      await this.$router.replace('/')
    },

    async createNewCategory() {
      if (!this.validateNewCategoryForm()) return

      this.categoryModalBusy = true

      await this.$store.dispatch('createCategory', {todoListId:this.$route.params.id, category:this.categoryForm})

      this.$nextTick(() => {
        this.categoryModal = !this.categoryModal
        this.categoryForm.name = ''
        this.categoryFormValidity = null
        this.categoryModalBusy = false
      })
    },
    async updateCategory() {

    },
    async deleteCategory(category) {
      await this.$store.dispatch('deleteCategory', category.id)
    },

    async createNewTask() {
      if (!this.validateNewTaskForm()) return

      this.taskModalBusy = true

      await this.$store.dispatch('createTask', {categoryId:this.taskForCategory, task:this.taskForm})

      this.$nextTick(() => {
        this.taskModal = !this.taskModal
        this.taskForm.task = ''
        this.taskForm.priority = 0
        this.taskFormValidity = null
        this.taskModalBusy = false
      })
    },
    async updateTask() {

    },
    async deleteTask(task) {
      await this.$store.dispatch('deleteTask', task.id)
    },


    closeTodoListEditForm() {
      this.editing = false
      this.editForm.name = ''
    },

    validateNewCategoryForm() {
      const valid = this.$refs.newCategoryForm.checkValidity()
      this.categoryFormValidity = valid
      return valid
    },
    validateNewTaskForm() {
      const valid = this.$refs.newTaskForm.checkValidity()
      this.taskFormValidity = valid
      return valid
    },


    openCreateTaskModal(categoryId) {
      this.taskForCategory = categoryId
      this.taskModal = true
    },


    tasks(id) {
      return this.$store.getters.getTasksByCategoryId(id)
    },
  }
}
</script>