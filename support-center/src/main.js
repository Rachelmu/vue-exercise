import Vue from 'vue'
// import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router'
import VueFetch from './plugins/fetch'
import './global-components'

Vue.config.productionTip = false
// Vue.user(VueRouter)

let baseUrl = 'http://localhost:3000/'
Vue.use(VueFetch, {baseUrl: baseUrl})

import AppLayout from './components/AppLayout.vue'
new Vue({
  router,
  render: h => h(AppLayout),
}).$mount('#app')
