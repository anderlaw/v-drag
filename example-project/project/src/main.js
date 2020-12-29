import Vue from 'vue'
import App from './App.vue'
import store from './store'
// import VueDrag from 'vue-drag-plugin'
import VueDrag from '../../../index'
Vue.config.productionTip = false
Vue.use(VueDrag)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
