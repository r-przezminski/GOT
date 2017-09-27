import Vue    from 'vue'
import Router from 'vue-router'

import Home       from '@/components/Home'
import Characters from '@/components/Characters'
import Locations  from '@/components/Locations'
import Continents from '@/components/Continents'
import Cities     from '@/components/Cities'
import Cultures   from '@/components/Cultures'
import Houses     from '@/components/Houses'
import Regions    from '@/components/Regions'
import Episodes   from '@/components/Episodes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/characters',
      name: 'Characters',
      component: Characters
    },
    {
      path: '/locations',
      name: 'Locations',
      component: Locations
    },
    {
      path: '/locations/continents',
      name: 'Continents',
      component: Continents
    },
    {
      path: '/locations/cities',
      name: 'Cities',
      component: Cities
    },
    {
      path: '/cultures',
      name: 'Cultures',
      component: Cultures
    },
    {
      path: '/houses',
      name: 'Houses',
      component: Houses
    },
    {
      path: '/regions',
      name: 'Regions',
      component: Regions
    },

    {
      path: '/episodes',
      name: 'Episodes',
      component: Episodes
    }
  ]
})
