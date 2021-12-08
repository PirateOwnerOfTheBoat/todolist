<template>
  <div>
    <div class="d-flex w-100">
      <sidebar></sidebar>
      <div>
        <b-modal
            ref="newCategoryModal"
            v-model="createCategoryModal"
            :busy="createCategoryModalBusy"
            title="Create New Category"
            @ok.prevent="saveNewCategory"
        >
          <b-form ref="newCategoryForm" @submit.stop.prevent="saveNewCategory">
            <b-form-group
                id="modal-group-1"
                :state="createCategoryFormValidity"
                invalid-feedback="Name is required"
                label="Name"
                label-for="modal-1"
            >
              <b-form-input
                  id="modal-1"
                  v-model="createCategoryForm.name"
                  :state="createCategoryFormValidity"
                  placeholder="Enter category name"
                  required
                  type="text"
              ></b-form-input>
            </b-form-group>
          </b-form>
        </b-modal>
        <div class="d-flex">
          <h1 v-if="!editing">{{ todoList.name }}</h1>
          <b-form v-if="editing" inline @submit.prevent="saveTodoList">
            <b-form-input
                id="edit-form-name-input"
                v-model="editForm.name"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Enter name"
            ></b-form-input>
            <b-button variant="primary" @click="saveTodoList">
              <b-icon font-scale="2" icon="check-circle"></b-icon>
            </b-button>
          </b-form>
          <div v-if="!editing" class="float-right">
            <b-link class="link-primary" @click="toggleCreateCategoryModal">
              <b-icon-plus-circle></b-icon-plus-circle>
            </b-link>
            <b-link class="link-secondary" @click="toggleEdit">
              <b-icon-pencil-square></b-icon-pencil-square>
            </b-link>
            <b-link class="link-danger" @click="removeTodoList">
              <b-icon-trash></b-icon-trash>
            </b-link>
          </div>
        </div>
        <b-card
            header-tag="header"
            v-for="category in todoList.categories" :key="category.id"
        >
          <template #header>
            <div class="d-flex justify-content-between">
              <a v-b-toggle="`collapse-${category.id}`"
                 variant="primary"
              >
                <h6 class="mb-0">{{ category.name }}</h6>
              </a>
              <div>
                <b-link class="link-primary"><b-icon-plus-circle></b-icon-plus-circle></b-link>
                <b-link class="link-secondary"><b-icon-pencil-square></b-icon-pencil-square></b-link>
                <b-link class="link-danger"><b-icon-trash></b-icon-trash></b-link>
              </div>
            </div>
          </template>
          <b-collapse visible :id="`collapse-${category.id}`">
            <b-form inline v-for="task in category.tasks" :key="task.id">
              <input type="checkbox">
              <p>{{ task.task }}-{{ task.priority }}</p>
            </b-form>
            <b-card-text v-if="!category.tasks.length > 0">No tasks yet :(</b-card-text>
            <b-icon v-if="loading" icon="arrow-clockwise" animation="spin" font-scale="1"></b-icon>
          </b-collapse>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/a-Sidebar";

export default {
  components: { Sidebar },
  data() {
    return {
      todoList: {},
      editForm: {
        name: ''
      },
      createCategoryForm: {
        name: ''
      },
      createTaskForm: {
        task: '',
        priority: 0
      },
      createCategoryFormValidity: null,
      createCategoryModal: false,
      createCategoryModalBusy: false,
      loading: false,
      editing: false
    }
  },
  created() {
    this.load()
  },
  watch: {
    '$route': 'load'
  },
  methods: {
    async load() {
      this.todoList = {}
      this.loading = true

      let response = await this.$http.get(`/todolists/${this.$route.params.id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

      this.todoList = response.data

      this.loading = false
    },
    async saveTodoList() {
      let response = await this.$http.put(`/todolists/${this.$route.params.id}`, this.editForm, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

      this.todoList.name = response.data.name
      this.toggleEdit()
    },
    async removeTodoList() {
      await this.$http.delete(`/todolists/${this.$route.params.id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

      await this.$router.replace("/")
    },
    async saveNewCategory() {
      if (!this.validateNewCategoryForm())
        return

      this.createCategoryModalBusy = true
      let response = await this.$http.get(`/todolists/${this.todoList.id}/categories/create`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        params: this.createCategoryForm
      })

      this.todoList.categories.push(response.data)

      this.$nextTick(() => {
        this.toggleCreateCategoryModal()
        this.resetCreateCategoryModal()
        this.createCategoryModalBusy = false
      })
    },
    async deleteCategory(category) {
      try {
        await this.$http.delete(`/todolists/${category.todolist_id}/categories/${category.id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })

        // TODO: Slice from array
      } catch (err) {
        console.log(err)
      }
    },
    async createTask(category) {
      let response = await this.$http.get(`/categories/${category}/tasks/create`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        params: this.createTaskForm
      })

      this.todoList.categories.filter((category) => category.id === category)[0].task.push(response.data)
    },
    async deleteTask(task) {
      try {
        await this.$http.delete(`/tasks/${task.id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })

        // TODO: Slice from array
      } catch (err) {
        console.log(err)
      }
    },
    validateNewCategoryForm() {
      const valid = this.$refs.newCategoryForm.checkValidity()
      this.createCategoryFormValidity = valid
      return valid
    },
    toggleCreateCategoryModal() {
      this.createCategoryModal = !this.createCategoryModal
    },
    resetCreateCategoryModal() {
      this.createCategoryForm.name = ''
      this.createCategoryFormValidity = null
    },
    toggleEdit() {
      this.editing = !this.editing
    },
  }
}
</script>