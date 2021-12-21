import Api from "../custom"

export default {
    getCategoriesByTodoListId(todoListId) {
        return Api.get(`/todolists/${todoListId}/categories`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    getUsersCategories() {
        return Api.get('/categories', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    getCategoryById(categoryId) {
        return Api.get(`/categories/${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    createNewCategory(todoListId, category) {
        return Api.get(`/todolists/${todoListId}/categories/create`, {
            params: category,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    updateCategoryById(categoryId, category) {
        return Api.put(`/categories/${categoryId}`, category, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    },
    deleteCategoryById(categoryId) {
        return Api.delete(`/categories/${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    }
}