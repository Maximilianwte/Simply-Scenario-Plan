import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/test.vue')
    },
    {
      path: '/app/:id?',
      name: 'app',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/app.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/profile.vue')
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