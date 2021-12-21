import Api from '../custom'

export default {
    getUsersTodoLists() {
        return Api.get('/todolists', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    getTodoListById(todoListId) {
        return Api.get(`/todolists/${todoListId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    createTodoList(todoList) {
        return Api.get(`/todolists/create`, {
            params: todoList,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    updateTodoListById(todoListId, todoList) {
        return Api.put(`/todolists/${todoListId}`, todoList, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    deleteTodoListById(todoListId) {
        return Api.delete(`/todolists/${todoListId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    }
}