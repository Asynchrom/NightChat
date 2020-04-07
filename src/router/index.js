import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import clock from '../services/clock.js'
import store from '../store.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import(/* webpackChunkName: "Ranking" */ '../views/Ranking.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:username',
    name: 'User',
    component: () => import(/* webpackChunkName: "User" */ '../views/User.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (store.isAuthenticated || !clock.timeOk) next({ name: 'Home' });
      else next()
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue'),
    beforeEnter: (to, from, next) => {
      if (store.isAuthenticated || !clock.timeOk) next({ name: 'Home' })
      else next()
    }
  },
  {
    path: '*',
    beforeEnter: (to, from, next) => next({ name: 'Home' })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.isAuthenticated) {
      next({ name: 'Login' })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
