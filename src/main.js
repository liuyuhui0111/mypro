import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
	error: require('common/images/error.png'),
  	loading: require('common/images/smile.png')
})

fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
