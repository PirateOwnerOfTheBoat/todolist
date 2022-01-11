<!--OMG TO CO JE ZREDUKOVAT!!!!!!-->
<template>
  <div class="d-flex">
    <sidebar></sidebar>
    <div class="w-100">
      <b-modal
          ref="newCategoryModal"
          v-model="categoryModal"
          :busy="categoryModalBusy"
          :title="categoryModalTitle"
          @ok.prevent="handleCategorySubmit"
      >
        <b-form ref="newCategoryForm" @submit.stop.prevent="handleCategorySubmit">
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
          :title="taskModalTitle"
          @ok.prevent="handleTaskSubmit"
      >
        <b-form ref="newTaskForm" @submit.stop.prevent="handleTaskSubmit">
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
      <div class="d-flex justify-content-between">
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
        <div v-if="!editing">
          <b-link class="link-primary" @click="openCategoryModal(0)">
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
              <b-link class="link-primary" @click="openTaskModal(0, category.id)"><b-icon-plus-circle></b-icon-plus-circle></b-link>
              <b-link class="link-secondary" @click="openCategoryModal(1, category.id)"><b-icon-pencil-square></b-icon-pencil-square></b-link>
              <b-link class="link-danger" @click="deleteCategory(category)"><b-icon-trash></b-icon-trash></b-link>
            </div>
          </div>
        </template>
        <b-collapse visible :id="`collapse-${category.id}`">
          <div class="d-flex justify-content-between" v-for="task in tasks(category.id)" :key="task.id">
            <div class="d-flex">
              <b-form-checkbox :checked="task.is_done==='1'" type="checkbox" :ref="`task-checkbox-${task.id}`" @click.native.prevent="toggleTask(task.id)"/>
              <p>{{ task.task }}-{{ task.priority }}</p>
            </div>
            <div>
              <b-link class="link-primary" @click="openTaskModal(1, task.id)"><b-icon-pencil-square></b-icon-pencil-square></b-link>
              <b-link class="link-danger" @click="deleteTask(task.id)"><b-icon-trash></b-icon-trash></b-link>
            </div>
          </div>
          <b-card-text v-if="!tasks(category.id).length > 0">No tasks yet :(</b-card-text>
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
        priority: 0,
      },
      taskFormValidity: null,

      //usetris text: categoryModal: {title, mode, categoryId, busy}
      categoryModal: false,
      categoryModalTitle: 'Create New Category',
      categoryModalMode: 0,
      categoryModalCategoryId: 0,
      categoryModalBusy: false,
      //to iste tu
      taskModal: false,
      taskModalTitle: 'Create New Task',
      taskModalMode: 0,
      taskModalId: 0,
      taskModalBusy: false,
      
      //editing co? a tiez 2 slovne kludne is_editing alebo isEditing
      editing: false
    }
  },
  created() {
    //namespaced? takto neviem co sa vobec reloaduje
    this.$store.dispatch('reloadAll')
  },
  computed: {
    //pouzivaj mapGetters more!
    todoList() {
      return this.$store.getters.getTodoListById(this.$route.params.id)
    },
    categories() {
      return this.$store.getters.getCategoriesByTodoListId(this.$route.params.id)
    },
  },
  methods: {
    async updateTodoList() {
      //$route.params nie je refresh safe takze bacha na logiku (mozno je to ok neviem)
      await this.$store.dispatch('updateTodoList', {todoListId: this.$route.params.id, todoList:this.editForm})
      this.closeTodoListEditForm()
    },
    async deleteTodoList() {
      await this.$store.dispatch('deleteTodoList', this.$route.params.id)
      await this.$router.replace('/')
    },

    openCategoryModal(mode, categoryId) {
      //toto je nejaky reset? neoplati sa to dat do separate method?
      this.categoryFormValidity = null
      this.categoryModalMode = mode
      this.categoryModalCategoryId = categoryId
      //switch 🤮
      switch (this.categoryModalMode) {
        case 0:
          this.categoryForm.name = ''
          this.categoryModalTitle = 'Create New Category'
          break
        case 1:
          this.categoryForm.name = this.$store.getters.getCategoryById(categoryId).name
          this.categoryModalTitle = 'Edit Category'
          break
      }
      //lol podstatne meno = boolean? (isOpen?)
      this.categoryModal = true
    },
    validateCategoryForm() {
      const valid = this.$refs.newCategoryForm.checkValidity()
      // sak isCategoryFormValid
      this.categoryFormValidity = valid
      return valid
    },
    async handleCategorySubmit() {
      if (!this.validateCategoryForm()) return
      //isCategory
      this.categoryModalBusy = true

      switch (this.categoryModalMode) {
        case 0:
          await this.$store.dispatch('createCategory', {todoListId:this.$route.params.id, category:this.categoryForm})
          break
        case 1:
          await this.$store.dispatch('updateCategory', {categoryId:this.categoryModalCategoryId, category:this.categoryForm})
          break
      }

      //hopla better have fucking good reason for using (ak to musi byt tak to napis do komentu a daj aj reason)
      this.$nextTick(() => {
        this.categoryModal = !this.categoryModal
        this.categoryModalBusy = false
      })
    },
    async deleteCategory(category) {
      await this.$store.dispatch('deleteCategory', category.id)
    },

    openTaskModal(mode, id) {
      //toto je tiez reset?
      this.taskFormValidity = null
      this.taskModalMode = mode
      this.taskModalId = id

      //🤮
      switch (this.taskModalMode) {
        case 0:
          this.taskForm.task = ''
          this.taskForm.priority = 0
          this.taskModalTitle = 'Create New Task'
          break
        case 1:
          this.taskForm.task = this.$store.getters.getTaskById(id).task
          this.taskForm.priority = this.$store.getters.getTaskById(id).priority
          this.taskModalTitle = 'Edit Task'
          break
      }

      this.taskModal = true
    },
    //das to do jedneho! ty to das
    validateTaskForm() {
      const valid = this.$refs.newTaskForm.checkValidity()
      this.taskFormValidity = valid
      return valid
    },
    async handleTaskSubmit() {
      if (!this.validateTaskForm()) return
      this.taskModalBusy = true

      switch (this.taskModalMode) {
        case 0:
          await this.$store.dispatch('createTask', {categoryId: this.taskModalId, task: this.taskForm})
          break
        case 1:
          await this.$store.dispatch('updateTask', {taskId: this.taskModalId, task: this.taskForm})
          break
      }

      //☢️☢️☢️☢️☢️☢️☢️☢️☢️☢️
      this.$nextTick(() => {
        this.taskModal = !this.taskModal
        this.taskModalBusy = false
      })
    },
    async deleteTask(taskId) {
      await this.$store.dispatch('deleteTask', taskId)
    },
    async toggleTask(taskId) {
      this.$refs[`task-checkbox-${taskId}`].disabled = true

      await this.$store.dispatch('updateTask', {
        taskId:taskId,
        task: {
          //OMG NEEEEEEEEEE === (kludne daj do komentu ze preco)
          is_done:(this.$store.getters.getTaskById(taskId).is_done==="0") ? "1" : "0"
        }
      })

      this.$refs[`task-checkbox-${taskId}`].disabled = false
    },


    closeTodoListEditForm() {
      this.editing = false
      this.editForm.name = ''
    },
    //tasks??????? to je meno methody more? lepsie som ta ucil! co sme v store?
    tasks(id) {
      return this.$store.getters.getTasksByCategoryId(id)
    },
  }
}
</script>