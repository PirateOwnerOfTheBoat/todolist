import Api from '../custom'

export default {
    getAllTodoLists() {
        return Api.get('/todolists')
    },
    getTodoListById(id) {
        return Api.get(`/todolists/${id}`)
    },
    createNewTodoList(todolist) {
        return Api.get('/todolists/create', {
            params: todolist
        })
    },
    updateTodoListById(id, todolist) {
        return Api.put(`/todolists/${id}`, todolist)
    },
    deleteTodoListById(id) {
        return Api.delete(`/todolists/${id}`)
    }
}