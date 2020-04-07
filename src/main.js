import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Croppa from 'vue-croppa'

Vue.config.productionTip = false

Vue.use(Croppa)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
