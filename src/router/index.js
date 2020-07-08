import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Index from '../views/Index'
import Admin from '../views/Admin'
import AdminHome from '../views/AdminHome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/adminhome',
    name: 'AdminHome',
    component: AdminHome
  }
]

const router = new VueRouter({
  routes
})

export default router
