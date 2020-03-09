import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// function load(component) {
// 	return () => System.import(`@/components/${component}`)
// }

const load = component => {
  return () => import(`@/components/${component}`);
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: load("Home/Home")
      // component: import("@/componets/Home/Home")
    },
    {
      path: "/characters",
      name: "Characters",
      component: load("Characters/Characters")
      // component: import("@/componets/Characters/Characters")
    },
    {
      path: "/cities",
      name: "Cities",
      component: load("Cities/Cities")
      // component: import("@/componets/Cities/Cities")
    },
    {
      path: "/houses",
      name: "Houses",
      component: load("Houses/Houses")
      // component: import("@/componets/Houses/Houses")
    },
    {
      path: "/episodes",
      name: "Episodes",
      component: load("Episodes/Episodes")
      // component: import("@/componets/Episodes/Episodes")
    }
  ]
});
