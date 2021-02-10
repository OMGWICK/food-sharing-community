import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import App from './App.vue'
import router from './router'
import store from './store'

//elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import animated from 'animate.css'

//NProgress
import '@/permission'

//VuePageTransition
import VuePageTransition from 'vue-page-transition'

Vue.use(VuePageTransition)

Vue.use(ElementUI)

//animate
Vue.use(animated)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
