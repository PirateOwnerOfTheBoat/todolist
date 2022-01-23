import Vue from 'vue'
import Api from '@/axios'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = Api
    }
})