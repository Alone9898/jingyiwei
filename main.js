import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false

import Tool from "./util/tool";
Vue.prototype.$tool = Tool;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
