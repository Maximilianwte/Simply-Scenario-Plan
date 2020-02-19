import Vue from 'vue'
import Router from 'vue-router'
import Front from './views/front.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Front
    },
    {
      path: '/buy',
      name: 'buy',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/postbuy.vue')
    },
    {
      path: '/imprint',
      name: 'imprint',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/imprint.vue')
    },
  ]
})