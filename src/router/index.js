import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title:'首页' }
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  }, 

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: { title:'404' }
  },

  {
    path: '*',
    redirect: '/404',
  },
]

const router = new VueRouter({
  routes
})

export default router