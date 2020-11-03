import Vue from 'vue'
// import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router'
import VueFetch from './plugins/fetch'
import './global-components'
import state from './state'
import VueState from './plugins/state'

Vue.config.productionTip = false
// Vue.user(VueRouter)

let baseUrl = 'http://localhost:3000/'

Vue.use(VueFetch, {baseUrl: baseUrl})
Vue.use(VueState, state)

import AppLayout from './components/AppLayout.vue'
new Vue({
  data: state,
  router,
  render: h => h(AppLayout),
}).$mount('#app')
