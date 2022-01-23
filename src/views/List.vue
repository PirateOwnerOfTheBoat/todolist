<!--OMG TO CO JE ZREDUKOVAT!!!!!!-->
<template>
  <div class="d-flex">
    <Sidebar />
    <div class="w-100">
      <b-modal
          ref="newCategoryModal"
          v-model="categoryModal.shown"
          :busy="categoryModal.busy"
          :title="categoryModal.title"
          @ok.prevent="handleCategorySubmit"
      >
        <b-form ref="newCategoryForm" @submit.stop.prevent="handleCategorySubmit">
          <b-form-group
              id="modal-group-1"
              :state="isCategoryFormValid"
              invalid-feedback="Name is required"
              label="Name"
              label-for="modal-1"
          >
            <b-form-input
                id="modal-1"
                v-model="categoryForm.name"
                :state="isCategoryFormValid"
                placeholder="Enter category name"
                required
                type="text"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
      <b-modal
          ref="newTaskModal"
          v-model="taskModal.shown"
          :busy="taskModal.busy"
          :title="taskModal.title"
          @ok.prevent="handleTaskSubmit"
      >
        <b-form ref="newTaskForm" @submit.stop.prevent="handleTaskSubmit">
          <b-form-group
              id="task-modal-group-1"
              :state="isTaskFormValid"
              invalid-feedback="Task is required"
              label="Task"
              label-for="task-modal-1"
          >
            <b-form-input
                id="task-modal-1"
                v-model="taskForm.task"
                :state="isTaskFormValid"
                placeholder="Enter task"
                required
                type="text"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="task-modal-group-2"
              :state="isTaskFormValid"
              invalid-feedback="Priority is required"
              label="Priority"
              label-for="task-modal-2"
          >
            <b-form-input
                id="task-modal-2"
                v-model="taskForm.priority"
                :state="isTaskFormValid"
                placeholder="Enter priority"
                required
                type="number"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
      <div class="d-flex justify-content-between">
        <h1 v-if="!isListTitleEditing">{{ getTodoList.name }}</h1>
        <b-form v-if="isListTitleEditing" inline @submit.prevent="updateTodoList">
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
        <div v-if="!isListTitleEditing">
          <b-link class="link-primary" @click="openCategoryModal(0)">
            <b-icon-plus-circle></b-icon-plus-circle>
          </b-link>
          <b-link class="link-secondary" @click="isListTitleEditing = !isListTitleEditing">
            <b-icon-pencil-square></b-icon-pencil-square>
          </b-link>
          <b-link class="link-danger" @click="deleteTodoList">
            <b-icon-trash></b-icon-trash>
          </b-link>
        </div>
      </div>
      <b-card
          header-tag="header"
          v-for="category in getCategoriesByTodoListId(this.$route.params.id)" :key="category.id"
      >
        <template #header>
          <div class="d-flex justify-content-between">
            <b-link v-b-toggle="`collapse-${category.id}`"
               variant="primary"
            >
              <h6 class="mb-0">{{ category.name }}</h6>
            </b-link>
            <div>
              <b-link class="link-primary" @click="openTaskModal(0, category.id)"><b-icon-plus-circle></b-icon-plus-circle></b-link>
              <b-link class="link-secondary" @click="openCategoryModal(1, category.id)"><b-icon-pencil-square></b-icon-pencil-square></b-link>
              <b-link class="link-danger" @click="deleteCategory(category)"><b-icon-trash></b-icon-trash></b-link>
            </div>
          </div>
        </template>
        <b-collapse visible :id="`collapse-${category.id}`">
          <div class="d-flex justify-content-between" v-for="task in getTasksById(category.id)" :key="task.id">
            <div class="d-flex">
              <b-form-checkbox :checked="task.is_done==='1'" type="checkbox" :ref="`task-checkbox-${task.id}`" @click.native.prevent="toggleTask(task.id)"/>
              <p>{{ task.task }}-{{ task.priority }}</p>
            </div>
            <div>
              <b-link class="link-primary" @click="openTaskModal(1, task.id)"><b-icon-pencil-square></b-icon-pencil-square></b-link>
              <b-link class="link-danger" @click="deleteTask(task.id)"><b-icon-trash></b-icon-trash></b-link>
            </div>
          </div>
          <b-card-text v-if="!getTasksById(category.id).length > 0">No tasks yet :(</b-card-text>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
//input si mozes spravit svoj custom component a do neho posielat props
//tak isto si dokazes naviazat model z tohto view cize budes mat nieco take <MojInput v-model="form.name" type="name" />
//v componente je to ze this.$emit[update:modelValue]

//ked mas methodu ktora sa pouziva iba v scripte tak pred nu jebni _ (cize _loadTasks())
import Sidebar from "@/components/a-sidebar"
import { mapGetters } from "vuex";

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
      isCategoryFormValid: null,

      taskForm: {
        task: '',
        priority: 0,
      },
      isTaskFormValid: null,

      categoryModal: {
        title: 'Create New Category',
        mode: 0,
        categoryId: 0,
        busy: false,
        shown: false,
      },

      taskModal: {
        title: 'Create New Task',
        mode: 0,
        id: 0,
        busy: false,
        shown: false,
      },

      isListTitleEditing: false
    }
  },
  created() {
    this.$store.dispatch('todoModule/reloadAll')
  },
  computed: {
    ...mapGetters("todoModule", [
      "getTodoListById",
    ]),
    getTodoList() {
      return this.getTodoListById(this.$route.params.id)
    }
  },
  methods: {
    async updateTodoList() {
      //$route.params nie je refresh safe takze bacha na logiku (mozno je to ok neviem)
      await this.$store.dispatch('todoModule/updateTodoList', {todoListId: this.$route.params.id, todoList:this.editForm})
      this.closeTodoListEditForm()
    },
    async deleteTodoList() {
      await this.$store.dispatch('todoModule/deleteTodoList', this.$route.params.id)
      await this.$router.replace('/')
    },

    openCategoryModal(mode, categoryId) {
      //toto je nejaky reset? neoplati sa to dat do separate method?
      this.isCategoryFormValid = null
      this.categoryModal.mode = mode
      this.categoryModal.categoryId = categoryId

      if (this.categoryModal.mode === 0) {
        this.categoryForm.name = ''
        this.categoryModal.title = 'Create New Category'
      } else {
        this.categoryForm.name = this.$store.getters["todoModule/getCategoryById"](categoryId).name
        this.categoryModal.title = 'Edit Category'
      }

      this.categoryModal.shown = true
    },
    async handleCategorySubmit() {
      if (!this._validateForm(1)) return
      this.categoryModal.busy = true

      if (this.categoryModal.mode === 0) {
        await this.$store.dispatch('todoModule/createCategory', {todoListId:this.$route.params.id, category:this.categoryForm})
      } else {
        await this.$store.dispatch('todoModule/updateCategory', {categoryId:this.categoryModal.categoryId, category:this.categoryForm})
      }

      this.categoryModal.shown = !this.categoryModal.shown
      this.categoryModal.busy = false
    },
    async deleteCategory(category) {
      await this.$store.dispatch('todoModule/deleteCategory', category.id)
    },

    openTaskModal(mode, id) {
      //toto je tiez reset?
      this.isTaskFormValid = null
      this.taskModal.mode = mode
      this.taskModal.id = id

      if (this.taskModal.mode === 0) {
        this.taskForm.task = ''
        this.taskForm.priority = 0
        this.taskModal.title = 'Create New Task'
      } else {
        this.taskForm.task = this.$store.getters["todoModule/getTaskById"](id).task
        this.taskForm.priority = this.$store.getters["todoModule/getTaskById"](id).priority
        this.taskModal.title = 'Edit Task'
      }

      this.taskModal.shown = true
    },
    _validateForm(formId) {
      if (formId === 0) {
        this.isTaskFormValid = this.$refs.newTaskForm.checkValidity()
        return this.isTaskFormValid
      } else {
        this.isCategoryFormValid = this.$refs.newTaskForm.checkValidity()
        return this.isCategoryFormValid
      }
    },
    async handleTaskSubmit() {
      if (!this._validateForm(0)) return
      this.taskModal.busy = true

      if (this.taskModal.mode === 0) {
        await this.$store.dispatch('todoModule/createTask', {categoryId: this.taskModal.id, task: this.taskForm})
      } else {
        await this.$store.dispatch('todoModule/updateTask', {taskId: this.taskModal.id, task: this.taskForm})
      }

      this.taskModal.shown = !this.taskModal.shown
      this.taskModal.busy = false
    },
    async deleteTask(taskId) {
      await this.$store.dispatch('todoModule/deleteTask', taskId)
    },
    async toggleTask(taskId) {
      this.$refs[`task-checkbox-${taskId}`].disabled = true

      await this.$store.dispatch('todoModule/updateTask', {
        taskId:taskId,
        task: {
          //OMG NEEEEEEEEEE === (kludne daj do komentu ze preco)
          is_done:(this.$store.getters["todoModule/getTaskById"](taskId).is_done==="0") ? "1" : "0"
        }
      })

      this.$refs[`task-checkbox-${taskId}`].disabled = false
    },


    closeTodoListEditForm() {
      this.isListTitleEditing = false
      this.editForm.name = ''
    },

    getTasksById(id) {
      return this.$store.getters["todoModule/getTasksByCategoryId"](id)
    },
    getCategoriesByTodoListId(todoListId) {
      return this.$store.getters["todoModule/getCategoriesByTodoListId"](todoListId)
    }
  }
}
</script>