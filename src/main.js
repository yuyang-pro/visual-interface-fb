import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import {install as VueLineUp} from 'vue-lineup'

Vue.config.productionTip = false

Vue.use(VueLineUp)

new Vue({
  render: h => h(App),
}).$mount('#app')