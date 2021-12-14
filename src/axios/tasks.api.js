import Api from '../custom'

export default {
    getAllTasks() {
        return Api.get('/tasks')
    },
    getTaskById(id) {
        return Api.get(`/tasks/${id}`)
    },
    createNewTask(task) {
        return Api.get('/tasks/create', {
            params: task
        })
    },
    updateTaskById(id, task) {
        return Api.put(`/tasks/${id}`, task)
    },
    deleteTaskById(id) {
        return Api.delete(`/tasks/${id}`)
    }
}