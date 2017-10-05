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
      name: 'home',
      component: load('Home')
    },
    {
      path: '/characters',
      name: 'characters',
      component: load('Characters')
      // children: [
      //   { path: ':slug', name: 'character', component: Character }
      // ]
    },
    {
      path: '/character/:id',
      name: 'character',
      component: load('Character')
    },
    {
      path: '/locations',
      name: 'locations',
      component: load('Locations')
    },
    {
      path: '/locations/continents',
      name: 'continents',
      component: load('Continents'),
    },
    {
      path: '/locations/cities',
      name: 'cities',
      component: load('Cities')
    },
    {
      path: '/cultures',
      name: 'cultures',
      component: load('Cultures')
    },
    {
      path: '/houses',
      name: 'houses',
      component: load('Houses')
    },
    {
      path: '/house/:id',
      name: 'house',
      component: load('House')
    },
    {
      path: '/locations/regions',
      name: 'regions',
      component: load('Regions')
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: load('Episodes')
    }
  ]
})
