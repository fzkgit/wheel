import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index'
import store from './store/index'

//使用element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 去掉生成环境提示
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})