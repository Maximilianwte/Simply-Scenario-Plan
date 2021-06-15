import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import gtagjs from 'vue-gtagjs'
gtagjs(router, "G-DQQD9C21EP", {debug: false, scriptId: 'gtagjs'})

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

Vue.use(require('vue-chartist'))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

