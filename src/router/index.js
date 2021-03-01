import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [{
      path: '/index',
      name: 'Index',
      component: () => import('@/views/Index')
    },
    {
      path:'/about',
      name:'About',
      component: () => import('@/views/About'),
      meta: {
        title: '关于我们'
      }
    }
  ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },

  {
    path: '/center',
    name: 'Center',
    component: () => import('@/views/Center'),
    meta: {
      title: '创作中心'
    }
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      title: '404'
    }
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