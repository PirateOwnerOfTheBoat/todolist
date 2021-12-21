import todoListsApi from "../../axios/todoLists.api";
import categoriesApi from "../../axios/categories.api";
import tasksApi from "../../axios/tasks.api";

export default {
    state: {
        todoLists: [],
        categories: [],
        tasks: []
    },
    getters: {
        getTodoLists(state) {
            return state.todoLists
        },
        getTodoListById: (state) => (todoListId) => {
            return state.todoLists.find(todoList => todoList.id == todoListId) || {} // TODO: wtf
        },
        getCategoriesByTodoListId: (state) => (todoListId) => {
            return state.categories.filter(category => category.todo_list_id == todoListId) || {}
        },
        getTasksByCategoryId: (state) => (categoryId) => {
            return state.tasks.filter(task => task.category_id == categoryId) || {}
        }
    },
    mutations: {
        reloadedTodoLists(state, todoLists) {
            state.todoLists = todoLists
        },
        reloadedCategories(state, categories) {
            state.categories = categories
        },
        reloadedTasks(state, tasks) {
            state.tasks = tasks
        },

        todoListCreated(state, todoList) {
            state.todoLists.push(todoList)
        },
        todoListUpdated(state, {todoListId, todoList}) {
            Object.assign(state.todoLists[state.todoLists.findIndex(todoList => todoList.id === todoListId)], todoList)
        },
        todoListDeleted(state, todoListId) {
            state.todoLists.splice(state.todoLists.findIndex(todoList => todoList.id === todoListId), 1)
        },

        categoryCreated(state, category) {
            state.categories.push(category)
        },
        categoryUpdated(state, {categoryId, category}) {
            Object.assign(state.categories[state.categories.findIndex(category => category.id = categoryId)], category)
        },
        categoryDeleted(state, categoryId) {
            state.categories.splice(state.categories.findIndex(category => category.id === categoryId), 1)
        },

        taskCreated(state, task) {
            state.tasks.push(task)
        },
        taskUpdated(state, {taskId, task}) {
            Object.assign(state.tasks[state.tasks.findIndex(task => task.id === taskId)], task)
        },
        taskDeleted(state, taskId) {
            state.tasks.splice(state.tasks.findIndex(task => task.id === taskId), 1)
        }
    },
    actions: {
        async reloadAll({ commit }) {
            try {
                let response = await todoListsApi.getUsersTodoLists()
                commit('reloadedTodoLists', response.data)

                response = await categoriesApi.getUsersCategories()
                commit('reloadedCategories', response.data)

                response = await tasksApi.getUsersTasks()
                commit('reloadedTasks', response.data)
            } catch (err) {
                throw new err
            }
        },
        async reloadTodoLists({ commit }) {
            try {
                let response = await todoListsApi.getUsersTodoLists()
                commit('reloadedTodoLists', response.data)
            } catch (err) {
                throw new err
            }
        },
        async reloadCategories({ commit }) {
            try {
                let response = await categoriesApi.getUsersCategories()
                commit('reloadedCategories', response.data)
            } catch (err) {
                throw new err
            }
        },
        async reloadTasks({ commit }) {
            try {
                let response = await tasksApi.getUsersTasks()
                commit('reloadedTasks', response.data)
            } catch (err) {
                throw new err
            }
        },

        async createTodoList({ commit }, todoList) {
            try {
                let response = await todoListsApi.createTodoList(todoList)
                commit('todoListCreated', response.data)
            } catch (err) {
                throw new err
            }
        },
        async updateTodoList({ commit }, {todoListId, todoList}) {
            try {
                let response = await todoListsApi.updateTodoListById(todoListId, todoList)
                commit('todoListUpdated', {todoListId: todoListId, todoList:response.data})
            } catch (err) {
                throw new err
            }
        },
        async deleteTodoList({ commit }, todoListId) {
            try {
                await todoListsApi.deleteTodoListById(todoListId)
                commit('todoListDeleted', todoListId)
            } catch (err) {
                throw new err
            }
        },

        async createCategory({ commit }, {todoListId, category}) {
            try {
                let response = await categoriesApi.createNewCategory(todoListId, category)
                commit('categoryCreated', response.data)
            } catch (err) {
                throw new err
            }
        },
        async updateCategory({ commit }, {categoryId, category}) {
            try {
                let response = await categoriesApi.updateCategoryById(categoryId, category)
                commit('categoryUpdated', {categoryId:categoryId, category:response.data})
            } catch (err) {
                throw new err
            }
        },
        async deleteCategory({ commit }, categoryId) {
            try {
                await categoriesApi.deleteCategoryById(categoryId)
                commit('categoryDeleted', categoryId)
            } catch (err) {
                throw new err
            }
        },

        async createTask({ commit }, {categoryId, task}) {
            try {
                let response = await tasksApi.createNewTask(categoryId, task)
                commit('taskCreated', response.data)
            } catch (err) {
                throw new err
            }
        },
        async updateTask({ commit }, {taskId, task}) {
            try {
                let response = await tasksApi.updateTaskById(taskId, task)
                commit('taskUpdated', {taskId:taskId, task:response.data})
            } catch (err) {
                throw new err
            }
        },
        async deleteTask({ commit }, taskId) {
            try {
                await tasksApi.deleteTaskById(taskId)
                commit('taskDeleted', taskId)
            } catch (err) {
                throw new err
            }
        }
    },
}