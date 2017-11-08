import Vue         from 'vue'
import App         from './App'
import router      from './router'
import VueResource from 'vue-resource'
import Vuex        from 'vuex'

Vue.use(Vuex);
Vue.use(VueResource);
Vue.http.options.root = 'https://api.got.show/api/';
Vue.config.productionTip = false;

window.Event = new Vue();
window.XhrInterceptors = Vue.http.interceptors;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
