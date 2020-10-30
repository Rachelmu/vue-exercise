import Vue from 'vue'
// import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router'

import './global-components'

Vue.config.productionTip = false
// Vue.user(VueRouter)

import AppLayout from './components/AppLayout.vue'
new Vue({
  router,
  render: h => h(AppLayout),
}).$mount('#app')
