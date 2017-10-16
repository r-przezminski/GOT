import Vue    from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load (component) {
  return () => System.import(`@/components/${component}`)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: load('Home')
    },
    {
      path: '/characters',
      name: 'Characters',
      component: load('Characters')
    },
    {
      path: '/character/:id',
      name: 'Character',
      component: load('Character')
    },
    {
      path: '/cities',
      name: 'Cities',
      component: load('Cities')
    },
    {
      path: '/houses',
      name: 'Houses',
      component: load('Houses')
    },
    {
      path: '/house/:id',
      name: 'House',
      component: load('House')
    },
    {
      path: '/episodes',
      name: 'Episodes',
      component: load('Episodes')
    }
  ]
})
