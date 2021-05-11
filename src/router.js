import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home2.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      props: true,
      component: Home
    },
    {
      path: '/app/:id?',
      name: 'app',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/app.vue')
    },
    {
      path: '/register',
      name: 'register',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/register.vue')
    },
    {
      path: '/login',
      name: 'login',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/login.vue')
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