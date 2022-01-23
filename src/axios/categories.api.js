import Api from "@/axios"
import store from "@/store";

export default {
    // Not Used
    getCategoriesByTodoListId(todoListId) {
        return Api.get(`/todolists/${todoListId}/categories`, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    getUsersCategories() {
        return Api.get('/categories', {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    // Not Used
    getCategoryById(categoryId) {
        return Api.get(`/categories/${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    createNewCategory(todoListId, category) {
        return Api.get(`/todolists/${todoListId}/categories/create`, {
            params: category,
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    updateCategoryById(categoryId, category) {
        return Api.put(`/categories/${categoryId}`, category, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    },
    deleteCategoryById(categoryId) {
        return Api.delete(`/categories/${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${store.getters['authModule/getToken']}`,
            }
        })
    }
}