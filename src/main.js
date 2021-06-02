import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAnalytics from 'vue-ua'
Vue.config.productionTip = false

Vue.use(require('vue-chartist'))
Vue.use(VueAnalytics, {
  // [Required] The name of your app as specified in Google Analytics.
  appName: 'simplyscenariodb',
  // [Required] The version of your app.
  appVersion: '1.0',
  // [Required] Your Google Analytics tracking ID.
  trackingId: 'G-DQQD9C21EP',
  // If you're using vue-router, pass the router instance here.
  vueRouter: router,
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

