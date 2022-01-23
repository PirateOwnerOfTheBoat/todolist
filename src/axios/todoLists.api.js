import Api from "@/axios"
import store from "@/store";

export default {
    getUsersTodoLists() {
        return Api.get('/todolists', {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    // Not Used
    getTodoListById(todoListId) {
        return Api.get(`/todolists/${todoListId}`, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    createTodoList(todoList) {
        return Api.get(`/todolists/create`, {
            params: todoList,
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    updateTodoListById(todoListId, todoList) {
        return Api.put(`/todolists/${todoListId}`, todoList, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    deleteTodoListById(todoListId) {
        return Api.delete(`/todolists/${todoListId}`, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    }
}