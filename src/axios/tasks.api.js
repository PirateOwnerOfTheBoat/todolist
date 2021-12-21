import Api from '../custom'

export default {
    getTasksByCategoryId(categoryId) {
        return Api.get(`/categories/${categoryId}/tasks`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    getUsersTasks() {
        return Api.get('/tasks', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    getTaskById(taskId) {
        return Api.get(`/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    createNewTask(categoryId, task) {
        return Api.get(`/categories/${categoryId}/tasks/create`, {
            params: task,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    updateTaskById(taskId, task) {
        return Api.put(`/tasks/${taskId}`, task, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    deleteTaskById(taskId) {
        return Api.delete(`/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    }
}