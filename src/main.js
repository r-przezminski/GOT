// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import Loading from './components/Loading.vue'
import Error from './components/Error.vue'

Vue.component('loading', Loading)
Vue.component('error', Error)
Vue.config.productionTip = false

window.Event = new Vue()
window.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
