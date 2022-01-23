import Api from "@/axios"
import store from "@/store";

export default {
    // Not Used
    getTasksByCategoryId(categoryId) {
        return Api.get(`/categories/${categoryId}/tasks`, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    getUsersTasks() {
        return Api.get('/tasks', {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    // Not Used
    getTaskById(taskId) {
        return Api.get(`/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    createNewTask(categoryId, task) {
        return Api.get(`/categories/${categoryId}/tasks/create`, {
            params: task,
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    updateTaskById(taskId, task) {
        return Api.put(`/tasks/${taskId}`, task, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    deleteTaskById(taskId) {
        return Api.delete(`/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    }
}