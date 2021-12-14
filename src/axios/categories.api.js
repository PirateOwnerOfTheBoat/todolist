import Api from "../custom"

export default {
    getAllCategories() {
        return Api.get('/categories')
    },
    getCategoryById(id) {
        return Api.get(`/categories/${id}`)
    },
    createNewCategory(category) {
        return Api.get('/categories/create', {
            params: category
        })
    },
    updateCategoryById(id, category) {
        return Api.put(`/categories/${id}`, category)
    },
    deleteCategoryById(id) {
        return Api.delete(`/categories/${id}`)
    }
}