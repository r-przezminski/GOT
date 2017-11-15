import Vue         from 'vue'
import App         from './App'
import router      from './router'
import store       from './store/index'
// import xhr from './config/xhr'
// console.log(xhr);

Vue.config.productionTip = false;

window.Event = new Vue();

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
