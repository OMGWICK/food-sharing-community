/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\router\index.js
 * @LastEditTime: 2021-03-03 20:36:06
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index'),
      },
      {
        path: '/share',
        name: 'Share',
        component: () => import('@/views/Share'),
        meta: {
          title: '分享圈',
        },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About'),
        meta: {
          title: '关于我们',
        },
      },
      {
        path: '/mine',
        name: 'Mine',
        redirect: '/personal',
        component: () => import('@/views/User'),
        children: [
          {
            path: '/personal',
            name: 'Personal',
            component: () => import('@/views/user/Personal'),
            meta: {
              title: '个人空间',
            },
          },
          {
            path: '/dymine',
            name: 'Dymine',
            component: () => import('@/views/user/Dymine'),
            meta: {
              title: '我发布的',
            },
          },
        ],
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('@/views/Detail'),
        meta: {
          title: '详细',
        },
      },
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
      title: '创作中心',
    },
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      title: '404',
    },
  },

  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
