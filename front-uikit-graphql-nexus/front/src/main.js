import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UIkit from 'uikit'
import '@/assets/styles/styles.scss'
import Icons from 'uikit/dist/js/uikit-icons'
import { createProvider } from './vue-apollo'

UIkit.use(Icons)
window.UIkit = UIkit

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: function (h) { return h(App) }
}).$mount('#app')
